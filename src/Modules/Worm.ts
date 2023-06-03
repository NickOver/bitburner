import { NS } from "Bitburner";
import HacknetModule from "./HacknetModuleInterface";
import { findAllPossibleTargets } from "Helpers/Scanner";
import ProcessManager from "./ProcessManager";

export default class Worm implements HacknetModule {

  ns: NS;
  processManager: ProcessManager;

  constructor(ns: NS, processManager: ProcessManager) {
    this.ns = ns;
    this.processManager = processManager;
  }

  public run() {
    findAllPossibleTargets(this.ns).forEach(target => {
      if (
        this.ns.hasRootAccess(target) &&
        this.ns.getServerRequiredHackingLevel(target) >= this.ns.getHackingLevel()
      ) {
        return;
      }

      this.processManager.startProcessIfNotStarted({
        'filename': HackingScript['ROOT'],
        'threads': 1,
        'arguments': [target]
      });
    });
  }
}