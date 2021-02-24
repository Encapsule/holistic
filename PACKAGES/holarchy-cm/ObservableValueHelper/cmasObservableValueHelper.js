"use strict";

// cmasObservableValueHelper.js
(function () {
  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmasObservableValueHelper = cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: require("./cell-label")
  });

  if (!cmasObservableValueHelper.isValid()) {
    throw new Error(cmasObservableValueHelper.toJSON());
  }

  module.exports = cmasObservableValueHelper;
})();