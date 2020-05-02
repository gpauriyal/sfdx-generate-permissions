#!/usr/bin/env node

const exec = require("child_process").execSync;
const execAsync = require("child_process").exec;
const chalk = require('chalk');
const clear = require('clear');
// const figlet = require('figlet');
const files = require('./lib/files');
const utils = require('./lib/utils');

async function main() {
    try {
        let profile = await utils.getFiles(process.argv[2] + '/profiles');
        console.log(profile);
        await utils.createPackage(process.argv[2] + '/objects/'
            , profile);
        console.log(chalk.green('finished generating printing xml'));
    } catch (e) {
        console.log("Error", e);
    }
}
main();