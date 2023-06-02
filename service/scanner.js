/**
 * 
 * @param {NS} ns 
 * @returns object
 */
export function findAllRoutes(ns) {
  let servers = ["home"],
    routes = { home: ["home"] };
    
  for (let i = 0, j; i < servers.length; i++) {
    for (j of ns.scan(servers[i])) {
      if (!servers.includes(j)) {
        servers.push(j), routes[j] = routes[servers[i]].slice(), routes[j].push(j);
      } 
    }
  }

  return routes;
}

/**
 * 
 * @param {NS} ns 
 * @returns object
 */
export function findAllPossibleTargets(ns) {
  let servers = ['home'];
  let targets = [];
  let purchasedServers = ['home'];

  for (let i = 0; i < servers.length; i++) {
    for (let server of ns.scan(servers[i])) {
      if (!servers.includes(server)) {
        servers.push(server);
      }
    }
  }

  for (let server of servers) {
    if (
      !purchasedServers.includes(server) &&
      ns.hasRootAccess(server) &&
      ns.getServerMoneyAvailable(server) > 0 &&
      ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()
    ) {
      targets.push(server);
    }
  }

  return targets;
}