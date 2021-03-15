"use strict";

// cmasObservableValueWorker.js
(function () {
  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var factoryResponse = cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: require("./cell-label")
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();