import { findAllRoutes } from "service/scanner";

export class BotnetManager {

  servers = [];

  /**
   * @param {NS} ns 
   */
  constructor(ns, config) {
    this.ns = ns;
    this.config = config;
  }

  initialize() {
    let files = [];

    for (let script in this.config['scripts']) {
      files.push(this.config['scripts'][script])
    }

    for (let server of this.servers) {
      this.ns.killall(server);
      this.ns.scp(files, server, 'home');
    }
  }

  startThreads(script, target, threads) {
    this.getServers();
    let scriptRam = this.ns.getScriptRam(this.config['scripts'][script]);

    for (let server of this.servers) {
      let availableThreads = Math.floor((this.ns.getServerMaxRam(server) - this.ns.getServerUsedRam(server)) / scriptRam);
      let threadsCount = Math.min(threads, availableThreads);

      // dump(this.ns, threadsCount);
      // this.ns.tprintf(
      //   'Starting %s against %s on %s with %s threads.',
      //   this.config['scripts'][script],
      //   target,
      //   server,
      //   threadsCount
      // );

      if (threadsCount > 0) {
        this.ns.exec(this.config['scripts'][script], server, threadsCount, target);
        threads -= threadsCount;
      }

      if (threads <= 0) {
        return true;
      }
    }

    return false;
  }

  getWorkingThreadsForScript(script, target) {
    let runningScripts = 0;

    for (let server of this.servers) {
      let processes = this.ns.ps(server);
      for (let process of processes) {
        if (process['filename'] === this.config['scripts'][script] && process['args'][0] === target) {
          runningScripts += process['threads'];
        }
      }
    }

    return runningScripts;
  }

  getServers() {
    this.servers = this.ns.getPurchasedServers();

    for (let host in findAllRoutes(this.ns)) {
      if (this.ns.hasRootAccess(host) && !this.servers.includes(host)) {
        this.servers.push(host)
      }
    }
  }
}