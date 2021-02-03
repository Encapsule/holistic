"use strict";

// HolarchyCommon_ValueObserver/index.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

(function () {
  var cellID = arccore.identifier.irut.fromReference("@encapsule/holarchy-cm.ValueObserver.CellModel").result;
  var apmID = arccore.identifier.irut.fromReference("@encapsule/holarchy-cm.ValueObserver.AbstractProcessModel").result;
  var cellmodel = new holarchy.CellModel({
    id: cellID,
    name: "ValueObserver Model",
    description: "Provides a generic way to evaluate transition operators and perform actions on an ObservableValue cell.",
    apm: require("./AbstractProcessModel-value-observer"),
    actions: [require("./ControllerAction-value-observer-configure"), require("./ControllerAction-value-observer-step-worker")]
  });

  if (!cellmodel.isValid()) {
    throw new Error(cellmodel.toJSON());
  }

  module.exports = cellmodel;
})();