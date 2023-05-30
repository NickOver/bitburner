import { getAmountOfPortsToOpen } from "helpers/get-amount-of-ports-to-open";

/**
 * @param {NS} ns 
 * @param {string} host
 */
export function canHackHost(ns, host) {
  return (
    ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel() &&
    ns.getServerNumPortsRequired(host) <= getAmountOfPortsToOpen(ns)
  );
}