"use strict";

var observableFrameLatchDeclaration = require("./declarations/ObservableProcessModel-frame-latch-declaration");

var observableFrameLatch = require("./ObservableProcessModel-frame-latch");

var SMLModels = {
  core: {
    observableFrameLatch: observableFrameLatch
  },
  test: {
    declaration: {
      observableFrameLatch: observableFrameLatchDeclaration
    }
  }
};
module.exports = SMLModels;