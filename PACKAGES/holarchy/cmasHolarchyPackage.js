"use strict";

// cmasHolarchyPackage.js
(function () {
  var CellModelArtifactSpace = require("./CellModelArtifactSpace");

  var cmasHolarchyPackage = new CellModelArtifactSpace({
    spaceLabel: "@encapsule/holarchy"
  });

  if (!cmasHolarchyPackage.isValid()) {
    throw new Error(cmasHolarchyPackage.toJSON());
  }

  module.exports = cmasHolarchyPackage;
})();