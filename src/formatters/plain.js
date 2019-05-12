import { isObject, isString } from 'lodash';

const getFormattedValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getAddreesKey = (path, key) => [...path, key].join('.');

const typeActions = {
  saved: () => '',
  added: ({ path, key, value }) => `Property '${getAddreesKey(path, key)}' was added with value: ${getFormattedValue(value)}`,
  deleted: ({ path, key }) => `Property '${getAddreesKey(path, key)}' was removed`,
  updated: ({
    path, key, oldValue, newValue,
  }) => `Property '${getAddreesKey(path, key)}' was updated. From ${getFormattedValue(oldValue)} to ${getFormattedValue(newValue)}`,
  nested: ({ children }, fn) => fn(children),
};

const stringify = options => options
  .map(lineOpts => typeActions[lineOpts.type](lineOpts, stringify))
  .filter(i => i)
  .sort()
  .join('\n');

export default ast => stringify(ast);
