const process = require('process');
const cp = require('child_process');
const path = require('path');


// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  if (process.env.GITHUB_ACTIONS) {
    console.log(`GITHUB_ACTIONS is ${process.env.GITHUB_ACTIONS} and pass test`);
    return;
  }
  process.env['INPUT_SHA-LENGTH'] = '8';
  process.env['INPUT_TAG-REGEX-GROUP'] = '1';
  process.env['INPUT_TAG-REGEX'] = '';
  process.env['INPUT_SHA-SHORT-VARIABLE-ENV'] = 'SHA-SHORT';
  process.env['INPUT_TAG-VERSION-ENV'] = 'GIT_TAG_VERSION';

  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})
