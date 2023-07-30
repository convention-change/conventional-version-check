const utils = require("util");
const fs = require("fs");
const core = require("@actions/core");

const {parseEntry} = require("./conventional/parse-entry");
const {getEntries} = require("./conventional/get-entries");
const {getVersionById} = require("./conventional/get-version-by-id");

const readFile = utils.promisify(fs.readFile);
const exists = utils.promisify(fs.exists);

exports.cc_kit = async function cc_kit() {
  const changelogPath = core.getInput("cc-log-path") || "./CHANGELOG.md";
  const targetVersion = core.getInput("cc-version-wanted") || null;

  if (targetVersion == null) {
    core.warning(
      `No target version specified. Will try to return the most recent one in the changelog file.`
    );
  }

  core.startGroup("Parse data");
  if (await exists(changelogPath) === false) {
    core.warning(`No changelog file found at: ${changelogPath}`);
    return
  }

  const rawData = await readFile(changelogPath);
  const versions = getEntries(rawData).map(parseEntry);
  core.debug(`${versions.length} version logs found`);
  core.endGroup();

  const version = getVersionById(versions, targetVersion);

  if (version == null) {
    throw new Error(
      `No log entry found${
        targetVersion != null ? ` for version ${targetVersion}` : ""
      }`
    );
  }

  core.setOutput("cc-latest-version", version.id);
  core.setOutput("cc-latest-date", version.date);
  core.setOutput("cc-latest-status", version.status);
  core.setOutput("cc-latest-changes-log", version.text);
};
