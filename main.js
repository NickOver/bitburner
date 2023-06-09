import { BotnetComplex } from "modules/botnet-complex";
import { BotnetSimple } from "modules/botnet-simple";
import { Server } from "modules/server";
import { getConfig } from "service/config"

/** @param {NS} ns */
export async function main(ns) {

  const SLEEP_TIME = 1000 //1s
  
  let config = getConfig(ns);

  let modules = [
    // new BotnetSimple(ns, config['botnet']),
    // new Server(ns, config['server']),
    new BotnetComplex(ns, config['botnet-complex'])
  ]

  while (true) {
    for (let key in modules) {
      modules[key].run()
    }

    await ns.sleep(SLEEP_TIME)
  }  
}