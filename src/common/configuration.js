const config = require('config');

const environment = process.env.NODE_ENV || 'development';


/**
 * @return The configuration secrets
 */
function getSecrets() {
  return config.util.loadFileConfigs('config/secrets');
}

/**
 * Module initialization
 */
function init() {
  const secrets = getSecrets();
  if (secrets) {
    Object.assign(config, config.util.extendDeep(config, secrets));
  }
}
init();

/**
 * Get something from configuration given a name, if the option does no exists it will return undefined
 * @param name The name used to get something from configuration
 */
function getSafe(name) {
  try {
    return process.env[name] || config.get(name);
  } catch (e) {
    return undefined;
  }
}

/**
 * Get something from configuration given a name
 * @param name The name used to get something from configuration
 * @param safe if false and the configuration environment does not exists it will throw an error
 */
function get(name, safe = false) {
  if (!safe) {
    return process.env[name] || config.get(name);
  }
  return getSafe(name);
}

/**
 * @return if the environment is 'development'
 */
function isDevelopment() {
  return environment === 'development';
}

/**
 * @return if the environment is 'production'
 */
function isProduction() {
  return environment === 'production';
}

module.exports = {

  get,
  isProduction,
  isDevelopment,
};
