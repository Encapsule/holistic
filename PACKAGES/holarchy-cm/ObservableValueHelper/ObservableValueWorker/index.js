"use strict";

// ObservableValueHelper/ObservableValueWorker/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var cellModel = new holarchy.CellModel({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel
    }).result.CMID,
    name: "".concat(cmLabel, " Model"),
    description: "Performs work on behalf a single ObservableValueHelper cell.",
    apm: require("./AbstractProcessModel-ObservableValueWorker"),
    actions: [require("./ControllerAction-ObservableValueWorker-read-value"), require("./ControllerAction-ObservableValueWorker-step-worker")],
    operators: [require("./TransitionOperator-ObservableValueWorker-value-has-updated"), require("./TransitionOperator-ObservableValueWorker-value-is-active"), require("./TransitionOperator-ObservableValueWorker-value-is-available")],
    subcells: []
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();