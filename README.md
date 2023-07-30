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
