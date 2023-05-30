import { Botnet } from "modules/botnet";
import { getConfig } from "service/config"

/** @param {NS} ns */
export async function main(ns) {

  const SLEEP_TIME = 10000 //10s
  
  let config = getConfig(ns);

  let modules = [
    new Botnet(ns, config['botnet']),
  ]

  while (true) {
    for (let key in modules) {
      modules[key].run()
    }

    await ns.sleep(SLEEP_TIME)
  }  
}