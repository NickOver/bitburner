import { NS } from "Bitburner";

export function findAll(ns: NS): string[] {
  ns.disableLog('scan');

  let servers: string[] = ['home'];

  for (let i = 0; i < servers.length; i++) {
    ns.scan(servers[i]).forEach(server => {
      if (!servers.includes(server)) {
        servers.push(server);
      }
    });
  }

  ns.enableLog('scan');
  return servers;
}

export function findAllPossibleTargets(ns: NS): string[] {
  let targets: string[] = [];
  let playerServers: string[] = ns.getPurchasedServers();

  findAll(ns).forEach(host => {
    if (!playerServers.includes(host) && host !== 'home') {
      targets.push(host);
    }
  });

  return targets;
}

export function findAllRootedHosts(ns: NS, withHome: boolean = false): string[] {
  let hosts: string[] = [];

  findAll(ns).forEach(host => {
    if (ns.hasRootAccess(host) && (withHome || host !== 'home')) {
      hosts.push(host);
    }
  });

  return hosts;
}