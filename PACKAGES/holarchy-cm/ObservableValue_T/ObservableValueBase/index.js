"use strict";

// ObservableValue_T/ObservableValueBase/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var cellModel = new holarchy.CellModel({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel
    }).result.CMID,
    name: cmLabel,
    description: "Provides generic (i.e. value-type-agnostic) action and operator behaviors for CellModel synthesized via ObservableValue_T::synthesizeCellModel method.",
    // apm:  <- No AbstractProcessModel defined here (i.e. this cell is not activatable via CellProcessor).
    actions: [require("./ControllerAction-ObservableValueBase-read-value"), require("./ControllerAction-ObservableValueBase-reset-value"), require("./ControllerAction-ObservableValueBase-set-dact"), require("./ControllerAction-ObservableValueBase-write-value")],
    operators: [require("./TransitionOperator-ObservableValueBase-value-has-updated"), require("./TransitionOperator-ObservableValueBase-value-is-active"), require("./TransitionOperator-ObservableValueBase-value-is-available")]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();