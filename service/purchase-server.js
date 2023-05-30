/** @param {NS} ns */
export async function main(ns) {
  purchaseServer(ns, ns.args[0], ns.args[1], ns.args[2])  
}

/** @param {NS} ns */
export async function purchaseServer(ns, name, ram, amount) {
  for (let i = 0; i < amount; i++) {
    let serverName = name + '-' + ram;
    ns.purchaseServer(serverName, ram);
  }
}