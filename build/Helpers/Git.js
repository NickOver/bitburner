const userName = 'NickOver';
const repoName = 'bitburner';
const tempFile = 'temp/file.txt';
const baseDir = 'build';
const skipNames = [
    '.vscode',
    'NetscriptDefinitions.d.ts',
    'jsconfig.json',
];
var dirsToScan = [];
var filesList = [];
export async function main(ns) {
    const args = ns.flags([['clear', false]]);
    dirsToScan.push(baseDir);
    if (args.clear) {
        removeAllJsFiles(ns);
    }
    await scanDirectories(ns);
    await downloadFiles(ns);
}
function removeAllJsFiles(ns) {
    let currentScriptName = ns.getScriptName();
    for (let file of ns.ls('home', '.js')) {
        if (file !== currentScriptName) {
            ns.rm(file, 'home');
        }
    }
}
async function scanDirectories(ns) {
    for (let i = 0; i < dirsToScan.length; i++) {
        if (await downloadFile(ns, dirsToScan[i], tempFile)) {
            processSourceTree(JSON.parse(ns.read(tempFile)));
            ns.rm(tempFile, 'home');
        }
    }
}
async function downloadFiles(ns) {
    for (let file of filesList) {
        if (await downloadFile(ns, file, 'temp/' + file)) {
            let content = JSON.parse(ns.read('temp/' + file))['content'];
            let localFileName = file.replace(baseDir + '/', '');
            ns.write(localFileName, atob(content), "w");
            ns.rm('temp/' + file, 'home');
        }
    }
    ns.toast("All files downloaded successfully!", "success");
}
async function downloadFile(ns, path, file) {
    return ns.wget('https://api.github.com/repos/' + userName + '/' + repoName + '/contents/' + path, file, 'home');
}
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
