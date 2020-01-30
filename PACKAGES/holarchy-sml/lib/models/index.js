"use strict";

var observableFrameLatchDeclaration = require("./ObservableProcessModel-frame-latch-declaration");

var observableFrameLatch = require("./ObservableProcessModel-frame-latch");

var d2r2ReactClientDisplayAdaptorDeclaration = require("./ObservableProcessModel-d2r2-react-client-display-adaptor-declaration");

var d2r2ReactClientDisplayAdaptor = require("./ObservableProcessModel-d2r2-react-client-display-adaptor");

var SMLModels = {
  core: {
    observableFrameLatch: observableFrameLatch,
    d2r2ReactClientDisplayAdaptor: d2r2ReactClientDisplayAdaptor
  },
  test: {
    declaration: {
      observableFrameLatch: observableFrameLatchDeclaration,
      d2r2ReactClientDisplayAdaptor: d2r2ReactClientDisplayAdaptorDeclaration
    }
  }
};
module.exports = SMLModels;