/**
 * @param {NS} ns 
 * @param {string} target 
 * @param {string} scriptTarget 
 */
export async function deployAndRun(ns, target, scriptTarget, scriptName) {
  let nodesAmount = Math.floor(ns.getServerMaxRam(target) / ns.getScriptRam(scriptName));

  ns.scp(scriptName, target, 'home');
  ns.exec(scriptName, target, nodesAmount, scriptTarget);
}