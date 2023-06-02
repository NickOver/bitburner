import { NS } from "Bitburner";

const userName = 'NickOver';
const repoName = 'bitburner';
const tempFile = 'temp/file.txt';
const baseDir = 'build';
const skipNames = [
  '.vscode',
  'NetscriptDefinitions.d.ts',
  'jsconfig.json',
]

var dirsToScan: string[] = [];
var filesList: string[] = [];

export async function main(ns: NS) {
  this.dirsToScan = [baseDir];
  this.filesList = [];
  
  const args = ns.flags([['clear', false]]);

  if (args.clear) {
    removeAllJsFiles(ns);
  }

  await scanDirectories(ns);
  await downloadFiles(ns);
}

function removeAllJsFiles(ns: NS) {
  let currentScriptName = ns.getScriptName();

  for (let file of ns.ls('home', '.js')) {
    if (file !== currentScriptName) {
      ns.rm(file, 'home');
    }
  }
}

async function scanDirectories(ns: NS) {
  for (let i = 0; i < dirsToScan.length; i++) {
    if (await downloadFile(ns, dirsToScan[i], tempFile)) {
      processSourceTree(JSON.parse(ns.read(tempFile)));
      ns.rm(tempFile, 'home')
    }
  }
}

async function downloadFiles(ns: NS) {
  for (let file of filesList) {
    if (await downloadFile(ns, file, 'temp/' + file)) {
      let content = JSON.parse(ns.read('temp/' + file))['content'];
      let localFileName = file.replace(baseDir + '/', '');
      
      ns.write(localFileName, [atob(content)], "w");
      ns.rm('temp/' + file, 'home');
    }
  }

  ns.toast("All files downloaded successfully!", "success");
}

async function downloadFile(ns: NS, path: string, file: string): Promise<boolean> {
  return ns.wget(
    'https://api.github.com/repos/' + userName + '/' + repoName + '/contents/' + path,
    file,
    'home',
  )
}

function processSourceTree(sourceTree: Array<any>) {
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