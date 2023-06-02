import { deployAndRun } from "helpers/deploy-and-run";

export class Server {

  targets = {};

  /**
   * @param {NS} ns 
   */
  constructor(ns, config) {
    this.ns = ns;
    this.config = config;

    this.ns.disableLog('getHackingLevel');
    this.ns.disableLog('getServerRequiredHackingLevel');
    this.ns.disableLog('getServerNumPortsRequired');
    this.ns.disableLog('getServerMaxRam');
    this.ns.disableLog('getServerMoneyAvailable');
  }

  run() {
    let scriptTarget = this.config['target'];
    let scriptName = this.config['script']
    let serverAmount = this.config['server_amount'];
    let serverRam = Math.pow(2, this.config['server_ram_level']);
    let serverName = this.config['server_name'];

    let servers = this.ns.getPurchasedServers();

    this.upgradeServers(servers, serverRam);

    if (
      servers.length < serverAmount &&
      this.ns.getPurchasedServerLimit() > servers.length
    ) {
      let serversToBuy = Math.min(serverAmount, this.ns.getPurchasedServerLimit()) - servers.length;
      this.purchaseServers(serversToBuy, serverRam, serverName)
    }
    
    this.deployOnAll(scriptTarget, scriptName);
  }

  upgradeServers(servers, serverRam) {
    for (let key in servers) {
      let host = servers[key];

      if (
        this.ns.getServerMaxRam(host) !== serverRam &&
        this.ns.getPurchasedServerUpgradeCost(host, serverRam) <= this.ns.getServerMoneyAvailable('home')
      ) {
        this.ns.upgradePurchasedServer(host, serverRam);
      } 
    }
  }

  purchaseServers(serversToBuy, serverRam, serverName) {
    for (let i = 0; i < serversToBuy; i++) {
      if (this.ns.getPurchasedServerCost(serverRam) <= this.ns.getServerMoneyAvailable('home')) {
        this.ns.purchaseServer(serverName, serverRam);
      }

      return;
    }
  }

  deployOnAll(scriptTarget, scriptName) {
    let servers = this.ns.getPurchasedServers();
    for (let key in servers) {
      let host = servers[key];
      if (!(host in this.targets) && this.targets[host] !== scriptTarget) {
        this.ns.killall(host);
        deployAndRun(this.ns, host, scriptTarget, scriptName);
        this.targets[host] = scriptTarget;
      }
    }
  }
}