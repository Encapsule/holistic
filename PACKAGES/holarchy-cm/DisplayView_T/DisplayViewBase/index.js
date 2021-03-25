"use strict";

// DisplayView_T/DisplayViewBase/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var cellModel = new holarchy.CellModel({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel
    }).result.CMID,
    name: cmLabel,
    description: "Provides generic behaviors for specializations for DisplayValue family cells synthesized with DisplayView_T.",
    actions: [require("./ControllerAction-DisplayViewBase-step-worker"), require("./ControllerAction-DisplayViewBase-link-display-process"), require("./ControllerAction-DisplayViewBase-set-as-root")]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();