const core = require('@actions/core');
const github = require('@actions/github');
const shorten = require('./shorten')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const shaLength = Number(core.getInput('sha-length'))
    core.debug(`shaLength: ${shaLength}`);
    const sha = github.context.sha;
    const shortSha = shorten(sha, shaLength);
    core.debug(`Output: ${shortSha}`)
    core.setOutput('short-sha', shortSha)
    core.exportVariable(core.getInput('sha-short-variable-env'), shortSha)
    core.setOutput('sha', sha)

    const ref = github.context.ref
    const tagPath = 'refs/tags/'
    if (ref && ref.startsWith(tagPath)) {
      let tag = ref.substr(tagPath.length, ref.length)
      const regexStr = core.getInput('tag-regex')
      if (regexStr) {
        const regex = new RegExp(regexStr)
        const groupIdx = parseInt(core.getInput('tag-rege-group') || '1')
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
    core.setFailed(error.message);
  }
}

run();
