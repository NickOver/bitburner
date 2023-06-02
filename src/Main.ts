import { NS } from "Bitburner";
import { dump } from "Modules/Dumper";

export async function main(ns: NS) {
  dump(ns, ns);
}