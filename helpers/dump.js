/**
 * Tab size (default: '  ')
 */
const tab = '  ';

/**
 * Dump any data in human-readable format
 * @param {NS} ns 
 * @param {any} data
 */
export function dump(ns, data) {
  switch (typeof data) {     
    case 'symbol':
      ns.tprint(data.toString());
      break;
    case 'object':
      dumpObject(ns, data, 0)
      break;
    default:
      ns.tprint(data);
  }
}

/**
 * Dumps object in human-readable format
 * @param {NS} ns 
 * @param {object} object
 * @param {number} depth
 */
function dumpObject(ns, object, depth) {
  if (depth === 0) {ns.tprint('{')};

  for (let key in object) {
    switch(typeof object[key]) {
      case 'symbol':
        ns.tprint(getTabWithDepth(depth + 1), key, ' : ', object[key].toString());
        break;
      case 'object':
        ns.tprint(getTabWithDepth(depth + 1), key, ' : {');
        dumpObject(ns, object[key], depth + 1);
        ns.tprint(getTabWithDepth(depth + 1), '}');
        break;
      default:
        ns.tprint(getTabWithDepth(depth + 1), key, ' : ', object[key]);
    }
  }

  if (depth === 0) {ns.tprint('}')};
}

/**
 * Return string with required tab size
 * @param {number} depth 
 * @returns {string}
 */
function getTabWithDepth(depth) {
  let string = '';

  for (let i = 0; i < depth; i++) {
    string += tab
  }

  return string;
}