import { isObject } from 'lodash';

const getGapLine = gap => ' '.repeat(gap);

const getFormattedValue = (value, gap) => (isObject(value)
  ? `{\n${getGapLine(gap + 4)}${Object.keys(value)
    .sort()
    .map(key => `${key}: ${getFormattedValue(value[key], gap + 4)}`).join(`\n${getGapLine(gap + 4)}`)}
${getGapLine(gap)}}`
  : `${value}`);

const typeActions = {
  saved: ({ gap, key, value }) => `${getGapLine(gap)}  ${key}: ${value}`,
  added: ({ gap, key, value }) => `${getGapLine(gap)}+ ${key}: ${getFormattedValue(value, gap + 2)}`,
  deleted: ({ gap, key, value }) => `${getGapLine(gap)}- ${key}: ${getFormattedValue(value, gap + 2)}`,
  updated: ({
    gap, key, oldValue, newValue,
  }) => `${getGapLine(gap)}- ${key}: ${getFormattedValue(oldValue, gap + 2)}
${getGapLine(gap)}+ ${key}: ${getFormattedValue(newValue, gap + 2)}`,
  nested: ({ gap, key, children }, fn) => `${getGapLine(gap)}  ${key}: {\n${fn(children)}
${getGapLine(gap + 2)}}`,
};

const stringify = options => options
  .map(lineOpts => typeActions[lineOpts.type](lineOpts, stringify))
  .join('\n');

export default ast => `{\n${stringify(ast)}\n}`;
