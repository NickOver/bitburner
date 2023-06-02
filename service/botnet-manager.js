export class BotnetManager {

  servers = [];

  /**
   * @param {NS} ns 
   */
  constructor(ns, config) {
    this.ns = ns;
    this.config = config;

    this.servers = this.ns.getPurchasedServers();
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
    let scriptRam = this.ns.getScriptRam(this.config['scripts'][script]);

    for (let server of this.servers) {
      let availableThreads = Math.floor(this.ns.getServerMaxRam(server) / scriptRam);
      let threadsCount = Math.min(threads, availableThreads);

      this.ns.exec(this.config['scripts'][script], server, threadsCount, target);
      threads -= threadsCount;

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
          runningScripts += process[threads];
        }
      }
    }

    return runningScripts;
  }


}