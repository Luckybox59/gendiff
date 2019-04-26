import renderTree from './formatters/tree';
import renderPlain from './formatters/plain';
import renderJson from './formatters/json';

export default (ast, type = 'tree') => {
  switch (type) {
    case 'tree': return renderTree(ast);
    case 'plain': return renderPlain(ast);
    case 'json': return renderJson(ast);
    default: throw new Error('Undefined type');
  }
};
