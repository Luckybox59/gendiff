import { isObject } from 'lodash';

const getGapLine = gap => ' '.repeat(gap);

const getFormattedValue = (value, gap) => (isObject(value)
  ? `{\n${getGapLine(gap + 4)}${Object.keys(value)
    .sort()
    .map(key => `${key}: ${getFormattedValue(value[key], gap + 4)}`).join(`\n${getGapLine(gap + 4)}`)}
${getGapLine(gap)}}`
  : `${value}`);

const typeActions = [
  {
    check: type => type === 'saved',
    action: ({ gap, key, value }) => `${getGapLine(gap)}  ${key}: ${value}`,
  },
  {
    check: type => type === 'added',
    action: ({ gap, key, value }) => `${getGapLine(gap)}+ ${key}: ${getFormattedValue(value, gap + 2)}`,
  },
  {
    check: type => type === 'deleted',
    action: ({ gap, key, value }) => `${getGapLine(gap)}- ${key}: ${getFormattedValue(value, gap + 2)}`,
  },
  {
    check: type => type === 'updated',
    action: ({
      gap, key, oldValue, newValue,
    }) => `${getGapLine(gap)}- ${key}: ${getFormattedValue(oldValue, gap + 2)}
${getGapLine(gap)}+ ${key}: ${getFormattedValue(newValue, gap + 2)}`,
  },
  {
    check: type => type === 'nested',
    action: ({ gap, key, children }, fn) => `${getGapLine(gap)}  ${key}: {\n${fn(children)}
${getGapLine(gap + 2)}}`,
  },
];

const getTypeAction = type => typeActions.find(({ check }) => check(type));

const stringify = options => options
  .map(lineOpts => getTypeAction(lineOpts.type)
    .action(lineOpts, stringify))
  .join('\n');

export default ast => `{\n${stringify(ast)}\n}`;
