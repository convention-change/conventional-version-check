const core = require('@actions/core');
const sha_kit = require('./src/sha-kit');
const cc_kit = require('./src/cc-kit')
const tag_kit = require('./src/tag-kit')


// most @actions toolkit packages have async methods
async function run() {
  try {
    sha_kit();
    await cc_kit.cc_kit()
    tag_kit();

  } catch (error) {
    console.error(error.stack);
    core.setFailed(error.message);
  }
}

run();
