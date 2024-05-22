const myLoggers = require('log4js');
const configure = require('../config/loggerconfigure.json')

myLoggers.configure(configure);

const logger = myLoggers.getLogger("default");

console.log = function(msg) {
    logger.debug(msg);
}

console.error = function(msg) {
    logger.error(msg);
}

console.warn = function(msg) {
    logger.warn(msg);
}