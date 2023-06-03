export function findAll(ns) {
    let servers = ['home'];
    for (let i = 0; i < servers.length; i++) {
        ns.scan(servers[i]).forEach(server => {
            if (!servers.includes(server)) {
                servers.push(server);
            }
        });
    }
    return servers;
}
export function findAllPossibleTargets(ns) {
    let targets = [];
    let playerServers = ns.getPurchasedServers();
    findAll(ns).forEach(host => {
        if (!playerServers.includes(host) && host !== 'home') {
            targets.push(host);
        }
    });
    return targets;
}
export function findAllRootedHosts(ns, withHome = false) {
    let hosts = [];
    findAll(ns).forEach(host => {
        if (ns.hasRootAccess(host) && (withHome || host !== 'home')) {
            hosts.push(host);
        }
    });
    return hosts;
}
