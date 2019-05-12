import { isObject, union, has } from 'lodash';
import fs from 'fs';
import fpath from 'path';
import parse from './parsers';
import render from './formatters';

const propertyActions = [
  {
    check: (data1, data2, key) => !has(data1, key) && has(data2, key),
    action: (gap, path, key, data1, data2) => ({
      gap,
      path,
      key,
      type: 'added',
      value: data2[key],
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && !has(data2, key),
    action: (gap, path, key, data1) => ({
      gap,
      path,
      key,
      type: 'deleted',
      value: data1[key],
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
      && data1[key] === data2[key],
    action: (gap, path, key, data1) => ({
      gap,
      path,
      key,
      type: 'saved',
      value: data1[key],
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
      && isObject(data1[key]) && isObject(data2[key]),
    action: (gap, path, key, data1, data2, fn) => ({
      gap,
      path,
      key,
      type: 'nested',
      children: fn(data1[key], data2[key], [...path, key], gap + 4),
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
      && data1[key] !== data2[key],
    action: (gap, path, key, data1, data2) => ({
      gap,
      path,
      key,
      type: 'updated',
      oldValue: data1[key],
      newValue: data2[key],
    }),
  },
];

const getProperty = (data1, data2, key) => propertyActions
  .find(({ check }) => check(data1, data2, key));

const makeAst = (data1, data2, path = [], gap = 2) => {
  const keys = union(Object.keys(data1), Object.keys(data2)).sort();
  const ast = keys.map((key) => {
    const options = getProperty(data1, data2, key)
      .action(gap, path, key, data1, data2, makeAst);
    return options;
  });
  return ast;
};

export default (pathToFile1, pathToFile2, format = 'tree') => {
  const fileContent1 = fs.readFileSync(fs.realpathSync(pathToFile1), 'utf8');
  const fileContent2 = fs.readFileSync(fs.realpathSync(pathToFile2), 'utf8');
  const data1 = parse(fileContent1, fpath.extname(pathToFile1));
  const data2 = parse(fileContent2, fpath.extname(pathToFile1));
  return render(makeAst(data1, data2), format);
};
