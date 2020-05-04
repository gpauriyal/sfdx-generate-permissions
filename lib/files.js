const fs = require('fs');
const path = require('path');

function getFiles(dirPath, ext) {
    // console.log('Reading ' + dirPath);
    let allFiles = [];

    fs.readdirSync(dirPath,
        function (err, files) {
            let allFiles = [];
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
        }).forEach(function (file) {
            allFiles.push(getName(path.join(dirPath, file), ext));
        });
    return allFiles;
}

function getName(dirPath, ext) {
    return path.basename(dirPath, ext);
}

module.exports = {
    getFiles: getFiles,
    getName: getName,
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    }
};
