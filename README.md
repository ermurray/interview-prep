# Interview practice

Practice questions from the *Senior Frontend / Fullstack Interview Practice Set*, each with unit tests.
Uses ES modules and Node's built-in test runner, so there is nothing to install (Node 20+; developed on Node 24).

## Layout

```
prep-questions/<section>/<question>.js   # question, example input/output, your solution (exported)
tests/<section>/<question>.test.js       # unit tests for that question
run-tests.js                             # test runner
```

| Section           | Questions                                           |
| ----------------- | --------------------------------------------------- |
| `basic`           | 1.1–1.5 Codility-style, easy                        |
| `medium`          | 1.6–1.11 Codility-style, medium                     |
| `hard`            | 1.12–1.16 Codility-style, hard                      |
| `js-from-scratch` | 2.1–2.12 debounce, throttle, promiseAll, polyfills… |
| `fullstack`       | 5.4 rate limiter, 5.5 LRU cache                     |

## Running tests

```sh
node run-tests.js                          # every test
node run-tests.js medium                   # one section
node run-tests.js basic rotate-array       # one question (".js" optional)
node run-tests.js medium passing-cars max-subarray-sum   # several questions in a section
node run-tests.js --list                   # list sections and questions
node run-tests.js --help                   # usage
```

The same through npm (note the `--`):

```sh
npm test                                   # every test
npm test -- basic rotate-array             # one question
npm run test:list                          # list sections and questions
```

Any test that runs longer than 10 seconds fails instead of hanging.

### Testing a different solutions folder

Set `SOLUTIONS_DIR` to run the tests against another folder with the same `<section>/<question>.js` layout:

```sh
SOLUTIONS_DIR=./my-other-attempt node run-tests.js hard
```

## Workflow

1. Open a question file, read the prompt and examples, and set a timer (30 min Easy, 45 Medium, 60 Hard).
2. Write your solution in the stub function. Keep the `export { ... }` line at the bottom.
3. Run that question's tests: `node run-tests.js <section> <question>`.
4. Score yourself 1–4 and redo anything scored 1–2 a week later.
