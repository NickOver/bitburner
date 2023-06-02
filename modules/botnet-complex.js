// import { dump } from "helpers/dump";
// import { findAllPlayerOwningServers } from "service/scanner";

import { findAllPossibleTargets } from "service/scanner";

export class BotnetComplex {

  /**
   * @param {NS} ns 
   */
  constructor(ns, config) {
    this.ns = ns;
    this.config = config;

    this.ns.disableLog('getHackingLevel');
    this.ns.disableLog('getServerRequiredHackingLevel');
    this.ns.disableLog('getServerNumPortsRequired');
  }

  run() {
    let targets = findAllPossibleTargets(this.ns);
  }

  getAllServersWithAvailableRam() {
    let allServers = {};
    // let hosts = findAllPlayerOwningServers(this.ns);

    // for (let host of hosts) {
    //   if (this.ns.hasRootAccess(host) && host !== 'home') {
    //     allServers[host] = this.ns.getServerMaxRam(host) - this.ns.getServerUsedRam(host);
    //   }
    // }

    // dump(this.ns, allServers)

    // for (let a in allServers) {
    //   dump(this.ns, a)
    //   const hgwTime = Math.round((this.ns.getGrowTime(a) + this.ns.getWeakenTime(a) + this.ns.getHackTime(a)) / 1000);
    //   this.ns.tprint(hgwTime);
    // }

    // return allServers;
  }

}