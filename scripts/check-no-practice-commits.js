#!/usr/bin/env node
// Fails if a change headed for `main` contains any commit from the `practice` branch.
//
// The two branches only flow one way:  main ──▶ practice.  `practice` holds your solutions, so
// none of its commits may ever reach `main` (not by a PR from `practice`, and not by a branch
// that was started from `practice` either).
//
// "Commits from practice" means commits made ON practice: its first-parent history (your solution
// commits and the "merge X into practice" commits). A commit made on a branch started from main
// stays allowed even if that branch was also merged into practice. Any solution code that reaches
// main some other way is still caught by check-unanswered.
//
// Usage: node scripts/check-no-practice-commits.js [head] [base]
//        head defaults to HEAD, base to origin/main (falls back to main).
// Used by CI on every pull request to main, and by the pre-push hook.
import { execFileSync } from 'node:child_process';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const exists = (ref) => {
  try {
    git('rev-parse', '--verify', '--quiet', `${ref}^{commit}`);
    return true;
  } catch {
    return false;
  }
};
const fail = (lines) => {
  console.error(['', ...lines, '', 'Changes for main must come from a branch started from main:',
    '  git switch -c my-change origin/main', ''].join('\n'));
  process.exit(1);
};

if (process.env.GITHUB_HEAD_REF === 'practice') {
  fail(['This pull request comes from the `practice` branch, which holds your solutions.',
    '`practice` must never be merged into `main`; changes only flow main -> practice.']);
}

const [head = 'HEAD', baseArg] = process.argv.slice(2);
const base = baseArg ?? (exists('origin/main') ? 'origin/main' : 'main');
const practiceRefs = ['origin/practice', 'practice'].filter(exists);

if (!exists(base)) {
  console.log(`No ${base} to compare with; skipping.`);
  process.exit(0);
}
if (!practiceRefs.length) {
  console.log('No practice branch found; nothing to check.');
  process.exit(0);
}

const list = (out) => (out ? out.split('\n') : []);
const practiceOnly = new Set(practiceRefs.flatMap((ref) => list(git('rev-list', '--first-parent', ref, '--not', base))));
const added = list(git('rev-list', head, '--not', base));
const leaked = added.filter((c) => practiceOnly.has(c));

if (leaked.length) {
  fail([`${leaked.length} commit(s) from the \`practice\` branch would reach main:`,
    ...leaked.slice(0, 20).map((c) => `  ${git('log', '-1', '--format=%h %s', c)}`),
    ...(leaked.length > 20 ? [`  ...and ${leaked.length - 20} more`] : [])]);
}
console.log(`OK: none of the ${added.length} new commit(s) come from practice.`);
