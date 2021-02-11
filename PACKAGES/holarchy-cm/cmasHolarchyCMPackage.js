"use strict";

// cmasHolarchyCMPackage.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = new holarchy.CellModelArtifactSpace({
    spaceLabel: "@encapsule/holarchy-cm"
  });

  if (!cmasHolarchyCMPackage.isValid()) {
    throw new Error(cmasHolarchyCMPackage.toJSON());
  }

  module.exports = cmasHolarchyCMPackage;
})();