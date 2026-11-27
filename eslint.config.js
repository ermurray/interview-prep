// ESLint flat config. Run with `npm run lint` (or `npm run lint:fix`).
//
// Base: Airbnb style (eslint-config-airbnb-extended), with Prettier handling formatting.
// On top of that, rules tuned for three kinds of files:
//   1. Question files (prep-questions*/)  - stubs on main, your solutions on practice
//   2. Tests (tests*/)                    - load solutions dynamically with `await load(...)`
//   3. Tooling (run-tests.js, scripts/, eslint.config.js)
import js from '@eslint/js';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

// Small local rule: every question file must have a named export, because the tests load
// solutions with `const { fn } = await load(...)`. (import-x/no-unused-modules could check this,
// but it is a no-op under ESLint 10.)
const local = {
  rules: {
    'require-named-export': {
      meta: {
        type: 'problem',
        docs: { description: 'Question files must export their solution by name' },
        messages: {
          missing:
            'This question file exports nothing. The tests import the solution by name, so keep the `export { ... };` line at the bottom.',
        },
        schema: [],
      },
      create(context) {
        return {
          'Program:exit': (program) => {
            if (!program.body.some((node) => node.type === 'ExportNamedDeclaration')) {
              context.report({ loc: { line: 1, column: 0 }, messageId: 'missing' });
            }
          },
        };
      },
    },
  },
};

export default [
  { ignores: ['node_modules/'] },

  // ---- base: ESLint recommended + Airbnb (JS, Node, TypeScript) ----
  { name: 'js/recommended', ...js.configs.recommended },
  plugins.stylistic,
  plugins.importX,
  plugins.node,
  plugins.typescriptEslint,
  ...configs.base.recommended,
  ...configs.node.recommended,
  ...configs.base.typescript,

  // ---- everything ----
  {
    name: 'project/all-files',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
      // Type-aware linting (uses jsconfig.json automatically)
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      // Node ESM needs the file extension on relative imports (unlike a bundler/Next.js project).
      'import-x/extensions': ['error', 'ignorePackages'],
      'import-x/no-mutable-exports': 'error',
      'import-x/first': 'error',
      eqeqeq: ['error', 'smart'], // allows `x == null`
      'no-var': 'error',
      'prefer-const': 'warn',
      // Airbnb bans for...in / for...of / labels / with: show as warnings, not errors
      'no-restricted-syntax': 'warn',
      // ESM has no __filename/__dirname, so files recreate them under the same names.
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
    },
  },

  // ---- 1. question files ----
  {
    name: 'project/question-files',
    files: ['prep-questions*/**/*.js'],
    plugins: { local },
    rules: {
      // Stubs are `(A, K) => { // your solution here }`, so parameters are unused until you
      // answer. Unused local variables are still reported.
      'no-unused-vars': ['error', { args: 'none' }],
      // Stub getters (`get size() {}`) have no body yet. The tests check that your getters
      // return the right thing, so nothing is lost by turning this off.
      'getter-return': 'off',
      // Stub classes have empty constructors and methods that don't use `this` yet.
      'no-useless-constructor': 'off',
      'class-methods-use-this': 'off',
      // The tests do `const { fn } = await load(...)`, so every question file needs a named
      // export...
      'local/require-named-export': 'error',
      // ...and no default export (it would be invisible to the tests).
      'import-x/no-default-export': 'error',
      // Off on purpose: the tests load solutions dynamically, so static analysis sees every
      // export as unused, and each question has a single named export by design.
      'import-x/no-unused-modules': 'off',
      'import-x/prefer-default-export': 'off',
    },
  },

  // ---- 2. tests ----
  {
    name: 'project/tests',
    files: ['tests*/**/*.js'],
    rules: {
      // Tests often declare parameters they don't read to give a function the right
      // arity, e.g. `function (a, b) { return arguments.length; }`. Prefix those with _
      // or add an eslint-disable comment explaining why.
      'no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_' }],
      // Deliberate fixtures: polyfill tests patch prototypes, promise tests reject with
      // non-Error values and use `new Promise((r) => setTimeout(r, ms))`.
      'no-extend-native': 'off',
      'prefer-promise-reject-errors': 'off',
      'no-promise-executor-return': 'off',
      'no-unused-expressions': ['error', { allowTernary: true }],
      'no-plusplus': 'off',
    },
  },

  // ---- 3. tooling ----
  {
    name: 'project/tooling',
    files: ['run-tests.js', 'scripts/**/*.js', 'eslint.config.js'],
    rules: {
      'no-console': 'off',
      // CLI scripts: a shebang, synchronous file reads and process.exit are expected.
      'n/hashbang': 'off',
      'n/no-sync': 'off',
      'n/no-process-exit': 'off',
      'no-continue': 'off',
      'no-plusplus': 'off',
    },
  },

  // Must be last: turns off every rule that would conflict with Prettier
  prettierConfig,
];
