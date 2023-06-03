import { HackingScript } from "Enum/HackingScript";
export function initialize(ns, ...hosts) {
    let files = [];
    for (let script of Object.values(HackingScript)) {
        files.push(script);
    }
    hosts.forEach(host => {
        ns.killall(host);
        ns.scp(files, host, 'home');
    });
}
