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

    this.ns.disableLog('ALL');
    
    this.targets = this.getSortedTargets();
    // this.targets = ['n00dles'];
  }

  run() {
    for (let target of this.targets) {
      let result = true;

      let growthAmount = .5 * this.ns.getServerMaxMoney(target) / this.ns.getServerMoneyAvailable(target);

      if (this.ns.getServerSecurityLevel(target) > this.ns.getServerMinSecurityLevel(target)) {
        let requiredThreads = Math.ceil((this.ns.getServerSecurityLevel(target) - this.ns.getServerMinSecurityLevel(target)) / 0.05);
        
        result = this.startThreadsIfNotWorking('weaken', target, requiredThreads);
      } 

      if (growthAmount > 1) {
        let requiredThreads = Math.ceil(this.ns.growthAnalyze(target, growthAmount));

        result = this.startThreadsIfNotWorking('grow', target, requiredThreads)
      }

      if (this.ns.getServerMaxMoney(target) * 0.5 < this.ns.getServerMoneyAvailable(target)) {
        let requiredThreads = Math.ceil(this.ns.hackAnalyzeThreads(
            target, this.ns.getServerMoneyAvailable(target) - this.ns.getServerMaxMoney(target) * 0.5
        ) / this.ns.hackAnalyzeChance(target));

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

    return true;
  }
}