const builder = require("xmlbuilder");
var xml;
function createElement(node, data) {
    return xml.ele(node, data).up();
}
function startNode(node) {
    xml = xml.ele(node);
    return xml;
}
function endNode() {
    xml = xml.up();
    return xml;
}
function initXML(root, ele) {
    xml = builder.create(root, { encoding: "utf-8" });
    return xml;
}
module.exports = {
    initXML: initXML,
    startNode: startNode,
    createElement: createElement,
    endNode: endNode
};
