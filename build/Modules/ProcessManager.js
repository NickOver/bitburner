import { initialize } from "Helpers/HostInitializer";
import { findAllRootedHosts } from "Helpers/Scanner";
export default class ProcessManager {
    constructor(ns) {
        this.ns = ns;
        initialize(ns, ...findAllRootedHosts(this.ns, false));
    }
    startProcessIfNotStarted(process) {
        process['threads'] -= Math.max(0, this.getWorkingThreadsForProcess(process));
        if (process['threads'] > 0) {
            this.startProcess(process);
        }
    }
    getWorkingThreadsForProcess(process) {
        let runningScripts = 0;
        for (let host of findAllRootedHosts(this.ns, false)) {
            for (let processInfo of this.ns.ps(host)) {
                if (processInfo['filename'] === process['filename'] &&
                    processInfo['args'][0] === process['arguments'][0]) {
                    runningScripts += process['threads'];
                }
            }
        }
        return runningScripts;
    }
    startProcess(process) {
        let scriptRam = this.ns.getScriptRam(process['filename']);
        for (let host of findAllRootedHosts(this.ns, false)) {
            let availableThreads = Math.floor((this.ns.getServerMaxRam(host) - this.ns.getServerUsedRam(host)) / scriptRam);
            let threadsCount = Math.min(process['threads'], availableThreads);
            if (threadsCount > 0) {
                this.ns.exec(process['filename'], host, threadsCount, ...process['arguments']);
                process['threads'] -= threadsCount;
            }
        }
    }
}
