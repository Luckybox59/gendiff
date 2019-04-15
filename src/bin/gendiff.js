#!/usr/bin/env node

import program from 'commander';
import pkg from '../../package.json';

program
  .description('Compares two configuration files and shows a difference.')
  .version(pkg.version, '-v, --version')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);