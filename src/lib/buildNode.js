import Added from './classes/Added';
import Deleted from './classes/Deleted';
import Nested from './classes/Nested';
import Updated from './classes/Updated';
import Saved from './classes/Saved';

export default (options) => {
  let C = '';
  switch (options.type) {
    case 'saved': C = Saved;
      break;
    case 'added': C = Added;
      break;
    case 'deleted': C = Deleted;
      break;
    case 'nested': C = Nested;
      break;
    case 'updated': C = Updated;
      break;
    default: throw new Error('Undefined type');
  }
  return new C(options);
};
