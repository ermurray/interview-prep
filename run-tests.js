#!/usr/bin/env node
// Run the unit tests for one question, one section, or everything.
//
//   node run-tests.js                         # every test
//   node run-tests.js basic                   # every test in prep-questions/basic
//   node run-tests.js basic rotate-array      # one question (".js" optional)
//   node run-tests.js medium passing-cars best-single-trade  # several questions
//   node run-tests.js --list                  # list sections and questions
//
// Via npm:  npm test -- basic rotate-array
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const TESTS_DIR = path.join(path.dirname(__filename), 'tests');
const args = process.argv.slice(2);

const sections = () =>
  fs.readdirSync(TESTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'helpers')
    .map((d) => d.name)
    .sort();

const questions = (section) =>
  fs.readdirSync(path.join(TESTS_DIR, section))
    .filter((f) => f.endsWith('.test.js'))
    .map((f) => f.replace(/\.test\.js$/, ''))
    .sort();

const fail = (msg) => {
  console.error(msg);
  console.error('Run `node run-tests.js --list` to see what is available.');
  process.exit(1);
};

if (args.includes('--help') || args.includes('-h')) {
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1).filter((l, i, all) => all.slice(0, i + 1).every((x) => x.startsWith('//'))).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
  process.exit(0);
}

if (args.includes('--list')) {
  for (const s of sections()) {
    console.log(s);
    for (const q of questions(s)) console.log(`  ${q}`);
  }
  process.exit(0);
}

const [section, ...names] = args;
let files;

if (!section) {
  files = sections().flatMap((s) => questions(s).map((q) => path.join(TESTS_DIR, s, `${q}.test.js`)));
} else {
  if (!sections().includes(section)) fail(`Unknown section "${section}".`);
  const available = questions(section);
  const wanted = names.length ? names.map((n) => n.replace(/\.(test\.)?js$/, '')) : available;
  for (const n of wanted) if (!available.includes(n)) fail(`No test for "${n}" in section "${section}".`);
  files = wanted.map((q) => path.join(TESTS_DIR, section, `${q}.test.js`));
}

const result = spawnSync(process.execPath, ['--test', '--test-timeout=10000', ...files], { stdio: 'inherit' });
process.exit(result.status ?? 1);
