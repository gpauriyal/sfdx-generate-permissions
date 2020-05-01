const exec = require("child_process").execSync;
const execAsync = require("child_process").exec;
const builder = require("xmlbuilder");

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
function createFile(profileName) {
    return new Promise(function (resolve, reject) {
        var result = getCRUD2(profileName).then(function (result) {
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

function getCRUD2(profileName) {
    var dirs = [];
    var xml = builder.create("Package", { encoding: "utf-8" }).ele("types");
    var dirpath = "./force-app/main/default/objects";
    var objectPath;
    return new Promise(function (resolve, reject) {
        fs.readdirSync(dirpath).forEach((element) => {
            objectPath = dirpath + "/" + element + "/fields";
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
function readFile() {
    var output = createFile("Admin").then(function (result) {
        fs.writeFile("./manifest/package.xml", result, function (err) {
            if (err) {
                console.log(err.toString());
                throw err;
            }
            console.log("Saved!");
            console.log("finished generating printing xml");
            console.log("printed after wait");
        });
    });
}