//  on.js
//
//  Main function of the program, takes the arguments and runs the on command.
const assert = require('assert');
const validateArgs = require('./args/validate-args');
const tryFindEnvFile = require('./env-file/try-find-env-file');
const loadEnvFile = require('./env-file/load-env-file');

function on(args) {
  //  Validate the arguments contain the required values, coerce into a set of
  //  parameters. This will set the defaults etc.
  const { env, commands } = validateArgs(args);

  //  Find the env file. If we cannot find it, boot one.
  const envFile = tryFindEnvFile();
  if (!envFile) {
    throw new Error('Unable to find an \'.on.yml\' file. Make sure one is present in your working directory, or a parent directory.');
  }

  //  Now that we've got the path of the env file, try and load it. This
  //  function will throw if the file is not structured correctly.
  return loadEnvFile(envFile, env)
    .then((envSettings) => {
      //  Apply the environment settings.
      return applyEnvSettings(envSettings);
    })
    .then(() => {
      //  We're done. We now execute the commands which follow 'on <env>'.
      executeCommands(commands);
    });
}

module.exports = on;
