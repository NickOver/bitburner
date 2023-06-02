import { NS } from "Bitburner";

export async function main(ns: NS) {
  const target: string = ns.args[0] as string;

  await ns.grow(target);
}