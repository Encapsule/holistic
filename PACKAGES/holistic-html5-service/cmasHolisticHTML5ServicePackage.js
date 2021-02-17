"use strict";

// cmasHolisticHTML5ServicePackage.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmas = new holarchy.CellModelArtifactSpace({
    spaceLabel: "@encapsule/holistic-html5-package"
  });

  if (!cmas.isValid()) {
    throw new Error(cmas.toJSON());
  }

  module.exports = cmas;
})();