import ini from 'ini';
import yaml from 'js-yaml';

export default (fileContent, fileType) => {
  const parser = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parser[fileType](fileContent);
};
