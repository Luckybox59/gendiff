import gendiff from '../src/bin/gendiff';

const before = './__tests__/__fixtures__/before.json';
const after = './__tests__/__fixtures__/after.json';
console.log(before);
test('compare', () => {
  expect(gendiff(before, after)).toBe(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`)
});