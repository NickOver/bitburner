import { dump } from "helpers/dump";

const userName = 'NickOver';
const repoName = 'bitburner';
const tempFile = 'temp/file.txt';
const skipNames = [
  '.vscode',
  'NetscriptDefinitions.d.ts',
]

var dirsToScan = [''];
var filesList = [];

/** @param {NS} ns */
export async function main(ns) {
  const args = ns.flags([['clear', false]]);

  for (let i = 0; i < dirsToScan.length; i++) {
    await scanDirectory(ns, dirsToScan[i]);
  }

  dump(ns, dirsToScan)
  dump(ns, filesList)



  // await getFile(ns);
  // scanDirectory(ns, '')

  // if (args.clear) {
  //   removeAllJsFiles(ns);
  // }
}

/** @param {NS} ns */
function removeAllJsFiles(ns) {
  let currentScriptName = ns.getScriptName();

  for (let file of ns.ls('home', '.js')) {
    if (file !== currentScriptName) {
      ns.rm(file, 'home');
    }
  }
}

/** @param {NS} ns */
function getFileListToDownload(ns) {
}

/** @param {NS} ns */
async function scanDirectory(ns, path) {
  ns.rm(tempFile, 'home')

  if (await ns.wget(
    'https://api.github.com/repos/NickOver/bitburner/contents/' + path,
    tempFile,
    'home',
  )) {
    let sourceTree = JSON.parse(ns.read(tempFile));
    
    for (let node of sourceTree) {
      if (skipNames.includes(node['name'])) {
        continue;
      }

      switch (node['type']) {
        case 'dir':
          dirsToScan.push(node['path']);
          break;
        case 'file':
          filesList.push(node['path']);
          break;
      }
    }
  }
}