//  try-find-env-file.js
//
//  Exports a function which can be used to search for an env file.

function tryFindEnvFile(path) {
  //  If the path has been set, return it. This really just allows us to
  //  override the search.
  if (path) return path;

  //  Starting with the current directory, look for the env file. If we don't
  //  find it, move up to the parent directory. Repeat until we've run out of
  //  places to look.
  const envFileName = '.on.yml';

  const folders = [];
  for (const i=0; i<folders.length; i++) {
    const path = Path.combine(folders[i], envFileName);
    if (exists(path)) return path;
  }

  return null;
}

module.exports = tryFindEnvFile;
