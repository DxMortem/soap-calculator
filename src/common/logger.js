const path = require('path');
const { createLogger, format, transports } = require('winston');
const configuration = require('./configuration');

/**
 * Returns the logging file name
 */
function getLoggingFileName() {
  const useHostNameHasFileName = configuration.get('logging.hostnameAsFileName', true)
    ? configuration.get('logging.hostnameAsFileName') : false;

  let loggingFileName;
  if (useHostNameHasFileName) {
    loggingFileName = `${configuration.get('HOSTNAME')}.log`;
  } else {
    loggingFileName = configuration.get('logging.filename', true)
      ? configuration.get('logging.filename') : 'app.log';
  }
  return loggingFileName;
}

/**
 * Get the configured logging directory
 */
function getLoggingDirectory() {
  return configuration.get('logging.level', true)
    ? configuration.get('logging.directory') : 'logs/';
}

/**
 * Get the configured logging level
 */
function getLoggingLevel() {
  return configuration.get('logging.level', true)
    ? configuration.get('logging.level') : 'info';
}

/**
 * Returns the transports
 */
function getTransports() {
  const transportsResult = [];

  const consoleTransport = configuration.get('logging.transport.console', true)
    ? configuration.get('logging.transport.console') : true;
  const fileTransport = configuration.get('logging.transport.file', true)
    ? configuration.get('logging.transport.file') : true;

  if (consoleTransport) {
    transportsResult.push(new transports.Console());
  }
  if (fileTransport) {
    transportsResult.push(new transports.File({
      filename: getLoggingDirectory() + getLoggingFileName(),
      level: getLoggingLevel(),
    }));
  }
  return transportsResult;
}

/**
 * Return the last folder name in the path and the calling module's filename.
 * @param callingModule
 */
function getLabel(callingModule) {
  const parts = callingModule.filename.split(path.sep);
  return path.join(parts[parts.length - 2], parts.pop());
}

module.exports = function (callingModule) {
  return createLogger({

    level: getLoggingLevel(),
    format: format.combine(
      format.errors({
        stack: true,
      }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss,SSS',
      }),
      format.printf(
        (info) => `${info.timestamp} ${info.level} --- [] ${getLabel(callingModule)}: ${info.message} ${info.stack ? ` -> ${info.stack}` : ''}`,
      ),
    ),
    transports: getTransports(),
  });
};
