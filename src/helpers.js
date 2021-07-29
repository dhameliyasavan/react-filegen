const _ = require('lodash');
const chalk = require("chalk");
const boxen = require("boxen");

const inArrayExist = (arr, value) => {
    return _.filter(arr, (val) => {
        return val == value
    }).length != 0;
}

const successMsgToUser = (msg, options = {}) => {
    const bodyMsg = chalk.white.bold(msg);
    const boxenOptions = {
        margin: 0,
        padding: 1,
        borderColor: "green",
        backgroundColor: "#555555",
        ...options
    };
    console.log(boxen(bodyMsg, boxenOptions));
}

const warningMsgToUser = (msg, options = {}) => {
    const bodyMsg = chalk.yellow.bold(msg);
    const boxenOptions = {
        padding: 1,
        margin: 0,
        borderColor: "yellow",
        backgroundColor: "#555555",
        ...options
    };
    console.log(boxen(bodyMsg, boxenOptions));
}

const failMsgToUser = (msg, options = {}) => {
    const bodyMsg = chalk.red.bold(msg);
    const boxenOptions = {
        padding: 1,
        margin: 0,
        borderColor: "red",
        backgroundColor: "#555555",
        ...options
    };
    console.log(boxen(bodyMsg, boxenOptions));
}

module.exports = {
    inArrayExist,
    successMsgToUser,
    warningMsgToUser,
    failMsgToUser,
}