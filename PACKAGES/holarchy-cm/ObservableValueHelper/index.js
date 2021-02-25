"use strict";

// ObservableValueHelper/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var cellmodel = new holarchy.CellModel({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel
    }).result.CMID,
    name: cmLabel,
    description: "Provides a generic means of linking to and subsequently reading from an active ObservableValue family member cell owned by another cell process.",
    apm: require("./AbstractProcessModel-ObservableValueHelper"),
    actions: [require("./ControllerAction-ObservableValueHelper-configure"), require("./ControllerAction-ObservableValueHelper-get-link-error"), require("./ControllerAction-ObservableValueHelper-read-value"), require("./ControllerAction-ObservableValueHelper-reset"), require("./ControllerAction-ObservableValueHelper-step-worker")],
    operators: [require("./TransitionOperator-ObservableValueHelper-has-link-error"), require("./TransitionOperator-ObservableValueHelper-is-linked"), require("./TransitionOperator-ObservableValueHelper-is-reset"), require("./TransitionOperator-ObservableValueHelper-value-has-updated"), require("./TransitionOperator-ObservableValueHelper-value-is-active"), require("./TransitionOperator-ObservableValueHelper-value-is-available")],
    subcells: [require("./ObservableValueWorker")]
  });

  if (!cellmodel.isValid()) {
    throw new Error(cellmodel.toJSON());
  }

  module.exports = cellmodel;
})();