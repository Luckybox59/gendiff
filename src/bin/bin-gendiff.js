#!/usr/bin/env node

import program from 'commander';
import gendiff from '../lib/gendiff';
import pkg from '../../package.json';

program
  .version(pkg.version, '-v, --version')
  .option('-f, --format [type]', 'Output format');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => console.log(gendiff(firstConfig, secondConfig)));

program.parse(process.argv);

export default gendiff;
