const core = require('@actions/core');
const github = require('@actions/github');
const sha_kit = require('./src/sha-kit');
const cc_kit = require('./src/cc-kit')


// most @actions toolkit packages have async methods
async function run() {
  try {
    sha_kit();
    await cc_kit.cc_kit()

    const ref = github.context.ref
    const tagPath = 'refs/tags/'
    if (ref && ref.startsWith(tagPath)) {
      let tag = ref.substr(tagPath.length, ref.length)
      const regexStr = core.getInput('tag-regex')
      if (regexStr) {
        const regex = new RegExp(regexStr)
        const groupIdx = parseInt(core.getInput('tag-regex-group') || '1')
        const result = regex.exec(tag)
        if (result && result.length > groupIdx) {
          tag = result[groupIdx]
        } else {
          core.warning(
            `Failed to match regex '${regexStr}' in tag string '${tag}'. Result is '${result}'`
          )
          return
        }

        // Return named groups on output
        if (result.groups) {
          for (const [key, value] of Object.entries(result.groups)) {
            core.setOutput(key, value)
          }
        }
      }
      core.exportVariable('GIT_TAG_NAME', tag)
      core.setOutput('tag-version', tag)
    }
  } catch (error) {
    console.error(error.stack);
    core.setFailed(error.message);
  }
}

run();
