import { getConfig } from "service/config";
import { getAmountOfPortsToOpen } from "helpers/get-amount-of-ports-to-open";
import { hack } from "helpers/hack";
import { findAllRoutes } from "service/scanner";
import { dump } from "helpers/dump";

/** @param {NS} ns */
export async function main(ns) {
  let config = getConfig(ns)
  const scriptName = config['botnet']['script'];
  const scriptTarget = config['botnet']['target'];
  let routes = findAllRoutes(ns);

  ns.disableLog("getServerRequiredHackingLevel");

  for (let host in routes) {
    if (
      ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel() &&
      ns.getServerNumPortsRequired(host) <= getAmountOfPortsToOpen(ns) &&
      ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel()
    ) {
      ns.tprintf('Hacking %s', host);
      
      if (!ns.hasRootAccess(host)) {
        hack(ns, host, ns.getServerNumPortsRequired(host))
      }
      
      ns.killall(host);

      let nodesAmount = Math.floor(ns.getServerMaxRam(host) / ns.getScriptRam(scriptName));
      
      if (nodesAmount > 0) {
        ns.scp(scriptName, host, 'home');
        ns.exec(scriptName, host, nodesAmount, scriptTarget); 
      }
    }
  }
}