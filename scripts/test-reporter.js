// Custom node:test reporter: groups results by question and, for every failing test, prints
// what the test expected next to what your solution returned.
//
//   ✖ example: [9, 3, 9, 3, 9, 7, 9] -> 7                      tests/basic/unpaired-element.test.js:5
//       Expected: 7
//       Received: undefined   (did you forget to return a value?)
//
// Used by run-tests.js. Pass --spec to run-tests.js to get Node's built-in reporter instead.
import path from 'node:path';
import util from 'node:util';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (p) => {
  if (!p) return '';
  const abs = p.startsWith('file://') ? fileURLToPath(p) : p;
  const r = path.relative(ROOT, abs);
  return r.startsWith('..') ? abs : r; // outside the repo (e.g. SOLUTIONS_DIR): keep the absolute path
};

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const style = (fmt, text) => (useColor ? util.styleText(fmt, String(text)) : String(text));
const green = (t) => style('green', t);
const red = (t) => style('red', t);
const dim = (t) => style('dim', t);
const bold = (t) => style('bold', t);
const yellow = (t) => style('yellow', t);

// Pretty-print a value; large arrays and long strings are truncated so huge inputs stay readable.
const show = (value) =>
  util.inspect(value, { depth: 6, colors: useColor, maxArrayLength: 20, maxStringLength: 200, breakLength: 80, sorted: false });

// Indent every line after the first so multi-line values line up under their label.
const block = (label, value, pad = '      ') => {
  const text = show(value).split('\n');
  return [`${pad}${label} ${text[0]}`, ...text.slice(1).map((l) => `${pad}${' '.repeat(label.length + 1)}${l}`)];
};

// For two arrays, point at the first index where they differ.
const firstArrayDifference = (expected, actual) => {
  if (!Array.isArray(expected) || !Array.isArray(actual)) return null;
  const n = Math.max(expected.length, actual.length);
  for (let i = 0; i < n; i++) {
    if (!util.isDeepStrictEqual(expected[i], actual[i])) {
      if (i >= actual.length) return `received array is too short (length ${actual.length}, expected ${expected.length})`;
      if (i >= expected.length) return `received array is too long (length ${actual.length}, expected ${expected.length})`;
      return `first difference at index [${i}]: expected ${show(expected[i])}, received ${show(actual[i])}`;
    }
  }
  return null;
};

// One-line version of a value for the end-of-run recap, cut to a readable length.
const compact = (value, max = 70) => {
  const text = util.inspect(value, { depth: 3, maxArrayLength: 10, maxStringLength: 60, breakLength: Infinity });
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
};

// The first stack frame in a solution file (anything outside the tests folders and Node itself),
// so you know which line of your code threw.
const solutionFrame = (stack) => {
  for (const line of String(stack ?? '').split('\n').slice(1)) {
    const m = line.match(/\(?((?:file:\/\/)?\/[^():]+):(\d+):(\d+)\)?\s*$/);
    if (!m || /\/tests(-\d+)?\/|node_modules|node:/.test(m[1])) continue;
    return `${rel(m[1])}:${m[2]}:${m[3]}`;
  }
  return null;
};

// Short one-line reason for the recap at the end of the run.
const summarizeFailure = (error) => {
  const cause = error?.cause ?? error;
  if (cause?.code === 'ERR_ASSERTION' || cause?.name === 'AssertionError') {
    const { actual, expected, operator, generatedMessage, message } = cause;
    if (operator === '==' && expected === true) {
      return yellow(`check failed: ${generatedMessage ? String(message).split('\n')[0] : message}`);
    }
    if (['rejects', 'throws', 'doesNotThrow', 'doesNotReject', 'fail'].includes(operator)) {
      return yellow(String(message).split('\n')[0]);
    }
    return `${green('expected')} ${compact(expected)}${dim(',')} ${red('received')} ${compact(actual)}`;
  }
  if (error?.failureType === 'testTimeoutFailure' || /timed out/i.test(error?.message ?? '')) {
    return yellow(`timed out: ${error.message}`);
  }
  return red(`threw ${cause?.name ?? 'Error'}: ${cause?.message ?? error?.message ?? String(cause)}`);
};

