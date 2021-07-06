"use strict";

var mkdirp = require("mkdirp");

var path = require("path");

function getLogDir(logsRootDir_) {
  mkdirp.sync(logsRootDir_);
  return logsRootDir_;
}

;

function getRunnerEvalSummaryFilename(logsRootDir_, runnerID_) {
  return path.join(getLogDir(logsRootDir_), "".concat(runnerID_, "-runner-summary.json"));
}

;

function getRunnerInducedGitDiffsFilename(logsRootDir_, runnerID_) {
  return path.join(getLogDir(logsRootDir_), "".concat(runnerID_, "-runner-induced-git-diffs.json"));
}

;

function getRunnerResponseFilename(logsRootDir_, runnerID_) {
  return path.join(getLogDir(logsRootDir_), "".concat(runnerID_, "-runner-response.json"));
}

;

function getLogEvalDir(logsRootDir_, runnerID_) {
  var dirPath = path.join(getLogDir(logsRootDir_), "".concat(runnerID_, "-eval"));
  mkdirp.sync(dirPath);
  return dirPath;
}

;

function getHarnessEvalFilename(logsRootDir_, runnerID_, testID_) {
  return path.join(getLogEvalDir(logsRootDir_, runnerID_), "".concat(testID_, ".json"));
}

;

function getHarnessEvalDiffFilename(logsRootDir_, runnerID_, testID_) {
  return path.join(getLogEvalDir(logsRootDir_, runnerID_), "".concat(testID_, "-git-diff"));
}

;

function getHarnessEvalDiffChangeLinesFilename(logsRootDir_, runnerID_, testID_) {
  return path.join(getLogEvalDir(logsRootDir_, runnerID_), "".concat(testID_, "-change-lines"));
}

;

function getHarnessEvalDiffTreeFilename(logsRootDir_, runnerID_, testID_) {
  return path.join(getLogEvalDir(logsRootDir_, runnerID_), "".concat(testID_, "-git-diff-tree"));
}

;
module.exports = {
  getLogDir: getLogDir,
  getRunnerEvalSummaryFilename: getRunnerEvalSummaryFilename,
  getRunnerInducedGitDiffsFilename: getRunnerInducedGitDiffsFilename,
  getRunnerResponseFilename: getRunnerResponseFilename,
  getLogEvalDir: getLogEvalDir,
  getHarnessEvalFilename: getHarnessEvalFilename,
  getHarnessEvalDiffFilename: getHarnessEvalDiffFilename,
  getHarnessEvalDiffChangeLinesFilename: getHarnessEvalDiffChangeLinesFilename,
  getHarnessEvalDiffTreeFilename: getHarnessEvalDiffTreeFilename
};