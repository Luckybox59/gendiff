import gendiff from '../src/bin/gendiff';
import fs from 'fs';

const before = fs.readFileSync(fs.realpathSync('./__fixtures__/after.json', { encoding: 'utf-8' });
const after = fs.readFileSync('/home/igor/dev/gen-diff/project-lvl2-s463/__tests__/__fixtures__/after.json');
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