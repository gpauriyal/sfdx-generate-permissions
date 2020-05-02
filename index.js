const exec = require("child_process").execSync;
const execAsync = require("child_process").exec;
const chalk = require('chalk');
const clear = require('clear');
// const figlet = require('figlet');
const files = require('./lib/files');
const utils = require('./lib/utils');

//clear();
// console.log(
//     chalk.yellow(
//         figlet.textSync('CRUD Generator', { horizontalLayout: 'half' })
//     )
// );
// const tree = dirTree(process.argv[2], { extensions: /\.xml/ })

// console.log(JSON.stringify(tree));
// console.log(JSON.stringify(process.argv[2]));
async function main() {
    try {
        let profile = await utils.getFiles(process.argv[2], 'profiles');
        console.log(profile);
        await utils.readFile(process.argv[2] + '/objects'
            , profile);
        console.log(chalk.green('finished generating printing xml'));
    } catch (e) {
        console.log("Error", e);
    }
}
main();