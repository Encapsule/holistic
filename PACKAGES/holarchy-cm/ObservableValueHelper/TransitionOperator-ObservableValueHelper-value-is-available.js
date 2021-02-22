"use strict";

// TransitionOperator-ObservableValueHelper-value-is-available.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueHelper = require("./cmasObservableValueHelper");

  var cmLabel = require("./cell-label");

  var operatorName = "".concat(cmLabel, " Value Is Available");

  var lib = require("./lib");

  var operator = new holarchy.TransitionOperator({
    id: cmasObservableValueHelper.mapLabels({
      TOP: "valueIsAvailable"
    }).result.TOPID,
    name: operatorName,
    description: "Returns Boolean true if the target ObservableValue cell's value has been written at least once by its provider cell process.",
    operatorRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          operators: {
            ____types: "jsObject",
            ObservableValueHelper: {
              ____types: "jsObject",
              valueIsAvailable: {
                ____types: "jsObject"
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