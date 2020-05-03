#!/usr/bin/env node

const exec = require("child_process").execSync;
const execAsync = require("child_process").exec;
const utils = require('./lib/utils');


async function main() {
    try {
        let profile = await utils.getFiles(process.argv[2] + '/profiles');
        console.log(profile);
        await utils.createPackage(process.argv[2] + '/objects/'
            , profile);
        utils.log(('finished generating printing xml'));
    } catch (e) {
        utils.error("Error " + e.message);
    }
}
main();