import { isObject } from 'lodash';

const stringify = (value, gap) => (isObject(value)
  ? Object.keys(value).sort().map(key => `{
${' '.repeat(gap + 2)}  ${key}: ${stringify(value[key], gap + 4)}\n${' '.repeat(gap)}}`)
  : `${value}`);

export default class {
  constructor({ gap, key, value }) {
    this.gap = gap;
    this.key = key;
    this.value = value;
  }

  toString() {
    return `${' '.repeat(this.gap)}+ ${this.key}: ${stringify(this.value, this.gap + 2)}`;
  }
}
