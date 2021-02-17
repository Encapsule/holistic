"use strict";

// ControllerAction-ObservableValueHelper-step-worker.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cm-label-string");

  var cmasResponse = cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: cmLabel
  });

  if (cmasResponse.error) {
    throw new Error(cmasResponse.error);
  }

  var cmasObservableValueHelper = new holarchy.CellModelArtifactSpace(cmasResponse.result);

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasObservableValueHelper.mapLabels({
      ACT: "stepWorker"
    }).result.ACTID,
    name: "".concat(cmLabel, " Step Worker"),
    description: "Private evaluation implementation action of ".concat(cmLabel, "."),
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        cm: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ValueObserver: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                stepWorker: {
                  ____types: "jsObject",
                  action: {
                    ____accept: "jsString",
                    ____inValueSet: ["noop"]
                  }
                }
              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____accept: "jsString",
      ____defaultValue: "okay"
    },
    bodyFunction: function bodyFunction(actionRequest_) {
      return {
        error: null
      };
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();