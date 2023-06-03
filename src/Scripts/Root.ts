import { NS } from "Bitburner";

export async function main(ns: NS) {
  const target: string = ns.args[0] as string;

  try { ns.brutessh(target); } catch { }
  try { ns.ftpcrack(target); } catch { }
  try { ns.relaysmtp(target); } catch { }
  try { ns.httpworm(target); } catch { }
  try { ns.sqlinject(target); } catch { }

  try { ns.nuke(target); } catch { }
}