const fs = require('fs');
const path = require('path');

function getFiles(dirPath) {
    return fs.readdirSync(dirPath,
        function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
        });
}

function getName(dirPath) {
    return path.basename(dirPath, path.extname(dirPath));
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
