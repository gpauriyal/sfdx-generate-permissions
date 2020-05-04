#!/usr/bin/env node

const { execFile, exec, spawn } = require("child_process");
const yargs = require('yargs')
const path = require('path')
const utils = require('./lib/utils');
var sourceFolder = './force-app/main/default';

main();

async function main() {
    try {
        checkParams();
        console.log('Finding Profiles at ' + sourceFolder);
        let profiles = await utils.getFiles(
            path.join(
                sourceFolder,
                'profiles')
            , '.profile-meta.xml');
        utils.log('Profiles found');
        utils.log(profiles);
        console.log('Finding Objects at ' + path.join(sourceFolder,
            'objects'));
        await utils.createPackage(
            path.join(sourceFolder,
                'objects')
            , profiles);
        utils.log('Manifest file generated');
        await generatePermissions();
    } catch (e) {
        utils.error("Error " + e.message);
    }
}
function checkParams() {
    if (undefined == yargs.argv.p) {
        utils.warn('source folder not provided. using default path: ./force-app/main/default')
    } else {
        sourceFolder = yargs.argv.p.trim();
    }
    if (undefined == yargs.argv.u) {
        utils.warn('user name not provided. will use default SFDX username')
    }
    if (undefined == yargs.argv.d) {
        utils.warn('destination dir not provided. will use current')
    }
}

async function generatePermissions() {
    let command;
    let packagePath = path.join('.', 'manifest', 'package.xml');
    utils.warn("Will fetch FLS and CRUDS from manifest at: " + packagePath);
    if (typeof 'undefined' !== yargs.argv.u && yargs.argv.u) {
        command = 'sfdx force:source:retrieve  -x ' + packagePath + ' -u ' + yargs.argv.u;
    } else {
        command = 'sfdx force:source:retrieve -x ' + packagePath
    }
    // var child = exec(command);
    exec(command, (err, stdout, stderr) => {
        if (err) {
            utils.error(`======Errors: ${stderr}`);
            throw err;
        }
        utils.log(`=========Results:\n ${stdout}`);
    });
    // child.on('data', (data) => {
    //     console.log(`stdout: ${data}`);
    // });
    // child.on('error', function (err) {
    //     console.log('Failed to start child process.' + err);
    // });

    // child.stderr.on('data', (data) => {
    //     console.error(`stderr: ${data}`);
    // });

    // child.on('unhandledRejection', (err) => {
    //     throw err;
    // });
}