const {execSync} = require('child_process');

// run tests with all supported versions of eslint
let exitCode = 0;

[
  './tests-eslint/eslint-v7-legacy',
  './tests-eslint/eslint-v8-legacy',
  './tests-eslint/eslint-v8-flat',
  './tests-eslint/eslint-v9'
].forEach((workingDir) => {
  try {
    execSync('npm run test', { cwd: workingDir, stdio: 'inherit'});
  } catch (err) {
    exitCode = 1;
  }
});

return exitCode;
