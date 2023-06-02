import { NS } from "Bitburner";
import { DUMPER } from "Config";

export function dump(ns: NS, ...data: any) {
  for (const element of data) {
    switch (typeof element) {     
      case 'symbol':
        ns.tprint(element.toString());
        break;
      case 'object':
        dumpObject(ns, element, 0)
        break;
      default:
        ns.tprint(element);
    }
  }

  function dumpObject(ns: NS, object: Object, depth: number): void {
    if (depth === 0) {ns.tprint('{')};

    for (let key in object) {
      switch(typeof object[key]) {
        case 'symbol':
          ns.tprint([getTabWithDepth(depth + 1), key, ' : ', object[key].toString()]);
          break;
        case 'object':
          ns.tprint([getTabWithDepth(depth + 1), key, ' : {']);
          dumpObject(ns, object[key], depth + 1);
          ns.tprint([getTabWithDepth(depth + 1), '}']);
          break;
        default:
          ns.tprint([getTabWithDepth(depth + 1), key, ' : ', object[key]]);
      }
    }

    if (depth === 0) {ns.tprint('}')};
  }

  function getTabWithDepth(depth: number): string {
    let string = '';

    for (let i = 0; i < depth; i++) {
      string += DUMPER.TAB_CHAR
    }

    return string;
  }
}