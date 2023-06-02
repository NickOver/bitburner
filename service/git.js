const userName = 'NickOver';
const repoName = 'bitburner';
const tempFile = 'temp/file.txt';
const skipNames = [
  '.vscode',
  'NetscriptDefinitions.d.ts',
  'jsconfig.json',
]

var dirsToScan = [''];
var filesList = [];

/** @param {NS} ns */
export async function main(ns) {
  dirsToScan = [''];
  filesList = [];
  
  const args = ns.flags([['clear', false]]);

  if (args.clear) {
    removeAllJsFiles(ns);
  }

  await scanDirectories(ns);
  await downloadFiles(ns);
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
async function scanDirectories(ns) {
  for (let i = 0; i < dirsToScan.length; i++) {
    if (await downloadFile(ns, dirsToScan[i], tempFile)) {
      processSourceTree(JSON.parse(ns.read(tempFile)));
      ns.rm(tempFile, 'home')
    }
  }
}

/** @param {NS} ns */
async function downloadFiles(ns) {
  for (let file of filesList) {
    await downloadFile(ns, file, file);
  }
}

/**
 * @param {NS} ns 
 * @param {string} path 
 * @param {string} file 
 * @returns bool
 */
async function downloadFile(ns, path, file) {
  return ns.wget(
    'https://api.github.com/repos/' + userName + '/' + repoName + '/contents/' + path,
    file,
    'home',
  )
}

/** @param {Array} sourceTree */
function processSourceTree(sourceTree) {
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