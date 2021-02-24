"use strict";

// cmasObservableValueWorker.js
(function () {
  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmasObservableValueWorker = cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: require("./cell-label")
  });

  if (!cmasObservableValueWorker.isValid()) {
    throw new Error(cmasObservableValueWorker.toJSON());
  }

  module.exports = cmasObservableValueWorker;
})();