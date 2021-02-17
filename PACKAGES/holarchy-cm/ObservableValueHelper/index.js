"use strict";

// ObservableValueHelper/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cm-label-string");

  var cellmodel = new holarchy.CellModel({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel
    }).result.CMID,
    name: cmLabel,
    description: "Provides a generic means of linking to and subsequently reading from an active ObservableValue family member cell owned by another cell process.",
    apm: require("./AbstractProcessModel-ObservableValueHelper"),
    actions: [require("./ControllerAction-ObservableValueHelper-configure"), require("./ControllerAction-ObservableValueHelper-step-worker")]
  });

  if (!cellmodel.isValid()) {
    throw new Error(cellmodel.toJSON());
  }

  module.exports = cellmodel;
})();