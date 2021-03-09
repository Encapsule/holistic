"use strict";

// DisplayView_T/DisplayViewBase/ControllerAction-DisplayViewBase-step-worker.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var actionLabel = "stepWorker";
  var actionName = "".concat(cmLabel, " Private Step Worker");

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: actionName,
    description: "Implementation worker action for the DisplayViewBase CellModel.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            DisplayViewBase: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                stepWorker: {
                  ____types: "jsObject",
                  action: {
                    ____types: "jsString",
                    ____inValueSet: ["noop", "initialize"]
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
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var libResponse = lib.getStatus.request(request_.context);

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var cellMemory = libResponse.result.cellMemory;
        var messageBody = request_.actionRequest.holarchy.common.actions.DisplayViewBase._private.stepWorker;
        var actResponse = void 0,
            ocdResponse = void 0;

        switch (messageBody.action) {
          case "noop":
            break;

          case "initialize":
            actResponse = request_.context.act({
              actorName: actionName,
              actorTaskDescription: "Attempting to write the initial output of this display view cell to our specialized ObservableValue cell...",
              actionRequest: {
                holarchy: {
                  common: {
                    actions: {
                      ObservableValue: {
                        writeValue: {
                          value: {
                            renderContext: {
                              apmBindingPath: request_.context.apmBindingPath,
                              displayPath: "👁"
                            },
                            // set
                            renderData: {} // reset to default values

                          },
                          path: "#.outputs.displayView"
                        }
                      }
                    }
                  }
                }
              },
              apmBindingPath: request_.context.apmBindingPath
            });

            if (actResponse.error) {
              errors.push(actResponse.error);
              break;
            }

            break;

          default:
            break;
        } // end switch


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