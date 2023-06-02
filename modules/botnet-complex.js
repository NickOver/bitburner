import { dump } from "helpers/dump";
import { BotnetManager } from "service/botnet-manager";
import { findAllPossibleTargets } from "service/scanner";

export class BotnetComplex {

  /**
   * @param {NS} ns 
   */
  constructor(ns, config) {
    this.ns = ns;
    this.config = config;
    this.botnetManager = new BotnetManager(ns, this.config)
    this.botnetManager.initialize();

    // this.ns.disableLog('ALL');
    // this.targets = ['n00dles'];
  }

  run() {
    for (let target of this.getSortedTargets()) {
      this.ns.print(target);
      let growthAmount = .5 * this.ns.getServerMaxMoney(target) / this.ns.getServerMoneyAvailable(target);

      if (this.ns.getServerSecurityLevel(target) > this.ns.getServerMinSecurityLevel(target)) {
        let requiredThreads = Math.ceil((this.ns.getServerSecurityLevel(target) - this.ns.getServerMinSecurityLevel(target)) / 0.05);

        if (!this.startThreadsIfNotWorking('weaken', target, requiredThreads)) {
          // return;
        }
      } 

      if (growthAmount > 1) {
        let requiredThreads = Math.ceil(this.ns.growthAnalyze(target, growthAmount));

        if (!this.startThreadsIfNotWorking('grow', target, requiredThreads)) {
          // return;
        }
      }

      if (this.ns.getServerMaxMoney(target) * 0.5 < this.ns.getServerMoneyAvailable(target)) {
        let requiredThreads = Math.ceil(this.ns.hackAnalyzeThreads(
            target, this.ns.getServerMoneyAvailable(target) - this.ns.getServerMaxMoney(target) * 0.5
        ) / this.ns.hackAnalyzeChance(target));

        if (!this.startThreadsIfNotWorking('hack', target, requiredThreads)) {
          // return;
        }
      }
    }
  }

  getSortedTargets() {
    return findAllPossibleTargets(this.ns);
  }

  startThreadsIfNotWorking(script, target, requiredThreads) {
    if (requiredThreads > this.botnetManager.getWorkingThreadsForScript(script, target)) {
      return this.botnetManager.startThreads(
        script,
        target,
        requiredThreads - this.botnetManager.getWorkingThreadsForScript(script, target)
      );
    }

    return true;
  }
}