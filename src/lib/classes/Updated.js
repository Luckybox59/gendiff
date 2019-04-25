import { isObject } from 'lodash';

const stringify = (value, gap) => (isObject(value)
  ? `{\n${' '.repeat(gap + 4)}${Object.keys(value)
    .sort()
    .map(key => `${key}: ${stringify(value[key], gap + 4)}`).join(`\n${' '.repeat(gap + 4)}`)}
${' '.repeat(gap)}}`
  : `${value}`);

export default class {
  constructor({
    gap, key, oldValue, newValue,
  }) {
    this.gap = gap;
    this.key = key;
    this.oldValue = oldValue;
    this.newValue = newValue;
  }

  toString() {
    return `${' '.repeat(this.gap)}- ${this.key}: ${stringify(this.oldValue, this.gap + 2)}
${' '.repeat(this.gap)}+ ${this.key}: ${stringify(this.newValue, this.gap + 2)}`;
  }
}
