import { dump } from "Modules/Dumper";
export async function main(ns) {
    dump(ns, 'dupa');
    dump(ns, ns);
}
