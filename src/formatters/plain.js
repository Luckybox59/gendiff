import { isObject, isString, flattenDeep } from 'lodash';

const getFormattedValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getAddressKey = (path, key) => [...path, key].join('.');

const typeActions = {
  saved: () => '',
  added: ({ key, value }, path) => `Property '${getAddressKey(path, key)}' was added with value: ${getFormattedValue(value)}`,
  deleted: ({ key }, path) => `Property '${getAddressKey(path, key)}' was removed`,
  updated: ({
    key, oldValue, newValue,
  }, path) => `Property '${getAddressKey(path, key)}' was updated. From ${getFormattedValue(oldValue)} to ${getFormattedValue(newValue)}`,
  nested: ({ key, children }, path, fn) => fn(children, [...path, key]),
};

export default (ast) => {
  const iter = (nodes, path, acc = []) => {
    if (!nodes.length) return acc;
    const [first, ...rest] = nodes;
    const newAcc = [...acc, typeActions[first.type](first, path, iter)];
    return iter(rest, path, newAcc);
  };
  return flattenDeep(iter(ast, [], []))
    .filter(i => i)
    .join('\n');
};
