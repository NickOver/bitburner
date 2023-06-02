import { dump } from "helpers/dump"
import { hack } from "helpers/hack";
// import { BotnetComplex } from "modules/botnet-complex"
import { findAllPossibleTargets, findAllRoutes } from "service/scanner"

/** @param {NS} ns */
export async function main(ns) {
  // let a = findAllRoutes(ns);

  // for (let b in a) {
  //   ns.killall(b);
  // }

  ns.exec('hacks/grow.js', 'cassandra-64', 72, 'n00dles')

  // let host = 'foodnstuff';
  // a.run()
  // await ns.hack('n00dles');
  // dump(ns, .5 * ns.getServerMaxMoney(host) / ns.getServerMoneyAvailable(host));
  // dump(ns, , 9.536710071167548));
  // dump(ns, ns.getServerMoneyAvailable(host));
  // dump(ns, ns.hackAnalyzeChance(host));
  // await ns.hack('n00dles');
}

// n00dles
// main.js:   1 : foodnstuff
// main.js:   2 : sigma-cosmetics
// main.js:   3 : joesguns
// main.js:   4 : hong-fang-tea
// main.js:   5 : harakiri-sushi
// main.js:   6 : iron-gym
// main.js:   7 : nectar-net
// main.js:   8 : max-hardware
// main.js:   9 : zer0
// main.js:   10 : silver-helix
// main.js:   11 : phantasy
// main.js:   12 : omega-net
// main.js:   13 : neo-net