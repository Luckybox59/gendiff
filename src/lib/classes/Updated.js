import { isObject } from 'lodash';

const stringify = (value, gap) => (isObject(value)
  ? Object.keys(value).sort().map(key => `{
${' '.repeat(gap + 2)}  ${key}: ${stringify(value[key], gap + 4)}\n${' '.repeat(gap)}}`)
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
