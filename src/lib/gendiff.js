import _ from 'lodash';
import parse from './parsers';

export default (pathToFile1, pathToFile2) => {
  const data1 = parse(pathToFile1);
  const data2 = parse(pathToFile2);
  const keys1 = Object.keys(data1)
    .filter(key => !_.has(data2, key))
    .map(key => `  - ${key}: ${data1[key]}`);

  const keys2 = Object.keys(data2);

  const result = keys2.reduce((acc, key) => {
    if (_.has(data1, key)) {
      if (data1[key] === data2[key]) {
        return [...acc, `    ${key}: ${data1[key]}`];
      }
      return [...acc, `  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`];
    }
    return [...acc, `  + ${key}: ${data2[key]}`];
  },
  [...keys1]);

  return ['{', ...result, '}'].join('\n');
};
