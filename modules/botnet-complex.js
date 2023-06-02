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
    this.botnetManager = new BotnetManager(ns, [])

    this.ns.disableLog('ALL');
    
    this.targets = this.getSortedTargets();
  }

  run() {
    for (let target in this.targets) {
      let result = true;

      let growthAmount = .5 * ns.getServerMaxMoney(target) / ns.getServerMoneyAvailable(target);

      if (this.ns.getServerSecurityLevel(target) < this.ns.getServerMinSecurityLevel() + 5) {
        let requiredThreads = Math.ceil((this.ns.getServerSecurityLevel(target) - this.ns.getServerMinSecurityLevel()) / 0.05);

        result = this.startThreadsIfNotWorking('weaken', target, requiredThreads);

      } else if (growthAmount > 0) {
        let requiredThreads = Math.ceil(this.ns.growthAnalyze(host, growthAmount));

        result = this.startThreadsIfNotWorking('grow', target, requiredThreads)

      } else if (this.ns.getServerMaxMoney(target) * 0.75 < this.ns.getServerMoneyAvailable(target)) {
        let requiredThreads = Math.ceil(this.ns.hackAnalyzeThreads(
            target, this.ns.getServerMoneyAvailable(target) - this.ns.getServerMaxMoney(target) * 0.75
        ) / this.ns.hackAnalyzeChance(host));

        result = this.startThreadsIfNotWorking('hack', target, requiredThreads)
      }

      if (!result) {
        return;
      }
    }
  }

  getSortedTargets() {
    return findAllPossibleTargets(this.ns);
  }

  startThreadsIfNotWorking(script, target, requiredThreads) {
    if (requiredThreads > this.botnetManager.getWorkingThreadsForScript(script, target)) {
      return this.botnetManager.startThreads(script, target, requiredThreads);
    }
  }
}