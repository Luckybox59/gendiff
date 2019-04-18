import gendiff from '../src/lib/gendiff';

const sort = data => data.split('\n').sort().join('\n');

const pathToFileJson1 = './__tests__/__fixtures__/before.json';
const pathToFileJson2 = './__tests__/__fixtures__/after.json';
const pathToFileYaml1 = './__tests__/__fixtures__/before.yml';
const pathToFileYaml2 = './__tests__/__fixtures__/after.yml';
const pathToFileIni1 = './__tests__/__fixtures__/before.ini';
const pathToFileIni2 = './__tests__/__fixtures__/after.ini';

const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`;

test.each([
  [pathToFileJson1, pathToFileJson2, result],
  [pathToFileYaml1, pathToFileYaml2, result],
  [pathToFileIni1, pathToFileIni2, result],
])(
  'gendiff(%#)',
  (a, b, expected) => {
    expect(sort(gendiff(a, b))).toBe(sort(expected));
  },
);
