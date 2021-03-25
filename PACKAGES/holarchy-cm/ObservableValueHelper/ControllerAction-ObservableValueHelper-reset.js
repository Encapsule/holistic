"use strict";

// ControllerAction-ObservableValueHelper-reset.js
// This action resets the target ObservableValueHelper back to its uninitialized state.
// This action may be called on an ObservableValueHelper cell while it is in any process step.
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var actionName = "".concat(cmLabel, " Reset Helper");

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: "reset"
    }).result.ACTID,
    name: actionName,
    description: "Resets the specified ObservableValueHelper cell back to its reset process step.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValueHelper: {
              ____types: "jsObject",
              reset: {
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
        var messageBody = actionRequest_.actionRequest.holarchy.common.actions.ObservableValueHelper.reset; // We will be called w/apmBindingPath set to the path of some cell that owns/manages this ObservableValueHelper cell instance (generally).

        var ocdResponse = holarchy.ObservableControllerData.dataPathResolve({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: messageBody.path
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var ovhProcessCoordinates = ocdResponse.result;
        var libResponse = lib.getStatus.request({
          apmBindingPath: ovhProcessCoordinates,
          ocdi: actionRequest_.context.ocdi
        });

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var cellMemory = libResponse.result.cellMemory;

        switch (cellMemory.__apmiStep) {
          case "uninitialized":
          case "observable-value-helper-reset":
            // This is a noop.
            break;

          case "observable-value-helper-linked":
          case "observable-value-helper-link-error":
            // Tear it down and reset this ObservableValueHelper cell back to reset state.
            // Deactivate our child process.
            var actResponse = actionRequest_.context.act({
              actorName: actionName,
              actorTaskDescription: "Deactivating our ObservableValueWorker cell process instance and releasing its proxy reference to the ObservableValue cell's provider cell process.",
              actionRequest: {
                CellProcessor: {
                  process: {
                    processCoordinates: cellMemory.observableValueWorkerProcess.apmBindingPath,
                    deactivate: {}
                  }
                }
              }
            });

            if (actResponse.error) {
              errors.push(actResponse.error);
              break;
            } // Rewrite our instance's cell memory back to default state (effectively restart the process).


            ocdResponse = actionRequest_.context.ocdi.writeNamespace(ovhProcessCoordinates, {});

            if (ocdResponse.error) {
              errors.push(ocdResponse.error);
              break;
            } // Okay - we're reset now.


            break;

          default:
            errors.push("Internal error: A request was made to reset the ObservableValueHelper cell at \"".concat(ovhProcessCoordinates, "\" which we find in unexpected process step \"").concat(cellMemory.__apmiStep, "\"?"));
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