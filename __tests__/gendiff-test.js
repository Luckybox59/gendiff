import { readFileSync } from 'fs';
import gendiff from '../src';

const getOptionsForTest = (type) => {
  const actualDataFormatTree = readFileSync('./__tests__/__fixtures__/expected-gendiff-tree.txt', 'utf8');
  const actualDataFormatPlain = readFileSync('./__tests__/__fixtures__/expected-gendiff-plain.txt', 'utf8');
  const options = {
    json: [
      './__tests__/__fixtures__/before.json',
      './__tests__/__fixtures__/after.json',
      actualDataFormatTree,
      'tree',
    ],
    yaml: [
      './__tests__/__fixtures__/before.yml',
      './__tests__/__fixtures__/after.yml',
      actualDataFormatPlain,
      'plain',
    ],
    ini: [
      './__tests__/__fixtures__/before.ini',
      './__tests__/__fixtures__/after.ini',
      actualDataFormatPlain,
      'plain',
    ],
  };
  return options[type];
};

test.each([
  getOptionsForTest('json'),
  getOptionsForTest('yaml'),
  getOptionsForTest('ini'),
])('test gendiff %#', (before, after, actual, format) => {
  const expected = gendiff(before, after, format);
  expect(expected).toBe(actual);
});
