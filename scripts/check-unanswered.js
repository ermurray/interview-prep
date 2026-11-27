#!/usr/bin/env node
// Fails if any question file has an answer in it, so `main` only ever holds unanswered questions.
//
// A question file is "unanswered" when every function/method body is empty apart from comments:
//
//   const name = (args) => {
//     // your solution here
//   };
//
// Usage: node scripts/check-unanswered.js            (checks every prep-questions*/**/*.js)
//        node scripts/check-unanswered.js file.js ...  (checks just these files)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const questionFiles = () =>
  fs.readdirSync(ROOT)
    .filter((d) => /^prep-questions(-\d+)?$/.test(d))
    .flatMap((d) => fs.readdirSync(path.join(ROOT, d), { recursive: true }).map((f) => path.join(ROOT, d, f)))
    .filter((f) => f.endsWith('.js'))
    .sort();

// Returns a reason string if the file looks answered, or null if it is a clean stub.
const findAnswer = (source) => {
  const lines = source
    .split('\n')
    .map((l, i) => ({ n: i + 1, text: l.replace(/\/\/.*$/, '').trim() }))
    .filter((l) => l.text);
  let classDepth = 0;
  for (let i = 0; i < lines.length; i++) {
    const { n, text } = lines[i];
    if (/^export \{[^}]*\};?$/.test(text)) continue;
    if (/^class \w+ \{$/.test(text)) { classDepth++; continue; }
    if (text.endsWith('{')) {
      const next = lines[i + 1];
      if (next && /^\};?$/.test(next.text)) { i++; continue; }
      return `line ${n}: function body is not empty`;
    }
    if (/^\};?$/.test(text) && classDepth > 0) { classDepth--; continue; }
    return `line ${n}: unexpected code "${text.slice(0, 60)}"`;
  }
  return null;
};

const files = process.argv.length > 2 ? process.argv.slice(2).map((f) => path.resolve(f)) : questionFiles();
const answered = files
  .map((f) => ({ f, reason: findAnswer(fs.readFileSync(f, 'utf8')) }))
  .filter((r) => r.reason);

if (answered.length) {
  console.error('These question files contain answers. Answers belong on the `practice` branch, not `main`:\n');
  for (const { f, reason } of answered) console.error(`  ${path.relative(ROOT, f)}  (${reason})`);
  process.exit(1);
}
console.log(`OK: ${files.length} question files, all unanswered.`);
