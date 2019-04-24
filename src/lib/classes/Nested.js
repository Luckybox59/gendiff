export default class {
  constructor({ gap, key, children }) {
    this.gap = gap;
    this.key = key;
    this.children = children;
  }

  toString() {
    return `${' '.repeat(this.gap)}  ${this.key}: {\n${this.children.join('\n')}
${' '.repeat(this.gap + 2)}}`;
  }
}
