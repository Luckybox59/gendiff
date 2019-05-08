import renderTree from './tree';
import renderPlain from './plain';
import renderJson from './json';

export default (ast, type = 'tree') => {
  switch (type) {
    case 'tree': return renderTree(ast);
    case 'plain': return renderPlain(ast);
    case 'json': return renderJson(ast);
    default: throw new Error('Undefined type');
  }
};
