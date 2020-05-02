//requiring path and fs modules
const path = require('path');
const fs = require('fs');
// const package = require("./xmlbuilder")
const builder = require("xmlbuilder");
var xml;
function createElement(node, data) {
    xml = xml.ele(node, data).up();
}
function startNode(node) {
    xml = xml.ele(node);
}
function endNode() {
    xml = xml.up();
}
function initXML(root, ele) {
    xml = builder.create(root, { encoding: "utf-8" }).ele(ele);
}
function getFiles(dirPath) {
    return fs.readdirSync(dirPath,
        function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
        });
}
async function readFields(dirPath) {
    let fields = [];
    fs.readdirSync(dirPath).forEach((object) => {
        console.log('****Step 2**********' + 'Adding fields for: ' + object);
        var objectPath = path.join(dirPath, object, 'fields');
        if (module.exports.directoryExists(objectPath)) {
            getFiles(objectPath).forEach((field) => {
                createElement("members", object + "." + path.basename(path.join(objectPath, field), '.field-meta.xml'));
            });
        }
    });
}
async function createFile(dirPath, profiles) {
    console.log('Step1')
    initXML("Package", "types");
    await readFields(dirPath);
    console.log('Now adding Custom Fields to Package');
    createElement("name", 'CustomField');
    endNode();
    startNode("types");
    profiles.forEach(eachProfile => {
        createElement("members", eachProfile);
    });
    createElement("name", "Profile");
    endNode();
    console.log('Package Created');
    return xml.end({ pretty: true });
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
module.exports = {
    createPackage: createPackage,
    getFiles: getFiles,
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    }
};
