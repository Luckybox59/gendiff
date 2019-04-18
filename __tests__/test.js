import gendiff from 'gendiff_by_igor_lucky';

const pathToFile1 = './__tests__/__fixtures__/before.json';
const pathToFile2 = './__tests__/__fixtures__/after.json';
test('compare', () => {
  expect(gendiff(pathToFile1, pathToFile2).split('\n').sort().join('\n')).toBe(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`.split('\n').sort().join('\n'));
});
