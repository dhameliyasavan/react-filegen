const _ = require('lodash');
const templates = require('./templates.js');
const { COMPONENT, REDUCER } = require('./constants');
const { successMsgToUser, failMsgToUser, warningMsgToUser } = require('./helpers');
const { outputFileSync, pathExists } = require('fs-extra');


module.exports = async (config) => {
    let name = _.upperFirst(config.name);
    let mainPath = config.dir + "/" + name + "/";
    let files = {};
    // console.log(_.camelCase(config.name));

    switch (config.type) {
        case COMPONENT:
            files = templates.component;
            let componentFileName = mainPath + "index.js",
                componentTemplate = '', 
                componentStyleFileName = null;

            await pathExists(componentFileName).then(async (exists) => {
                if (!exists) {
                    if (!config.withStyle) {
                        componentTemplate = config.withClass ? files.classWithoutStyleTemplate : files.funWithoutStyleTemplate;
                    } else {
                        componentStyleFileName = mainPath + "style.module.css";
                        componentTemplate = config.withClass ? files.classWithStyleTemplate : files.funWithStyleTemplate;
                        await outputFileSync(componentStyleFileName, files.cssTemplate.replace(/<TemplateName>/g, name));
                    }
                    componentTemplate = componentTemplate.replace(/<TemplateName>/g, name);
                    await outputFileSync(componentFileName, componentTemplate);
                    // print message to user
                    successMsgToUser("Created Successfully");
                    console.log(componentFileName + ((!componentStyleFileName) ? "\n" : ""));
                    if(componentStyleFileName){
                        console.log(componentStyleFileName+"\n");
                    }
                }else{
                    warningMsgToUser("Sorry, "+name+" component already exists");
                }
            });
            break;

        case REDUCER:
            files = templates.reducer;
            let reducerName = _.upperCase(name).replace(/ /g,'_');
            let tempFiles = [
                {
                    path: mainPath + "action.js",
                    fileData: files.reduxActionTemplate.replace(/<ReducerName_To_UpperCase>/g, reducerName).replace(/<ReducerName_To_CamelCase>/g,_.camelCase(name))
                },
                {
                    path: mainPath + "reducer.js",
                    fileData: files.reduxReducerTemplate.replace(/<ReducerName_To_UpperCase>/g, reducerName).replace(/<ReducerName>/g,_.camelCase(name))
                },
                {
                    path: mainPath + "effects.js",
                    fileData: files.reduxEffectTemplate.replace(/<ReducerName_To_CamelCase>/g, _.camelCase(name)).replace(/<ReducerName_To_PascalCase>/g,_.upperFirst(_.camelCase(name)))
                }
            ];
            
            await pathExists(tempFiles[0].path).then(async (exists) => {
                if (!exists) {
                    successMsgToUser("Created Successfully");
                    tempFiles.forEach(async (obj) => {
                        await outputFileSync(obj.path, obj.fileData);
                        console.log(obj.path);
                    })
                }else{
                    warningMsgToUser("Sorry, "+name+" reducer already exists");
                }
            });
            break;

        default:
            failMsgToUser("Something went wrong, Please delete config file.");
            break;
    }
}