import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parsers = [
  {
    type: '.json',
    action: filepath => JSON.parse(filepath),
  },
  {
    type: '.yml',
    action: filepath => yaml.safeLoad(filepath),
  },
];

const parse = (pathToFile) => {
  const fileType = path.extname(pathToFile);
  const fileContent = fs.readFileSync(fs.realpathSync(pathToFile), 'utf8');
  const parser = parsers.find(({ type }) => type === fileType);
  return parser.action(fileContent);
};

export default parse;
