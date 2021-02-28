"use strict";

// HolisticHTML5Service_DOMLocation/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolisticHTML5ServicePackage = require("../cmasHolisticHTML5ServicePackage");

  var cmLabel = require("./cm-label");

  var cellModel = new holarchy.CellModel({
    id: cmasHolisticHTML5ServicePackage.mapLabels({
      CM: cmLabel
    }).result.CMID,
    name: cmLabel,
    description: "Abstracts monitoring and setting the window.location and hashroute.",
    apm: require("./AbstractProcessModel-dom-location-processor"),
    actions: [require("./ControllerAction-dom-location-processor-configure"), require("./ControllerAction-dom-location-processor-hashchange")],
    subcells: [require("./ObservableValue_RouterEventDescriptor")]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();