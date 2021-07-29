const IS_LIVE = (__dirname.indexOf('node_modules') > 0) ? true : false;
const CONFIG_FILENAME = "reactclitest.json";
const CONFIG_FILEPATH = __dirname + (IS_LIVE ? "/../../../" : "/../") + CONFIG_FILENAME;

module.exports = {
    CONFIG_FILENAME: CONFIG_FILENAME,
    CONFIG_FILEPATH: CONFIG_FILEPATH,
    CONFIG_DEFAULT_TAB: 4,

    COMPONENT: 'component',
    REDUX: 'redux',
    REDUCER: 'reducer',
}