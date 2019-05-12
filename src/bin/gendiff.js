#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';
import pkg from '../../package.json';

program
  .version(pkg.version, '-v, --version')
  .option('-f, --format [type]', 'Output format', 'tree');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
