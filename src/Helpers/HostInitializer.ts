import { NS } from "Bitburner";
import { HackingScript } from "Enum/HackingScript";

export function initialize(ns: NS, ...hosts: string[]) {
  let files: string[] = [];

  for (let script of Object.values<string>(HackingScript)) {
    files.push(script)
  }

  hosts.forEach(host => {
    ns.killall(host);
    ns.scp(files, host, 'home');
  });
}