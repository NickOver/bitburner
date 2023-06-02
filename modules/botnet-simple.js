import { findAllRoutes } from "service/scanner";
import { hack } from "helpers/hack";
import { canHackHost } from "helpers/can-hack-host";

export class BotnetSimple {

  targets = {};

  /**
   * @param {NS} ns 
   */
  constructor(ns, config) {
    this.ns = ns;
    this.config = config;
    this.routes = findAllRoutes(ns);

    this.ns.disableLog('getHackingLevel');
    this.ns.disableLog('getServerRequiredHackingLevel');
    this.ns.disableLog('getServerNumPortsRequired');
  }

  run() {
    let scriptName = this.config['script'];
    let scriptTarget = this.config['target'];

    for (let host in this.routes) {
      if (canHackHost(this.ns, host)) {

        hack(this.ns, host, this.ns.getServerNumPortsRequired(host))

        if (!(host in this.targets) && this.targets[host] !== scriptTarget) {
          this.ns.killall(host);
          
          let nodesAmount = Math.floor(this.ns.getServerMaxRam(host) / this.ns.getScriptRam(scriptName));

          if (nodesAmount > 0) {
            this.ns.scp(scriptName, host, 'home');
            this.ns.exec(scriptName, host, nodesAmount, scriptTarget);
            this.targets[host] = scriptTarget;
          }
        }
      }
    }
  }
}
