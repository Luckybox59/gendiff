import { readFileSync } from 'fs';
import gendiff, { render } from '../src';

const pathToFileJson1 = './__tests__/__fixtures__/before.json';
const pathToFileJson2 = './__tests__/__fixtures__/after.json';

const pathToFileYaml1 = './__tests__/__fixtures__/before.yml';
const pathToFileYaml2 = './__tests__/__fixtures__/after.yml';

const pathToFileIni1 = './__tests__/__fixtures__/before.ini';
const pathToFileIni2 = './__tests__/__fixtures__/after.ini';

const actualData = readFileSync('./__tests__/__fixtures__/expected-gendiff.txt', 'utf8');

test.each([
  [pathToFileJson1, pathToFileJson2, actualData],
  [pathToFileYaml1, pathToFileYaml2, actualData],
  [pathToFileIni1, pathToFileIni2, actualData],
])('test gendiff %#', (a, b, actual) => {
  const expected = render(gendiff(a, b), 'tree');
  expect(expected).toBe(actual);
});
