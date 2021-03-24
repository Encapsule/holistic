"use strict";

// AbstractProcessModel-ovh-map.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var _require = require("./cell-metadata"),
      cmLabel = _require.cmLabel,
      cmDescription = _require.cmDescription;

  var ovhCellModel = require("../ObservableValueHelper");

  var apm = new holarchy.AbstractProcessModel({
    id: cmasHolarchyCMPackage.mapLabels({
      APM: cmLabel
    }).result.APMID,
    name: "".concat(cmLabel, " Process"),
    description: cmDescription,
    ocdDataSpec: {
      ____label: "".concat(cmLabel, " Cell Memory"),
      ____description: "Backing cell instance data for ".concat(cmLabel, " cell process."),
      ____types: "jsObject",
      ____defaultValue: {},
      ovhMap: {
        ____label: "ObservableValueHelper Map",
        ____description: "An extensible map (object used as a dictionary) of ObservableValueHelper cell activations.",
        ____types: "jsObject",
        ____asMap: true,
        ____defaultValue: {},
        signalName: {
          ____types: "jsObject",
          ____appdsl: {
            apm: ovhCellModel.getAPM().getID()
          }
        }
      }
    }
  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();