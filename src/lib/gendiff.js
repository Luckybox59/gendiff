import { isObject, union, has } from 'lodash';
import parse from './parsers';
import buildNode from './buildNode';

const propertyActions = [
  {
    check: (data1, data2, key) => !has(data1, key) && has(data2, key),
    action: (gap, key, data1, data2) => ({
      gap,
      key,
      type: 'added',
      value: data2[key],
      children: [],
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && !has(data2, key),
    action: (gap, key, data1) => ({
      gap,
      key,
      type: 'deleted',
      value: data1[key],
      children: [],
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
      && data1[key] === data2[key],
    action: (gap, key, data1) => ({
      gap,
      key,
      type: 'saved',
      value: data1[key],
      children: [],
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
      && isObject(data1[key]) && isObject(data2[key]),
    action: (gap, key, data1, data2, fn) => ({
      gap,
      key,
      type: 'nested',
      children: fn(data1[key], data2[key], gap + 4),
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
      && data1[key] !== data2[key],
    action: (gap, key, data1, data2) => ({
      gap,
      key,
      type: 'updated',
      oldValue: data1[key],
      newValue: data2[key],
      children: [],
    }),
  },
];

const getProperty = (data1, data2, key) => propertyActions
  .find(({ check }) => check(data1, data2, key));

const makeAst = (data1, data2, gap = 2) => {
  const keys = union(Object.keys(data1), Object.keys(data2)).sort();
  const ast = keys.map((key) => {
    const options = getProperty(data1, data2, key)
      .action(gap, key, data1, data2, makeAst);
    return buildNode(options);
  });
  return ast;
};

export default (pathToFile1, pathToFile2) => {
  const data1 = parse(pathToFile1);
  const data2 = parse(pathToFile2);
  return makeAst(data1, data2);
};