const explainFailure = (error) => {
  const cause = error?.cause ?? error;
  const lines = [];

  if (cause?.code === 'ERR_ASSERTION' || cause?.name === 'AssertionError') {
    const { actual, expected, operator, generatedMessage, message } = cause;

    if (operator === '==' && expected === true) {
      // assert.ok(condition, message): there's no expected value, just a failed check.
      lines.push(`      ${yellow('Check failed:')} ${generatedMessage ? String(message).split('\n')[0] : message}`);
      return lines;
    }
    if (['rejects', 'throws', 'doesNotThrow', 'doesNotReject'].includes(operator) || operator === 'fail') {
      lines.push(`      ${yellow(String(message).split('\n')[0])}`);
      if (actual instanceof Error || actual?.message) lines.push(`      ${dim('Got:')} ${actual.name ?? 'Error'}: ${actual.message}`);
      return lines;
    }
    if (!generatedMessage && message) lines.push(`      ${yellow(message)}`);
    lines.push(...block(green('Expected:'), expected));
    lines.push(...block(red('Received:'), actual));
    if (actual === undefined) lines.push(dim('      (received undefined: did you forget to return a value?)'));
    const diff = firstArrayDifference(expected, actual);
    if (diff) lines.push(dim(`      ${diff}`));
    if (operator === 'strictEqual' && util.isDeepStrictEqual(actual, expected) === false && typeof actual === 'object' && actual !== null && typeof expected !== 'object') {
      lines.push(dim('      (expected a single value but received an object/array)'));
    }
    return lines;
  }

  // Not an assertion: the solution threw, a promise never settled, a test timed out, etc.
  const name = cause?.name ?? 'Error';
  const message = cause?.message ?? error?.message ?? String(cause);
  if (error?.failureType === 'testTimeoutFailure' || /timed out/i.test(error?.message ?? '')) {
    lines.push(`      ${yellow('Timed out:')} ${error.message}`);
    lines.push(dim('      (is there an infinite loop, or a promise that never resolves?)'));
    return lines;
  }
  lines.push(`      ${red('Threw:')} ${name}: ${message}`);
  const where = solutionFrame(cause?.stack);
  if (where) lines.push(`      ${dim('at')} ${where}`);
  if (/is not a function|is not a constructor/.test(message)) {
    lines.push(dim('      (check the function is written and listed in the export { ... } line)'));
  }
  return lines;
};

