"use strict";

// ObservableValue_T/ObservableValueBase/TransitionOperator-ObservableValueBase-value-has-updated.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueBase = require("./cmasObservableValueBase");

  var cmLabel = require("./cell-label");

  var operatorName = "".concat(cmLabel, " Cell Exists");
  var operator = new holarchy.TransitionOperator({
    id: cmasObservableValueBase.mapLabels({
      TOP: operatorName
    }).result.TOPID,
    name: operatorName,
    description: "Returns Boolean true iff the ObservableValue cell exists in the cellplane at the specified path / coordinates.",
    operatorRequestSpec: {
      ____label: "ObservableValue Cell Exists Request",
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          operators: {
            ____types: "jsObject",
            ObservableValue: {
              ____types: "jsObject",
              // TODO: Should be renamed to valueIsActive for consistency w/ObservableValueWorker naming I think.
              cellExists: {
                ____types: "jsObject",
                path: {
                  ____accept: "jsString",
                  ____defaultValue: "#"
                }
              }
            }
          }
        }
      }
    },
    bodyFunction: function bodyFunction(operatorRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        console.log("[".concat(this.operationID, "::").concat(this.operationName, "] called on provider cell \"").concat(operatorRequest_.context.apmBindingPath, "\""));
        var messageBody = operatorRequest_.operatorRequest.holarchy.common.operators.ObservableValue.cellExists; // If we cannot read the ObservableValue cell's revision number, then it does not exist.

        var ocdResponse = operatorRequest_.context.ocdi.readNamespace({
          apmBindingPath: operatorRequest_.context.apmBindingPath,
          dataPath: "".concat(messageBody.path, ".revision")
        });
        response.result = ocdResponse.error ? false : true;
        console.log("> Answer is ".concat(response.result, " --- value cell is ").concat(response.result ? "ACTIVE" : "inactive", "."));
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (!operator.isValid()) {
    throw new Error(operator.toJSON());
  }

  module.exports = operator;
})();