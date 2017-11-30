//  validate-args.js
//
//  Exports the main argument validation function.

function validateArgs(args) {
  //  First thing's first...
  if (!args) throw new Error(`'args' cannot be null`);

  //  Decompose into the arguments which *can* be provided.
  const {
    env,
    commands
  } = args;

  //  Check for the presence of required arguments.
  if (!env) throw new Error(`'env' is a required argument`);
  if (!commands) throw new Error(`'commands' is a required argument`);

  //  Return our validated parameters.
  return {
    env,
    commands
  };
}

module.exports = validateArgs;
