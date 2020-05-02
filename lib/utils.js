//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const builder = require("xmlbuilder");

async function getFiles(dirPath, dirName) {
    return fs.readdirSync(path.join(dirPath, dirName),
        function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
        });
}
function updateIntegrationConfigs(dirfile, file, namedCredentials) {
    let content = fs.readFileSync(dirfile).toString();
    let metadataName = file.replace(".namedCredential-meta.xml", "");
    if (namedCredentials[metadataName]) {
        let config = namedCredentials[metadataName];
        for (var key in config) {
            if (config.hasOwnProperty(key)) {
                content = updateFileContent(content, key, config[key]);
            }
        }
        console.log(`Configuration found for Named Credentials: ` + metadataName);
        fs.writeFileSync(dirfile, content);
    }
}
function createFile(dirPath, profileName) {
    return new Promise(function (resolve, reject) {
        var result = getCRUD2(dirPath, profileName).then(function (result) {
            result
                .ele("name", "CustomField")
                .up()
                .up()
                .ele("types")
                .ele("members", profileName)
                .up()
                .ele("name", "Profile")
                .up()
                .up();
            console.log("Step 2");
            return resolve(result.end({ pretty: true }));
        });
    });
}

function getCRUD2(dirPath, profileName) {
    var dirs = [];
    var xml = builder.create("Package", { encoding: "utf-8" }).ele("types");
    // var dirpath = "./force-app/main/default/objects";
    var objectPath;
    return new Promise(function (resolve, reject) {
        fs.readdirSync(dirPath).forEach((element) => {
            objectPath = dirPath + "/" + element + "/fields";
            if (fs.existsSync(objectPath)) {
                fs.readdirSync(objectPath).forEach((file) => {
                    var filename = path.basename(
                        objectPath + "/" + file,
                        ".field-meta.xml"
                    );
                    xml.ele("members", element + "." + filename);
                });
            }
        });
        return resolve(xml);
    });
}
async function readFile(dirPath, profiles) {
    profiles.forEach(eachProfile => {
        createFile(dirPath, eachProfile)
            .then(function (result) {
                fs.writeFile("./manifest/package.xml"
                    , result
                    , function (err) {
                        if (err) {
                            console.error(err.toString());
                            throw err;
                        }
                    });
            });

    });
}
module.exports = {
    getFiles: getFiles,
    readFile: readFile,
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    }
};
