const core = require("@actions/core");
const github = require("@actions/github");
const shorten = require("./shorten");

const sha_kit = function () {
  const shaLength = Number(core.getInput('sha-length'))
  core.debug(`shaLength: ${shaLength}`);
  const sha = github.context.sha;
  const shortSha = shorten(sha, shaLength);
  core.debug(`Output: ${shortSha}`)
  core.setOutput('short-sha', shortSha)
  core.exportVariable(core.getInput('sha-short-variable-env'), shortSha)
  core.setOutput('sha', sha)
}

module.exports = sha_kit