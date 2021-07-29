const _ = require('lodash');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const build = require('./process')
const { COMPONENT, REDUCER } = require('./constants');
const { dumpConfigIfNotExists, getConfig } = require('./config');
const { failMsgToUser } = require('./helpers');

module.exports = async function cli(args) {
    await dumpConfigIfNotExists();

    if(hideBin(args).length === 0){
        failMsgToUser("Argument must be required.");
        return;
    }

    await dumpConfigIfNotExists();
    let config = null;

    // For Components
    switch (hideBin(args)[0]) {

        case COMPONENT:
            // Set components config if not exists
            await dumpConfigIfNotExists(COMPONENT);

            config = await getConfig();
            //Ask
            var options = yargs(hideBin(args))
                .command(`${COMPONENT} <name>`, 'Make component')
                .option("--class", {
                    alias: "class",
                    describe: "--class for Class Component",
                    type: "boolean",
                    demandOption: false
                }).option("--style", {
                    alias: "style",
                    describe: "--style for style.css",
                    type: "boolean",
                    demandOption: false
                }).option("--path", {
                    alias: "path",
                    describe: "--path : location",
                    type: "string",
                    demandOption: false
                }).argv;

            await build({
                type: COMPONENT,
                name: options.name,
                withClass: options.class === undefined ? config.component.withClass : ((typeof options.class == "boolean") ? options.class : config.component.withClass),
                withStyle: options.style === undefined ? config.component.withStyle : ((typeof options.style == "boolean") ? options.style : config.component.withStyle),
                dir: (options.path === undefined || options.path == "") ? config.component.path : options.path
            });
            
            break;

        case REDUCER:
            // Set components config if not exists
            await dumpConfigIfNotExists(REDUCER);

            config = await getConfig();
            //Ask
            var options = yargs(hideBin(args))
                .command(`${REDUCER} <name>`, 'Make reducer')
                .option("--path", {
                    alias: "path",
                    describe: "--path : location",
                    type: "string",
                    demandOption: false
                }).argv;

            await build({
                type: REDUCER,
                name: options.name,
                dir: (options.path === undefined || options.path == "") ? config.reducer.path : options.path
            });

            break;

        default:
            failMsgToUser("Invalid Arguments.");
            break;
    }
}