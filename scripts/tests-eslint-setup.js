const {execSync} = require('child_process');

// install dependencies for all versions in tests-eslint
let exitCode = 0;

[
  './tests-eslint/eslint-v7-legacy',
  './tests-eslint/eslint-v8-legacy',
  './tests-eslint/eslint-v8-flat',
  './tests-eslint/eslint-v9'
].forEach((workingDir) => {
  try {
    console.log(`\nInstalling dependencies of tests in '${workingDir}'`);
    execSync('yarn install --frozen-lockfile', { cwd: workingDir, stdio: 'inherit'});
  } catch (err) {
    exitCode = 1;
  }
});

return exitCode;
