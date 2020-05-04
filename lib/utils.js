//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const xml = require("./xmlbuilder")
const chalk = require('chalk');
const __file = require('./files');

var package;

async function addFields(dirPath) {
    xml.startNode("types");
    fs.readdirSync(dirPath).forEach((object) => {
        var objectPath = path.join(dirPath, object, 'fields');
        if (module.exports.directoryExists(objectPath)) {
            __file.getFiles(objectPath, '.field-meta.xml').forEach((field) => {
                xml.createElement("members", object + "." + field);
            });
        }
    });
    console.log('creating fields')
    xml.createElement("name", 'CustomField');
    xml.endNode();
}
async function addCustomObjects(dirPath) {
    xml.startNode("types");
    if (module.exports.directoryExists(dirPath)) {
        __file.getFiles(dirPath, '.field-meta.xml').forEach((object) => {
            xml.createElement("members", object);
        });
    }
    console.log('creating object')

    xml.createElement("name", 'CustomObject');
    xml.endNode();
}
async function createFile(dirPath, profiles) {
    package = xml.initXML("Package");
    await addFields(dirPath);
    await addCustomObjects(dirPath);
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
            fs.writeFile(path.join('.', 'manifest', 'package.xml')
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
