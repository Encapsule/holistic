"use strict";

// ObservableValue_T/ObservableValueBase/ControllerAction-ObservableValueBase-reset.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueBase = require("./cmasObservableValueBase");

  var cmLabel = require("./cell-label");

  var actionName = "".concat(cmLabel, " Reset Value");
  var action = new holarchy.ControllerAction({
    id: cmasObservableValueBase.mapLabels({
      CM: cmLabel,
      ACT: actionName
    }).result.ACTID,
    name: actionName,
    description: "Resets any active ObervableValue cell deleting its value and reseting its revision back to -1 (reset).",
    actionRequestSpec: {
      ____label: "ObservableValue Reset Value Request",
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValue: {
              ____types: "jsObject",
              resetValue: {
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
    actionResultSpec: {
      ____accept: "jsString",
      ____defaultValue: "okay"
    },
    bodyFunction: function bodyFunction(actionRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        console.log("[".concat(this.operationID, "::").concat(this.operationName, "] called on provider cell \"").concat(actionRequest_.context.apmBindingPath, "\""));
        var messageBody = actionRequest_.actionRequest.holarchy.common.actions.ObservableValue.resetValue;
        var ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "".concat(messageBody.path, ".__apmiStep")
        });

        if (ocdResponse.error) {
          errors.push("Okay - hold up! You cannot reset an ObservableValue cell that is not active!");
          errors.push(ocdResponse.error);
          break;
        } // Affect reset operation on the ObservableValue cell instance.


        ocdResponse = actionRequest_.context.ocdi.writeNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: messageBody.path
        }, {});

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();