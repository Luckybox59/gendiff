import { readFileSync } from 'fs';
import gendiff from '../src/lib/gendiff';
import render from '../src/lib/renderer';

test('gendiff', () => {
  const path1 = './__tests__/__fixtures__/tree/before.json';
  const path2 = './__tests__/__fixtures__/tree/after.json';

  const expected = readFileSync('./__tests__/__fixtures__/tree/result2.txt', 'utf8');
  const result = render(gendiff(path1, path2));
  console.log(JSON.stringify(result, '', 2));
  expect(result).toBe(expected);
});
