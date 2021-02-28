"use strict";

// ObservableValue_T/ObservableValueBase/TransitionOperator-ObservableValueBase-ready.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueBase = require("./cmasObservableValueBase");

  var cmLabel = require("./cell-label");

  var operatorName = "".concat(cmLabel, " Value Is Available");
  var operator = new holarchy.TransitionOperator({
    id: cmasObservableValueBase.mapLabels({
      CM: cmLabel,
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
          operators: {
            ____types: "jsObject",
            ObservableValue: {
              ____types: "jsObject",
              valueIsAvailable: {
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
        var messageBody = operatorRequest_.operatorRequest.holarchy.common.operators.ObservableValue.valueIsAvailable; // If we cannot read the ObservableValue cell's revision number, then it does not exist.

        var ocdResponse = operatorRequest_.context.ocdi.readNamespace({
          apmBindingPath: operatorRequest_.context.apmBindingPath,
          dataPath: "".concat(messageBody.path, ".revision")
        });

        if (ocdResponse.error) {
          // Either the provider cell process or the ObservableValue cell process is not active.
          // So, the answer is false --- the ObservableValue is not available.
          response.result = false;
          break;
        }

        var currentRevision = ocdResponse.result; // The ObservableValue is "available" if it has been written once or more times since since activation / reset.

        response.result = currentRevision > -1;

        if (!response.result) {
          // Check and see if there's a dact pending...
          ocdResponse = operatorRequest_.context.ocdi.readNamespace({
            apmBindingPath: operatorRequest_.context.apmBindingPath,
            dataPath: "".concat(messageBody.path, ".dact")
          });

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          var dact = ocdResponse.result;

          if (dact) {
            response.result = true;
          }
        }

        console.log("> Answer is ".concat(response.result, " --- value cell is ").concat(response.result ? "AVAILABLE" : "UNAVAILABLE", "."));
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