// stderr from a test file that crashed before running any tests (syntax error, missing export, ...).
const explainLoadFailure = (stderr) => {
  const lines = stderr.join('').split('\n').map((l) => l.trimEnd());
  const errorLine = lines.find((l) => /^\w*(Error|Exception)\b|^Error \[/.test(l)) ?? lines.find(Boolean) ?? 'unknown error';
  const location = lines.find((l) => /^file:\/\/.*:\d+$/.test(l) || /^\/.*:\d+$/.test(l));
  const out = [`      ${red('Could not load the solution:')} ${errorLine}`];
  if (location) out.push(`      ${dim('at')} ${rel(location.replace(/:(\d+)$/, ''))}:${location.match(/:(\d+)$/)[1]}`);
  if (/SyntaxError/.test(errorLine)) out.push(dim('      (the solution file has a syntax error: is a function left unfinished?)'));
  if (/does not provide an export/.test(errorLine)) out.push(dim('      (add the function to the export { ... } line at the bottom of the file)'));
  return out;
};

export default async function* reporter(source) {
  const files = new Map(); // file -> { lines, stderr, failed }
  const fileState = (file) => {
    const key = rel(file) || '(unknown file)';
    if (!files.has(key)) files.set(key, { lines: [], stderr: [], failed: false, printed: false });
    return files.get(key);
  };
  const flush = function* (key) {
    const f = files.get(key);
    if (!f || f.printed) return;
    f.printed = true;
    const label = key.replace(/^tests(-\d+)?\//, '').replace(/\.test\.js$/, '').replace('/', ' › ');
    const series = key.match(/^tests-(\d+)\//)?.[1] ?? '1';
    yield `\n${f.failed ? red('✖') : green('✔')} ${bold(label)} ${dim(`(series ${series})`)}\n`;
    yield f.lines.join('\n') + (f.lines.length ? '\n' : '');
  };

  let totals = null;
  const recap = []; // { question, test, reason } for the end-of-run list of failures
  const questionLabel = (file) => {
    const key = rel(file);
    const series = key.match(/^tests-(\d+)\//)?.[1];
    const label = key.replace(/^tests(-\d+)?\//, '').replace(/\.test\.js$/, '').replace('/', ' › ');
    return series ? `${label} (s${series})` : label;
  };
  for await (const event of source) {
    const { type, data } = event;
    if (type === 'test:stderr' || type === 'test:stdout') {
      const f = fileState(data.file);
      if (type === 'test:stderr') f.stderr.push(data.message);
      else f.lines.push(dim(`    │ ${data.message.trimEnd()}`));
    } else if (type === 'test:pass' && data.details?.type !== 'suite') {
      if (data.nesting === 0 && /\.test\.js$/.test(data.name)) continue;
      const f = fileState(data.file);
      const ms = data.details?.duration_ms ?? 0;
      f.lines.push(`  ${'  '.repeat(data.nesting)}${green('✔')} ${data.name}${ms > 100 ? dim(` (${Math.round(ms)}ms)`) : ''}`);
    } else if (type === 'test:fail' && data.details?.type !== 'suite') {
      const f = fileState(data.file);
      f.failed = true;
      const isFileLevel = data.nesting === 0 && /\.test\.js$/.test(data.name) && !data.details?.error?.cause?.name;
      if (isFileLevel) {
        f.lines.push(`  ${red('✖')} ${red('the test file could not run')}`);
        const explanation = explainLoadFailure(f.stderr);
        f.lines.push(...explanation);
        recap.push({ question: questionLabel(data.file), test: 'whole file', reason: explanation[0].replace(/^\s+/, '') });
        continue;
      }
      const where = data.line ? dim(`  ${rel(data.file)}:${data.line}`) : '';
      f.lines.push(`  ${'  '.repeat(data.nesting)}${red('✖')} ${data.name}${where}`);
      f.lines.push(...explainFailure(data.details?.error).map((l) => '  '.repeat(data.nesting) + l));
      recap.push({ question: questionLabel(data.file), test: data.name, reason: summarizeFailure(data.details?.error) });
    } else if (type === 'test:summary') {
      if (data.file) yield* flush(rel(data.file));
      else totals = data.counts;
    }
  }

  for (const key of files.keys()) yield* flush(key);

  // Recap: every failure on one line, so nothing scrolls out of view in a long run.
  if (recap.length) {
    yield `\n${bold(red(`Failing tests (${recap.length})`))}\n`;
    let lastQuestion = null;
    for (const { question, test, reason } of recap) {
      if (question !== lastQuestion) {
        yield `  ${bold(question)}\n`;
        lastQuestion = question;
      }
      yield `    ${red('✖')} ${test}\n      ${dim('→')} ${reason}\n`;
    }
  }

  if (totals) {
    const failedFiles = [...files.values()].filter((f) => f.failed).length;
    const parts = [
      `${totals.tests} tests`,
      green(`${totals.passed} passed`),
      totals.failed ? red(`${totals.failed} failed`) : `${totals.failed} failed`,
    ];
    if (totals.cancelled) parts.push(yellow(`${totals.cancelled} cancelled`));
    yield `\n${bold('Summary:')} ${files.size} question${files.size === 1 ? '' : 's'}, ${parts.join(', ')}`;
    yield failedFiles ? `  ${dim(`(${failedFiles} question${failedFiles === 1 ? '' : 's'} with failures)`)}\n` : '\n';
  }
}
