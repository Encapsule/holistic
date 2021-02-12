"use strict";

// ObservableValue_T/ObservableValueBase/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cellModelLabel = require("./cell-label");

  var cellModel = new holarchy.CellModel({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cellModelLabel
    }).result.CMID,
    name: cellModelLabel,
    description: "Provides generic (i.e. value-type-agnostic) behaviors for CellModelTemplate specialization ObservableValue_T.",
    // apm:  <- No AbstractProcessModel defined here (i.e. this cell is not activatable via CellProcessor).
    actions: [require("./ControllerAction-ObservableValueBase-read-value"), require("./ControllerAction-ObservableValueBase-reset-value"), require("./ControllerAction-ObservableValueBase-write-value")],
    operators: [require("./TransitionOperator-ObservableValueBase-value-has-updated"), require("./TransitionOperator-ObservableValueBase-value-is-available")]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();