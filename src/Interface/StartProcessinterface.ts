import { HackingScript } from "Enum/HackingScript";

export default interface StartProcess {
  filename: HackingScript;
  threads: number;
  arguments: string[];
}