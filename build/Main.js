import { MAIN } from "Config";
import ProcessManager from "Modules/ProcessManager";
import Worm from "Modules/Worm";
export async function main(ns) {
    let processManager = new ProcessManager(ns);
    let modules = [
        new Worm(ns, processManager),
    ];
    while (true) {
        modules.forEach(module => {
            module.run();
        });
        await ns.sleep(MAIN['SLEEP_TIME']);
    }
}
