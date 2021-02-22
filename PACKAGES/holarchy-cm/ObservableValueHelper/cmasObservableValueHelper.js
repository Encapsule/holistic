"use strict";

// cmasObservableValueHelper.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  module.exports = new holarchy.CellModelArtifactSpace(cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: cmLabel
  }).result);
})();