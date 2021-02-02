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
    apm: {
      id: apmID,
      name: "ValueObserver Process",
      description: "A strongly-typed runtime intra-cell communication signal input.",
      ocdDataSpec: {
        ____types: "jsObject",
        ____defaultValue: {}
      },
      steps: {
        "uninitialized": {
          description: "Default starting process step",
          transitions: [{
            transitionIf: {
              always: true
            },
            nextStep: "value-observer-initialize"
          }]
        },
        "value-observer-initialize": {
          description: "The ValueObserver cell is intializing..."
        }
      }
    }
  });

  if (!cellmodel.isValid()) {
    throw new Error(cellmodel.toJSON());
  }

  module.exports = cellmodel;
})();