const program = require('commander');
const exec = require("child_process").execSync;
const execAsync = require("child_process").exec;
const dirTree = require("directory-tree");
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const utils = require('./lib/utils');

//clear();
// console.log(
//     chalk.yellow(
//         figlet.textSync('CRUD Generator', { horizontalLayout: 'half' })
//     )
// );
// const tree = dirTree(process.argv[2], { extensions: /\.xml/ })

const tree = dirTree(process.argv[2]);
// utils.getFiles(tree, 'profiles');
// console.log(JSON.stringify(tree));
// console.log(JSON.stringify(process.argv[2]));
// utils.getFiles(tree, 'profiles').then(function (result, err) {
//     console.log(result);
// }).catch(function (err) {
//     console.log('Error' + err);

// });


console.log(JSON.stringify(tree));
var profiles = [];

function getMetadata() {

}