"use strict";

// TransitionOperator-ObservableValueWorker-value-has-updated.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueWorker = require("./cmasObservableValueWorker");

  var cmLabel = require("./cell-label");

  var operatorName = "".concat(cmLabel, " Value Has Updated");

  var lib = require("./lib");

  var operator = new holarchy.TransitionOperator({
    id: cmasObservableValueWorker.mapLabels({
      TOP: "valueHasUpdated"
    }).result.TOPID,
    name: operatorName,
    description: "Returns Boolean true if the target ObservableValue cell's value has been written since we last read the value.",
    operatorRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          operators: {
            ____types: "jsObject",
            ObservableValueWorker: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                valueHasUpdated: {
                  ____types: "jsObject"
                }
              }
            }
          }
        }
      }
    },
    bodyFunction: function bodyFunction(operatorRequest_) {
      return {
        error: null,
        result: false
      };
    }
  });

  if (!operator.isValid()) {
    throw new Error(operator.toJSON());
  }

  module.exports = operator;
})();