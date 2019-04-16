#!/usr/bin/env node

import program from 'commander';
import pkg from '../../package.json';
import fs from 'fs';

const gendiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = fs.readFileSync(fs.realpathSync(pathToFile1), { encoding: 'utf-8' });
  const fileContent2 = fs.readFileSync(fs.realpathSync(pathToFile2), { encoding: 'utf-8' });
  console.log(fileContent1);
  console.log(fileContent2);
};

program
  .version(pkg.version, '-v, --version')
  .option('-f, --format [type]', 'Output format');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => gendiff(firstConfig, secondConfig));
  
program.parse(process.argv);
