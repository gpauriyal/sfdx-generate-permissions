module.exports = {
    parseFolder: (childrens, name) => {
        childrens.forEach(parsedNode => {
            if (parsedNode.type == 'directory' && parsedNode.name == name) {
                return parsedNode;
            } else if (parsedNode.type == 'directory' && undefined !== parsedNode.children) {
                console.log('Parsing' + parsedNode.name);
                module.exports.parseFolder(parsedNode.children, name);
            }
        });
        return [];
    },
    getFiles: (eachNode, name) => {
        var filesInDir = [];
        // console.log(eachNode)
        return new Promise(function (resolve, reject) {
            if (eachNode.type == 'directory') {
                filesInDir = module.exports.parseFolder(eachNode.children, name);
                console.log(filesInDir);
                if (filesInDir.length > 0) {
                    resolve(filesInDir);
                }
                else {
                    reject(Error("File Not found"));
                }

            }
        });
    }
};