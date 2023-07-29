[![units-test](https://github.com/convention-change/conventional-version-check/actions/workflows/test.yml/badge.svg)](https://github.com/convention-change/conventional-version-check/actions/workflows/test.yml)
[![Check dist/](https://github.com/convention-change/conventional-version-check/actions/workflows/check-dist.yml/badge.svg)](https://github.com/convention-change/conventional-version-check/actions/workflows/check-dist.yml)
[![GitHub license](https://img.shields.io/github/license/convention-change/conventional-version-check)](https://github.com/convention-change/conventional-version-check)
[![GitHub latest SemVer tag)](https://img.shields.io/github/v/tag/convention-change/conventional-version-check)](https://github.com/convention-change/conventional-version-check/tags)
[![GitHub release)](https://img.shields.io/github/v/release/convention-change/conventional-version-check)](https://github.com/convention-change/conventional-version-check/releases)

## Usage

You can use the v1 branch or the latest version.

```yaml
jobs:
  version-check:
    name: version-check
    strategy:
      matrix:
        # You can add more, for any target you'd like!
        include:
          - build: linux
            os: ubuntu-latest
    runs-on: ${{ matrix.os }}

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: get version and conventional
        id: check-version
        uses: convention-change/conventional-version-check@v1 # or change to latest version
        with:
          sha-length: 8

      - name: check version and conventional
        run: |
          echo "sha: ${{ steps.check-version.outputs.sha }}"
          echo "env SHA-SHORT: ${{ env.SHA-SHORT }}"
          echo "short-sha: ${{ steps.check-version.outputs.short-sha }}"
          echo "tag-version: ${{ steps.check-version.outputs.tag-version }}"
          echo "env GIT_TAG_VERSION: ${{ env.GIT_TAG_VERSION }}"
          echo "cc-latest-version: ${{ steps.check-version.outputs.cc-latest-version }}"
          echo "cc-latest-date: ${{ steps.check-version.outputs.cc-latest-date }}"
          echo "cc-latest-status: ${{ steps.check-version.outputs.cc-latest-status }}"
          echo "cc-latest-changes-log: ${{ steps.check-version.outputs.cc-latest-changes-log }}"
```

- or use as workflow call like `version.yml`

```yaml
name: version

on:
  workflow_call: # https://docs.github.com/actions/using-workflows/reusing-workflows#using-inputs-and-secrets-in-a-reusable-workflow
    outputs:
      short_sha:
        description: 'version short hash of the commit size 8'
        value: ${{ jobs.version-check.outputs.short_sha }}
      sha:
        description: 'version short hash of the commit'
        value: ${{ jobs.version-check.outputs.sha }}
      tag_name:
        description: 'tag name, if not tag will null'
        value: ${{ jobs.version-check.outputs.tag_name }}
      cc_version:
        description: 'conventional version'
        value: ${{ jobs.version-check.outputs.cc_version }}
      cc_date:
        description: 'conventional date'
        value: ${{ jobs.version-check.outputs.cc_date }}
      cc_changes:
        description: 'conventional change logs'
        value: ${{ jobs.version-check.outputs.cc_changes }}
      cc_status:
        description: 'conventional change status, released or prereleased'
        value: ${{ jobs.version-check.outputs.cc_status }}


jobs:
  version-check:
    name: version-check
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        # You can add more, for any target you'd like!
        include:
          - build: linux
            os: ubuntu-latest
            target: x86_64-unknown-linux-gnu
    outputs:
      short_sha: ${{ steps.check-version.outputs.short-sha }}
      sha: ${{ steps.check-version.outputs.sha }}
      tag_name: ${{ steps.check-version.outputs.tag-version }}
      cc_version: ${{ steps.check-version.outputs.cc-latest-version }}
      cc_date: ${{ steps.check-version.outputs.cc-latest-date }}
      cc_changes: ${{ steps.check-version.outputs.cc-latest-status }}
      cc_status: ${{ steps.check-version.outputs.cc-latest-changes-log }}

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: get version and conventional
        id: check-version
        uses: convention-change/conventional-version-check@v1 # or change to latest version
        with:
          sha-length: 8

      - name: check version and conventional
        run: |
          echo "sha: ${{ steps.check-version.outputs.sha }}"
          echo "env SHA-SHORT: ${{ env.SHA-SHORT }}"
          echo "short-sha: ${{ steps.check-version.outputs.short-sha }}"
          echo "tag-version: ${{ steps.check-version.outputs.tag-version }}"
          echo "env GIT_TAG_VERSION: ${{ env.GIT_TAG_VERSION }}"
          echo "cc-latest-version: ${{ steps.check-version.outputs.cc-latest-version }}"
          echo "cc-latest-date: ${{ steps.check-version.outputs.cc-latest-date }}"
          echo "cc-latest-status: ${{ steps.check-version.outputs.cc-latest-status }}"
          echo "cc-latest-changes-log: ${{ steps.check-version.outputs.cc-latest-changes-log }}"
```

# dev

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/contributor%20covenant-v1.4-ff69b4.svg)](.github/CONTRIBUTING_DOC/CODE_OF_CONDUCT.md)
[![GitHub contributors](https://img.shields.io/github/contributors/convention-change/conventional-version-check)](https://github.com/convention-change/conventional-version-check/graphs/contributors)

We welcome community contributions to this project.

Please read [Contributor Guide](.github/CONTRIBUTING_DOC/CONTRIBUTING.md) for more information on how to get started.

请阅读有关 [贡献者指南](.github/CONTRIBUTING_DOC/zh-CN/CONTRIBUTING.md) 以获取更多如何入门的信息


## Code in Main

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)
...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
const core = require('@actions/core');
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
