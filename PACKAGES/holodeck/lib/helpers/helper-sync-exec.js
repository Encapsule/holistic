"use strict";

var childProcess = require("child_process");

module.exports = {
  // request_ = { command: string, cwd: string,  }
  syncExec: function syncExec(request_) {
    // RETURN RESULT TO CALLER
    var response = childProcess.execSync(request_.command, {
      cwd: request_.cwd
    }).toString('utf8').trim(); // BE VERBOSE
    // console.log(`Subprocess command '${request_.command}' in working directory '${request_.cwd}':`);
    // console.log(response);

    return response;
  },
  syncExecKeepConsole: function syncExecKeepConsole(request_) {
    // RETURN RESULT TO STDIO/STDERR
    // https://stackoverflow.com/questions/30134236/use-child-process-execsync-but-keep-output-in-console
    return childProcess.execSync(request_.command, {
      cwd: request_.cwd,
      stdio: [0, 1, 2]
    });
  }
};