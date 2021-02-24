"use strict";

// cmasObservableValueBase.js
(function () {
  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmasObservableValueBase = cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: require("./cell-label")
  });

  if (!cmasObservableValueBase.isValid()) {
    throw new Error(cmasObservableValueBase.toJSON());
  }

  module.exports = cmasObservableValueBase;
})();