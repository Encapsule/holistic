"use strict";

var observableFrameLatchDeclaration = require("./opm-frame-latch-declaration");

var observableFrameLatch = require("./opm-frame-latch");

var d2r2ReactClientDisplayAdaptorDeclaration = require("./opm-d2r2-react-client-display-adaptor-declaration");

var d2r2ReactClientDisplayAdaptor = require("./opm-d2r2-react-client-display-adaptor");

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