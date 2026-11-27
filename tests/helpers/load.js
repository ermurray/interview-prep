// Loads a solution file from prep-questions/<section>/<name>.js.
// Set SOLUTIONS_DIR to point the tests at a different folder with the same layout.
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.SOLUTIONS_DIR
  ? path.resolve(process.env.SOLUTIONS_DIR)
  : path.join(here, '..', '..', 'prep-questions');

export default (section, name) => import(pathToFileURL(path.join(ROOT, section, `${name}.js`)).href);
