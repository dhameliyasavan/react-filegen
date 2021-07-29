const { prompt } = require('inquirer');
const _ = require('lodash');
const { outputFileSync, pathExists, readJson } = require('fs-extra');

// custom
const questions = require('./questions');
const {
    CONFIG_FILENAME,
    CONFIG_FILEPATH,
    COMPONENT,
    CONFIG_DEFAULT_TAB,
    REDUCER
} = require('./constants');

const getConfig = async () => {
    return await readJson(CONFIG_FILEPATH);
}

const dumpConfigIfNotExists = async (type = null) => {

    await pathExists(CONFIG_FILEPATH).then(async (exists) => {
        if (!exists) {
            // Save Content in X file
            await outputFileSync(CONFIG_FILEPATH, JSON.stringify({}, null, CONFIG_DEFAULT_TAB));
        }
    });

    let answers = null;
    let oldConfig = await getConfig();

    switch (type) {
        //if user want to create component and component config not exists in config file
        case COMPONENT:
            if (oldConfig.component === undefined) {
                answers = await prompt(questions.componentLevelQuestions); // Asking React component level questions
            }
            break;

        //if user want to create component and component config not exists in config file
        case REDUCER:
            if (oldConfig.reducer === undefined) {
                answers = await prompt(questions.reducerLevelQuestions); // Asking React Reducer level questions
            }
            break;
    }

    // Save Content in X file
    if(answers){
        await outputFileSync(CONFIG_FILEPATH, JSON.stringify({
            ...oldConfig,
            ...answers
        }, null, CONFIG_DEFAULT_TAB));
    }
}

module.exports = {
    dumpConfigIfNotExists,
    getConfig
}