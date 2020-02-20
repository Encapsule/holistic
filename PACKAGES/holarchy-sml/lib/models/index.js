"use strict";

var abstractFrameLatchDeclaration = require("./declarations/AbstractProcessModel-frame-latch-declaration");

var abstractFrameLatch = require("./AbstractProcessModel-frame-latch");

var SMLModels = {
  core: {
    observableFrameLatch: abstractFrameLatch
  },
  test: {
    declaration: {
      observableFrameLatch: abstractFrameLatchDeclaration
    }
  }
};
module.exports = SMLModels;