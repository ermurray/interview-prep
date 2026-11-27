# Interview practice

Practice questions from the *Senior Frontend / Fullstack Interview Practice Set*, each with unit tests.
Uses ES modules and Node's built-in test runner, so the tests need nothing installed (Node 20+; developed on Node 24).
Linting and formatting need `npm install` and Node 24+ (see [Linting](#linting)).

There are three series. Each one practises the same concepts with different problems (for example,
*unpaired element* → *missing element* → *duplicate value*, or *skyline blocks* → *largest rectangle*
→ *sum of slice minimums*). Each question in series 2 and 3 names its counterparts in the earlier series.

## Branches

Two branches, and changes only ever flow **one way: `main` → `practice`**.

```
  feature branch ──PR──▶ main ──(automatic sync)──▶ practice
  (started from main)     │                           │
                          │  never ◀──────────────────┘  practice holds your solutions
```

| Branch     | What it holds                                                                 |
| ---------- | ----------------------------------------------------------------------------- |
| `main`     | Unanswered questions, tests and tooling only. Protected: changes go in by pull request, and CI must pass. |
| `practice` | Your solutions. Solve problems here and commit as often as you like. Never merged into `main`. |

**Solving problems:**

```sh
git switch practice
git pull                   # pick up anything synced from main
# ...solve, commit, push
```

**Changing questions, tests or tooling** (anything that should be on `main`): start a branch from
`main`, never from `practice`, and open a pull request into `main`:

```sh
git switch -c my-change origin/main
# ...change, commit, push
gh pr create --base main
```

When the pull request is merged, the *Sync main into practice* workflow merges `main` into
`practice` for you. If that merge conflicts, the workflow fails and leaves `practice` alone; merge it
by hand with `git switch practice && git pull && git merge origin/main`.

**What keeps `practice` out of `main`:**

| Guard | Where | What it stops |
| ----- | ----- | ------------- |
| `no-practice-commits` | CI, required on every PR to `main` | A PR from `practice`, or from any branch started from `practice` (any commit made on `practice` is rejected). |
| `check-unanswered` | CI, required on every PR to `main` | Any filled-in solution, however it got there. |
| Branch protection | GitHub | Direct pushes to `main`, force-pushes and deleting `main`. |
| `pre-push` hook | your machine | Pushing `practice` commits to `main`, before it reaches GitHub. |
| `pre-commit` hook | your machine | Committing answers while on `main`. |

Run `npm run setup` once per clone to turn the hooks on. You can run the checks by hand with
`npm run check:unanswered` and `npm run check:no-practice`.

## Linting

```sh
npm install          # once per clone: installs ESLint + Prettier (dev only, the tests need nothing)
npm run lint         # check everything
npm run lint:fix     # fix what can be fixed automatically
npm run format       # format with Prettier (Airbnb style: 2 spaces, single quotes, 100 cols)
npx eslint prep-questions/basic/rotate-array.js   # one file
```

The rules live in `eslint.config.js`. The base is the
[Airbnb style guide](https://github.com/airbnb/javascript) (via `eslint-config-airbnb-extended`),
with `eslint-config-prettier` last so formatting is left to Prettier. On top of that the rules are
tuned per kind of file:

| Files | What's different |
| ----- | ---------------- |
| `prep-questions*/` | Unused **parameters** are allowed (stubs don't use them yet), but unused local variables are not. `getter-return`, `no-useless-constructor` and `class-methods-use-this` are off because stubs are empty; the tests check what your code returns. Each file **must** keep a named `export { ... }` (`local/require-named-export`) and must not use `export default`, because the tests load solutions with `const { fn } = await load(...)`. Scaffolding that is part of a question (like series 3's placeholder `_`) is marked `// provided` so the unanswered check allows it. `no-unused-modules` and `prefer-default-export` are off: static analysis can't see those dynamic imports, and each question has one named export by design. |
| `tests*/` | Parameters kept only for arity (like `function (_a, _b)`) must start with `_`. Rules that would ban deliberate fixtures are off: `no-extend-native` (polyfill tests), `prefer-promise-reject-errors`, `no-promise-executor-return`, and `no-plusplus`. |
| `run-tests.js`, `scripts/` | CLI scripts: `console`, shebangs, sync `fs` calls, `process.exit`, `continue` and `++` are allowed. |
| everything | Airbnb base + Node rules, `.js` extensions required on relative imports (Node ESM needs them, unlike Airbnb's default), no mutable exports, `===` except `== null`, no `var`, `prefer-const` (warning). `no-restricted-syntax` (Airbnb's ban on `for...of`) is a warning, not an error. |

CI runs the linter on every pull request to `main`, alongside the unanswered check.

## Layout

```
prep-questions/<section>/<question>.js     # series 1: question, examples, your solution (exported)
prep-questions-2/<section>/<question>.js   # series 2
prep-questions-3/<section>/<question>.js   # series 3
tests/<section>/<question>.test.js         # series 1 tests
tests-2/<section>/<question>.test.js       # series 2 tests
tests-3/<section>/<question>.test.js       # series 3 tests
run-tests.js                               # test runner
scripts/check-unanswered.js                # keeps main free of answers
scripts/check-no-practice-commits.js       # keeps practice commits out of main
scripts/test-reporter.js                   # expected vs received output for failing tests
eslint.config.js                           # lint rules (see Linting above)
.prettierrc.json                           # formatting rules
```

| Section           | Series 1                                            | Series 2                                                  | Series 3                                                          |
| ----------------- | --------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| `basic`           | 1.1–1.5 Codility-style, easy                        | 1.1–1.5 Codility-style, easy                              | 1.1–1.5 Codility-style, easy                                      |
| `medium`          | 1.6–1.11 Codility-style, medium                     | 1.6–1.11 Codility-style, medium                           | 1.6–1.11 Codility-style, medium                                   |
| `hard`            | 1.12–1.16 Codility-style, hard                      | 1.12–1.16 Codility-style, hard                            | 1.12–1.16 Codility-style, hard                                    |
| `js-from-scratch` | 2.1–2.12 debounce, throttle, promiseAll, polyfills… | 2.1–2.12 debouncePromise, timeout, task queue, polyfills… | 2.1–2.12 request batcher, circuit breaker, SWR cache, polyfills… |
| `fullstack`       | 5.4 rate limiter, 5.5 LRU cache                     | 5.4 token bucket, 5.5 TTL cache                           | 5.4 fixed-window limiter + headers, 5.5 LFU cache                 |

## Running tests

Series 1 is the default. Add `--series 2` / `-s 2` for series 2, or `-s 3` for series 3.

```sh
node run-tests.js                          # every series 1 test
node run-tests.js medium                   # one section
node run-tests.js basic rotate-array       # one question (".js" optional)
node run-tests.js medium passing-cars max-subarray-sum   # several questions in a section
node run-tests.js --list                   # list sections and questions

node run-tests.js -s 2                     # every series 2 test
node run-tests.js -s 2 hard coin-ways      # one series 2 question
node run-tests.js -s 2 --list              # list series 2

node run-tests.js -s 3 medium car-pooling  # one series 3 question
node run-tests.js -s 3                     # every series 3 test

node run-tests.js --help                   # usage
```

The same through npm (note the `--`):

```sh
npm test                                   # series 1, everything
npm test -- basic rotate-array             # series 1, one question
npm run test:2 -- hard coin-ways           # series 2, one question
npm run test:3 -- hard open-the-lock       # series 3, one question
npm run test:list                          # list series 1
npm run test:2:list                        # list series 2
npm run test:3:list                        # list series 3
```

Any test that runs longer than 10 seconds fails instead of hanging. On `main` every test fails,
because the questions are unanswered.

### Reading the output

Results are grouped by question. Each failing test shows what was expected next to what your
solution returned, and the same failures are listed again, one line each, at the end of the run:

```
✖ basic › rotate-array (series 1)
  ✖ [1, 2, 3, 4, 5], 2 -> [4, 5, 1, 2, 3]  tests/basic/rotate-array.test.js:7
      Expected: [ 4, 5, 1, 2, 3 ]
      Received: [ 3, 4, 5, 1, 2 ]
      first difference at index [0]: expected 4, received 3

Failing tests (1)
  basic › rotate-array
    ✖ [1, 2, 3, 4, 5], 2 -> [4, 5, 1, 2, 3]
      → expected [ 4, 5, 1, 2, 3 ], received [ 3, 4, 5, 1, 2 ]
```

If your code throws, you get the error and the line in your file that threw. If a file won't load
(for example, an unfinished function), you get the syntax error and its line. Add `--spec` to use
Node's built-in output instead: `node run-tests.js --spec basic`.

### Testing a different solutions folder

Set `SOLUTIONS_DIR` to run the tests against another folder with the same `<section>/<question>.js` layout:

```sh
SOLUTIONS_DIR=./my-other-attempt node run-tests.js hard
```

## Workflow

1. On the `practice` branch, open a question file, read the prompt and examples, and set a timer
   (30 min Easy, 45 Medium, 60 Hard).
2. Write your solution in the stub function. Keep the `export { ... }` line at the bottom.
3. Run that question's tests: `node run-tests.js [-s 2|3] <section> <question>`.
4. Score yourself 1–4 and redo anything scored 1–2 a week later.
