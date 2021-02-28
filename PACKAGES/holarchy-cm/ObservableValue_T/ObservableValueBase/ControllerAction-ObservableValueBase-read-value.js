"use strict";

// ObservableValue_T/ObservableValueBase/ControllerAction-read-value.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueBase = require("./cmasObservableValueBase");

  var cmLabel = require("./cell-label");

  var actionName = "".concat(cmLabel, " Read Value");
  var action = new holarchy.ControllerAction({
    id: cmasObservableValueBase.mapLabels({
      CM: cmLabel,
      ACT: actionName
    }).result.ACTID,
    name: actionName,
    description: "Reads and returns an ObervableValue from any active cell that is a member of the ObservableValue CellModel family.",
    actionRequestSpec: {
      ____label: "ObservableValue Read Action Request",
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValue: {
              ____types: "jsObject",
              readValue: {
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
      ____label: "ObservableValue Read Action Result",
      ____types: "jsObject",
      value: {
        ____opaque: true
      },
      revision: {
        ____accept: "jsNumber"
      }
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
        var messageBody = actionRequest_.actionRequest.holarchy.common.actions.ObservableValue.readValue; // Ensure the existence of the "provider cell" (the cell that is either itself the ObservableValue
        // or that manages that ObservableValue cell's lifespan as an implementation detail of its model).

        var ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "#.__apmiStep"
        });

        if (ocdResponse.error) {
          // Okay - for whatever reason the provider cell process this action was directed at via its apmBindingPath
          // doesn't currently exist (because it was deactivated for some reason(s) unknown to us. This means that
          // no matter what there's no ObservableValue that can be read because by definition the ObservableValue
          // we want to read is managed by the provider cell. So, if it doesn't exist then neither
          // does the ObservableValue.
          // revision === -3 ----> Provider cell is not active. So, the ObservableValue cell process cannot be active (!LINKED).
          // revision === -2 ----> Provider cell active, but the ObservableValue cell process is not active (!ACTIVE)
          // revision === -1 ----> Provider cell active, ObservableValue cell active but never written (!AVAILABLE)
          // revision >=  0  ----> Provider cell active, ObservableValue cell active, value written once or more (UPDATE)
          response.result = {
            revision: -3
          };
          break;
        }

        ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "".concat(messageBody.path, ".__apmiStep")
        });

        if (ocdResponse.error) {
          // Okay - for whatever reason the ObservableCell process is not active.
          response.result = {
            revision: -2
          };
          break;
        } // The ObservableValue cell process is active (available).
        // If there's a dact --- a Deferred ACTion request, make the action request and then proceed w/the mailbox read.
        // Otherwise, read and return whatever mailbox data was last written and cached by the cell.


        ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "".concat(messageBody.path, ".dact")
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var dact = ocdResponse.result;

        if (dact) {
          // We defer until somebody actually asks to read the value. And, they have. So, now we act...
          var actResponse = actionRequest_.context.act({
            actorName: actionName,
            actorTaskDescription: "Processing deferred action request to perform (presumably) some compute-intensive work required to produce and cache a new value.",
            actionRequest: dact,
            apmBindingPath: actionRequest_.context.apmBindingPath // Deferred action request is made in the context of the provider cell.

          });

          if (actResponse.error) {
            errors.push("Unable to process the deferred action request due to error:");
            errors.push(actResponse.error);
            break;
          }

          var newValue = actResponse.result.actionResult; // Write the new value as if the work was already done before the readValue occurred.
          // Note that writeValue clears the dact because we only ever execute it once if it's set.

          actResponse = actionRequest_.context.act({
            actorName: actionName,
            actorTaskDescription: "Writing a lazily-evaluated value to our mailbox prior to servicing original read value request...",
            actionRequest: {
              holarchy: {
                common: {
                  actions: {
                    ObservableValue: {
                      writeValue: {
                        value: newValue,
                        path: messageBody.path
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: actionRequest_.context.apmBindingPath // Again, we make the action request in the context of the provider cell.

          });

          if (actResponse.error) {
            errors.push("Unable to write the new value yielded by the deferred action due to error:");
            errors.push(actResponse.error);
            break;
          } // And, the reader never knows the difference ;-)

        } // if dact
        // Read the cell (the mailbox) return that value to the caller.


        ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: messageBody.path
        });

        if (ocdResponse.error) {
          errors.push("Unfortunately there's been an unexpected error reading the ObservableValue mailbox value!");
          errors.push(ocdResponse.error);
          break;
        }

        var ovCellMemory = ocdResponse.result;
        response.result = {
          value: ovCellMemory.mailbox ? ovCellMemory.mailbox.value : undefined,
          revision: ovCellMemory.revision
        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      console.log("> Value read ".concat(response.error ? "FAILURE" : "SUCCESS", "."));
      return response;
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();