import test from 'node:test';
import assert from 'node:assert/strict';
import load from '../helpers/load.js';

const { wordLadder } = await load('hard', 'word-ladder');

const WORDS = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

test('example: hit -> cog = 5', () => assert.equal(wordLadder('hit', 'cog', WORDS), 5));
test('END must be in WORDS', () =>
  assert.equal(
    wordLadder(
      'hit',
      'cog',
      WORDS.filter((w) => w !== 'cog'),
    ),
    0,
  ));
test('one step', () => assert.equal(wordLadder('a', 'c', ['a', 'b', 'c']), 2));
test('BEGIN does not need to be in WORDS', () =>
  assert.equal(wordLadder('hot', 'dot', ['dot']), 2));
test('no path -> 0', () => assert.equal(wordLadder('abc', 'xyz', ['xyz', 'abd']), 0));
test('takes the shorter of two routes', () =>
  assert.equal(wordLadder('cat', 'dog', ['cot', 'cog', 'dog', 'bat', 'bot', 'bog']), 4));
test('BEGIN appearing in WORDS is fine', () =>
  assert.equal(wordLadder('hit', 'cog', ['hit', ...WORDS]), 5));
test('5,000 words finishes quickly', () => {
  const words = [];
  for (let i = 0; i < 5000; i++)
    words.push(
      `a${String(i).padStart(4, '0')}`.replace(/\d/g, (d) => String.fromCharCode(97 + Number(d))),
    );
  const start = Date.now();
  wordLadder('aaaaa', words[4999], words);
  assert.ok(Date.now() - start < 2000);
});
