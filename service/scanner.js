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