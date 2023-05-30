/**
 * @param {NS} ns 
 */
export function getAmountOfPortsToOpen(ns) {
  let programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"],
    ports = 0;

  for (let key in programs) {
    if (ns.fileExists(programs[key], "home")) {
      ports++;
    }
  }

  return ports;
}