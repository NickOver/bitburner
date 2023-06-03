import { NS } from "Bitburner";

export default interface HacknetModule {
  ns: NS
  run: () => void
}