import { findAllPossibleTargets } from "Helpers/Scanner";
import { HackingScript } from "Enum/HackingScript";
export default class Worm {
    constructor(ns, processManager) {
        this.ns = ns;
        this.processManager = processManager;
    }
    run() {
        findAllPossibleTargets(this.ns).forEach(target => {
            if (this.ns.hasRootAccess(target) &&
                this.ns.getServerRequiredHackingLevel(target) <= this.ns.getHackingLevel()) {
                return;
            }
            this.processManager.startProcessIfNotStarted({
                'filename': HackingScript.ROOT,
                'threads': 1,
                'arguments': [target]
            });
        });
    }
}
