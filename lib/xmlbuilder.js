const builder = require("xmlbuilder");
var xml = package.initXML("Package", "types");

function createElement(xml, node, data) {
    return xml.ele(node, data)
}
function startNode(xml, node) {
    return xml.ele(node)
}
function endNode(xml) {
    return xml.up().up();
}

function initXML(root, ele) {
    return builder.create("Package", { encoding: "utf-8" }).ele(ele);
}
async function createFile(dirPath, profileName) {
    return new Promise(function (resolve, reject) {
        getCRUD2(dirPath, profileName).then(function (result) {
            xml = package.endNode(xml, "name", 'CustomField');
            xml = package.startNode("types");
            profileName.forEach(eachProfile => {
                xml = package.createElement(xml, "members", eachProfile);
            });
            xml = package.createElement(xml, "name", "Profile");
            xml = package.endNode(xml, "name", "Profile");
            return resolve(xml.end({ pretty: true }));
        });
    });
}

module.exports = {
    initXML: initXML,
    startNode: startNode,
    createElement: createElement,
    endNode: endNode,
    createFile: createFile,
};
