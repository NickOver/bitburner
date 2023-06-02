export class Hacknet {
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
}