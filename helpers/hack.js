/**
 * @param {NS} ns 
 * @param {string} host 
 * @param {number} portsAmount 
 */
export function hack(ns, host, portsAmount) {
  if (!ns.hasRootAccess(host)) {
    if (portsAmount >= 1) try { ns.brutessh(host); } catch { }
    if (portsAmount >= 2) try { ns.ftpcrack(host); } catch { }
    if (portsAmount >= 3) try { ns.relaysmtp(host); } catch { }
    if (portsAmount >= 4) try { ns.httpworm(host); } catch { }
    if (portsAmount >= 5) try { ns.sqlinject(host); } catch { }

    try { ns.nuke(host); } catch { }
  }
}