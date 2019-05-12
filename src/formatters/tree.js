import { isObject } from 'lodash';

const getGapLine = gap => ' '.repeat(gap);

const getFormattedValue = (value, gap) => (isObject(value)
  ? `{\n${getGapLine(gap + 4)}${Object.keys(value)
    .sort()
    .map(key => `${key}: ${getFormattedValue(value[key], gap + 4)}`).join(`\n${getGapLine(gap + 4)}`)}
${getGapLine(gap)}}`
  : `${value}`);

const typeActions = {
  saved: ({ key, value }, gap) => `${getGapLine(gap)}  ${key}: ${value}`,
  added: ({ key, value }, gap) => `${getGapLine(gap)}+ ${key}: ${getFormattedValue(value, gap + 2)}`,
  deleted: ({ key, value }, gap) => `${getGapLine(gap)}- ${key}: ${getFormattedValue(value, gap + 2)}`,
  updated: ({
    key, oldValue, newValue,
  }, gap) => `${getGapLine(gap)}- ${key}: ${getFormattedValue(oldValue, gap + 2)}
${getGapLine(gap)}+ ${key}: ${getFormattedValue(newValue, gap + 2)}`,
  nested: ({ key, children }, gap, fn) => `${getGapLine(gap)}  ${key}: {\n${fn(children, gap + 4).join('\n')}
${getGapLine(gap + 2)}}`,
};

export default (ast) => {
  const iter = (nodes, gap, acc = []) => {
    if (!nodes.length) return acc;
    const [first, ...rest] = nodes;
    const newAcc = [...acc, typeActions[first.type](first, gap, iter)];
    return iter(rest, gap, newAcc);
  };
  return `{\n${iter(ast, 2, []).join('\n')}\n}`;
};
