"use strict";

// ObservableValue_T/ObservableValueBase/TransitionOperator-ObservableValueBase-ready.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cellModelLabel = require("./cell-label");

  var operatorName = "".concat(cellModelLabel, ".operator.valueIsAvailable");
  var operator = new holarchy.TransitionOperator({
    id: cmasHolarchyCMPackage.mapLabels({
      TOP: operatorName
    }).result.TOPID,
    name: operatorName,
    description: "Returns Boolean true iff the ObservableValue cell process is in step 'observable-value-ready' (i.e. the ObservableValue cell value has been written since reset).",
    operatorRequestSpec: {
      ____label: "ObservableValue Value Has Updated Operator Request",
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          ObservableValue: {
            ____types: "jsObject",
            valueIsAvailable: {
              ____types: "jsObject"
            }
          }
        }
      }
    },
    bodyFunction: function bodyFunction(operatorRequest_) {
      return {
        error: null,
        result: false
      }; // TODO
    }
  });

  if (!operator.isValid()) {
    throw new Error(operator.toJSON());
  }

  module.exports = operator;
})();