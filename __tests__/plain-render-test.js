import { readFileSync } from 'fs';
import plainRender from '../src/formatters/plain';
import gendiff from '../src';

test('test plainRender', () => {
  const pathToFileJson1 = './__tests__/__fixtures__/before.json';
  const pathToFileJson2 = './__tests__/__fixtures__/after.json';
  const ast = gendiff(pathToFileJson1, pathToFileJson2);

  const actual = readFileSync('./__tests__/__fixtures__/expected-plain-render.txt', 'utf8');
  expect(plainRender(ast)).toBe(actual);
});
