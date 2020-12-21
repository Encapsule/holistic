#!/usr/bin/env node
// This script is registered in @encapsule/holarchy/package.json "bin" section
// so that an entry point is written into a derived holistic application's
// ./node_modules/.bin directory.
//
// This allows the derived app's holistic Makefile to call this script to ask that
// whatever asset resources this package contains be copied into the application's
// BUILD structure (at a directory specified by the caller).
"use strict";

var childProcess = require("child_process");

var path = require("path");

var packageMeta = require("../package.json");

var packageResourcesDirPath = path.resolve(path.join(__dirname, "../ASSETS"));

function syncExec(request_) {
  // request_ = { command: string, cwd: string,  }
  // https://stackoverflow.com/questions/30134236/use-child-process-execsync-but-keep-output-in-console
  // return childProcess.execSync(request_.command, { cwd: request_.cwd, stdio: [0,1,2] });
  return childProcess.execSync(request_.command, {
    cwd: request_.cwd
  }).toString("utf8").trim();
} // syncExec


console.log("".concat(packageMeta.name, " v").concat(packageMeta.version, " copying resources..."));
console.log(JSON.stringify(process.argv));
var consoleOutput = syncExec({
  cwd: packageResourcesDirPath,
  command: ["cp -Rpv ./*", process.argv[2]].join(" ")
});
console.log(consoleOutput);