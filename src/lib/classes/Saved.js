export default class {
  constructor({ gap, key, value }) {
    this.gap = gap;
    this.key = key;
    this.value = value;
  }

  toString() {
    return `${' '.repeat(this.gap)}  ${this.key}: ${this.value}`;
  }
}
