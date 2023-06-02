import { dump } from "helpers/dump"
import { BotnetComplex } from "modules/botnet-complex"
import { findAllPossibleTargets } from "service/scanner"

/** @param {NS} ns */
export async function main(ns) {
  let a = new BotnetComplex(ns, {});

  // a.run()
  dump(ns, findAllPossibleTargets(ns));
}