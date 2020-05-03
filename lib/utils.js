//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const xml = require("./xmlbuilder")
const chalk = require('chalk');
const __file = require('./files');

var package;

async function readFields(dirPath) {
    fs.readdirSync(dirPath).forEach((object) => {
        var objectPath = path.join(dirPath, object, 'fields');
        if (module.exports.directoryExists(objectPath)) {
            __file.getFiles(objectPath).forEach((field) => {
                xml.createElement("members", object + "." + __file.getName(path.join(objectPath, field)));
            });
        }
    });
}
async function createFile(dirPath, profiles) {
    package = xml.initXML("Package");
    xml.startNode("types");
    await readFields(dirPath);
    xml.createElement("name", 'CustomField');
    xml.endNode();
    xml.startNode("types");
    profiles.forEach(eachProfile => {
        xml.createElement("members", eachProfile);
    });
    xml.createElement("name", "Profile");
    xml.endNode();
    console.log('Package Created');
    return package.end({ pretty: true });
}
async function createPackage(dirPath, profiles) {
    createFile(dirPath, profiles)
        .then(function (result) {
            fs.writeFile(path.join(__dirname, 'package.xml')
                , result
                , function (err) {
                    if (err) {
                        console.error(err.toString());
                        process.exit(1);
                    }
                });
        });
}
function log(message) {
    console.log(chalk.green(message))
}
function error(message) {
    console.log(chalk.red(message))
}
function warn(message) {
    console.log(chalk.yellow(message))
}
module.exports = {
    getFiles: __file.getFiles,
    log: log,
    warn: warn,
    error: error,
    createPackage: createPackage,
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    }
};
