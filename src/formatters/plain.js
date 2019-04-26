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

const typeActions = [
  {
    check: type => type === 'saved',
    action: () => '',
  },
  {
    check: type => type === 'added',
    action: ({ path, key, value }) => `Property '${getAddreesKey(path, key)}' was added with value: ${getFormattedValue(value)}`,
  },
  {
    check: type => type === 'deleted',
    action: ({ path, key }) => `Property '${getAddreesKey(path, key)}' was removed`,
  },
  {
    check: type => type === 'updated',
    action: ({
      path, key, oldValue, newValue,
    }) => `Property '${getAddreesKey(path, key)}' was updated. From ${getFormattedValue(oldValue)} to ${getFormattedValue(newValue)}`,
  },
  {
    check: type => type === 'nested',
    action: ({ children }, fn) => fn(children),
  },
];

const getTypeAction = type => typeActions.find(({ check }) => check(type));

const stringify = options => options
  .map(lineOpts => getTypeAction(lineOpts.type)
    .action(lineOpts, stringify))
  .filter(i => i)
  .sort()
  .join('\n');

export default ast => stringify(ast);
