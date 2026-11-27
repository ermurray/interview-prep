#!/usr/bin/env node
// Run the unit tests for one question, one section, or everything.
//
//   node run-tests.js                                 # every test in series 1
//   node run-tests.js basic                           # one section
//   node run-tests.js basic rotate-array              # one question (".js" optional)
//   node run-tests.js medium passing-cars best-single-trade  # several questions
//   node run-tests.js --series 2 hard                 # series 2 (prep-questions-2), also -s 2
//   node run-tests.js -s 3 medium car-pooling         # series 3 (prep-questions-3)
//   node run-tests.js --list                          # list sections and questions (add -s 2)
//   node run-tests.js --spec basic                    # use Node's built-in reporter instead
//
// Via npm:  npm test -- basic rotate-array    |    npm run test:2 -- hard
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.dirname(__filename);

const fail = (msg) => {
  console.error(msg);
  console.error('Run `node run-tests.js --list` (or `--list -s 2`) to see what is available.');
  process.exit(1);
};

// ---- parse flags ----
const args = [];
let series = '1';
let list = false;
let spec = false;
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--help' || a === '-h') {
    const lines = fs.readFileSync(__filename, 'utf8').split('\n').slice(1);
    console.log(lines.slice(0, lines.findIndex((l) => !l.startsWith('//'))).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
    process.exit(0);
  } else if (a === '--list') list = true;
  else if (a === '--spec') spec = true;
  else if (a === '--series' || a === '-s') series = argv[++i];
  else if (a.startsWith('--series=')) series = a.slice('--series='.length);
  else args.push(a);
}

const TESTS_DIR = path.join(ROOT, series === '1' ? 'tests' : `tests-${series}`);
if (!series || !fs.existsSync(TESTS_DIR)) fail(`Unknown series "${series}".`);

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

if (list) {
  console.log(`series ${series}`);
  for (const s of sections()) {
    console.log(`  ${s}`);
    for (const q of questions(s)) console.log(`    ${q}`);
  }
  process.exit(0);
}

const [section, ...names] = args;
let files;

if (!section) {
  files = sections().flatMap((s) => questions(s).map((q) => path.join(TESTS_DIR, s, `${q}.test.js`)));
} else {
  if (!sections().includes(section)) fail(`Unknown section "${section}" in series ${series}.`);
  const available = questions(section);
  const wanted = names.length ? names.map((n) => n.replace(/\.(test\.)?js$/, '')) : available;
  for (const n of wanted) if (!available.includes(n)) fail(`No test for "${n}" in series ${series}, section "${section}".`);
  files = wanted.map((q) => path.join(TESTS_DIR, section, `${q}.test.js`));
}

// The custom reporter prints Expected vs Received under each failing test.
const reporter = spec ? [] : [`--test-reporter=${path.join(ROOT, 'scripts', 'test-reporter.js')}`, '--test-reporter-destination=stdout'];
const result = spawnSync(process.execPath, ['--test', '--test-timeout=10000', ...reporter, ...files], { stdio: 'inherit' });
process.exit(result.status ?? 1);
