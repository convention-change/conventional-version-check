const { getEntries } = require("./get-entries");

const DATA = `
# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.6.0 (2023-07-25)

* Merge pull request #25 from bridgewwater/release-1.6.0 ([aa49b8f](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/aa49b8f)), closes [#25](https://github.com/bridgewwater/template-opensource-contributor-guide/issues/25)
* Merge pull request #27 from bridgewwater/release-1.6.0 ([d8938ee](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/d8938ee)), closes [#27](https://github.com/bridgewwater/template-opensource-contributor-guide/issues/27)
* Merge pull request #28 from bridgewwater/release-1.6.0 ([59bca68](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/59bca68)), closes [#28](https://github.com/bridgewwater/template-opensource-contributor-guide/issues/28)
* Merge pull request #30 from bridgewwater/release-1.6.0 ([940457a](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/940457a)), closes [#30](https://github.com/bridgewwater/template-opensource-contributor-guide/issues/30)
* Merge pull request #31 from bridgewwater/release-1.6.0 ([0d521bb](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/0d521bb)), closes [#31](https://github.com/bridgewwater/template-opensource-contributor-guide/issues/31)
* ci: add some check of tag-from-pr ([bcf9566](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/bcf9566))
* ci: fix error of get-action-standard-version-out ([7b0a19d](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/7b0a19d))
* ci: open create-standard-version push-changes-and-tag ([9833fbe](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/9833fbe))
* ci: open release by pr close ([40b6bf4](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/40b6bf4))
* feat: change ci-info and less at ci.yml at github action ([904890e](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/904890e))
* feat: change schedule of clean-issue-prs.yml ([a9cac9e](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/a9cac9e))
* feat: update print at pr ([377f7aa](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/377f7aa))
* fix: update get-action-standard-version-out ([ed8adc4](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/ed8adc4))

### [1.5.1](https://github.com/bridgewwater/template-opensource-contributor-guide/compare/v1.5.0...v1.5.1) (2023-07-23)

## 1.5.0 (2023-07-23)

* Merge pull request #22 from bridgewwater/release-1.5.0 ([32c17c7](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/32c17c7)), closes [#22](https://github.com/bridgewwater/template-opensource-contributor-guide/issues/22)
* Merge pull request #23 from bridgewwater/release-1.5.0 ([07d7749](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/07d7749)), closes [#23](https://github.com/bridgewwater/template-opensource-contributor-guide/issues/23)
* Merge pull request #24 from bridgewwater/release-1.5.0 ([4483bc9](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/4483bc9)), closes [#24](https://github.com/bridgewwater/template-opensource-contributor-guide/issues/24)
* feat: change to git config --local user.email and name to github-acitons ([674c401](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/674c401))
* feat: update Configure committer at tag-from-pr.yml ([75416f5](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/75416f5))
* fix: change other args at release by PR ([f5a0936](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/f5a0936))
* fix: get github.event.sender info ([13d60bf](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/13d60bf))
* fix: let tag-from-pr use all history for all tags and branches ([bec7b6d](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/bec7b6d))
* fix: use yashanand1910/standard-release-notes@v1.3.0 to get release_notes ([6cb9b5b](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/6cb9b5b))
* ci: change get_release_notes at tags ([0182da7](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/0182da7))
* ci: try github.event.pusher ([27d114f](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/27d114f))
* chore(release): 1.4.1 ([2148a68](https://github.com/bridgewwater/template-opensource-contributor-guide/commit/2148a68))

`;

test("cc entries", () => {
  const output = getEntries(DATA);

  console.log(output);
  expect(output.length).toEqual(3);
});
