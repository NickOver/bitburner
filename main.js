import { BotnetSimple } from "modules/botnet-simple";
import { Server } from "modules/server";
import { getConfig } from "service/config"

/** @param {NS} ns */
export async function main(ns) {

  const SLEEP_TIME = 10000 //10s
  
  let config = getConfig(ns);

  let modules = [
    new BotnetSimple(ns, config['botnet']),
    new Server(ns, config['server']),
  ]

  while (true) {
    for (let key in modules) {
      modules[key].run()
    }

    await ns.sleep(SLEEP_TIME)
  }  
}