#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import _ from 'lodash';
import pkg from '../../package.json';

const finddiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
    .filter(key => !_.has(data2, key))
    .map(key => `  - ${key}: ${data1[key]}`);

  const keys2 = Object.keys(data2);

  const result = keys2.reduce((acc, key) => {
    if (_.has(data1, key)) {
      if (data1[key] === data2[key]) {
        return [...acc, `    ${key}: ${data1[key]}`];
      }
      return [...acc, `  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`];
    }
    return [...acc, `  + ${key}: ${data2[key]}`];
  },
  [...keys1]);

  return ['{', ...result, '}'].join('\n');
};

const gendiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = fs.readFileSync(fs.realpathSync(pathToFile1), { encoding: 'utf-8' });
  const fileContent2 = fs.readFileSync(fs.realpathSync(pathToFile2), { encoding: 'utf-8' });
  console.log(finddiff(JSON.parse(fileContent1), JSON.parse(fileContent2)));
};

program
  .version(pkg.version, '-v, --version')
  .option('-f, --format [type]', 'Output format');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => gendiff(firstConfig, secondConfig));

program.parse(process.argv);

export default gendiff;
