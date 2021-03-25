"use strict";

// ControllerAction-app-client-display-register-display-view-process.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolisticHTML5ServicePackage = require("../cmasHolisticHTML5ServicePackage");

  var cmLabel = require("./cell-label");

  var actionLabel = "registerDisplayViewProvider";

  var hacdLib = require("./lib");

  var actionName = "".concat(cmLabel, " Register Display View Provider");
  var action = new holarchy.ControllerAction({
    id: cmasHolisticHTML5ServicePackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: actionName,
    description: "Instructs the ".concat(cmLabel, " process to connect its #.inputs.displayViewStream ObservableValueHelper cell to the specified DisplayView family cell process and monitor it for change(s) to be relayed to the HTML5 service's display process (implemented by React)."),
    actionRequestSpec: {
      ____types: "jsObject",
      holistic: {
        ____types: "jsObject",
        app: {
          ____types: "jsObject",
          client: {
            ____types: "jsObject",
            display: {
              ____types: "jsObject",
              registerDisplayViewProcess: {
                ____types: "jsObject",
                processCoordinates: {
                  ____types: ["jsString", // because it might be a cellProcessPath or cellProcessID
                  "jsObject" // because it might be a raw coordinates apmID, instanceName descriptor
                  ],
                  apmID: {
                    ____accept: "jsString"
                  },
                  instanceName: {
                    ____accept: "jsString",
                    ____defaultValue: "singleton"
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
        var hacdResponse = hacdLib.getStatus.request(request_.context);

        if (hacdResponse.error) {
          errors.push(hacdResponse.error);
          break;
        }

        var _hacdResponse$result = hacdResponse.result,
            cellMemory = _hacdResponse$result.cellMemory,
            cellProcess = _hacdResponse$result.cellProcess; // TODO: Update to more modern conventions. This is old code from March, 2020.
        // Okay, so... request_.context.apmBindingPath is set to who knows what actually.
        // But, no matter; we know the cell process coordinates of the display adapter because it's a singleton created by the kernel.
        // And, we force the caller to suppy the cell process coordinates of the DisplayView family member cell to register.
        // So, we'll just ignore request_.context.apmBindingPath (I think).

        var messageBody = request_.actionRequest.holistic.app.client.display.registerDisplayViewProcess;
        var actResponse = request_.context.act({
          actorName: actionName,
          actorTaskDescription: "Attempting to link a DisplayView family cell process to the display adapter...",
          actionRequest: {
            holarchy: {
              common: {
                actions: {
                  ObservableValueHelper: {
                    configure: {
                      path: "#.inputs.displayViewStream",
                      configuration: {
                        observableValue: {
                          processCoordinates: messageBody.processCoordinates,
                          path: "#.outputs.displayView" // Link to the ObservableValue_T family cell output of the DisplayView_T family cell at processCoordinates

                        }
                      }
                    }
                  }
                }
              }
            }
          },
          apmBindingPath: cellProcess.apmBindingPath
        });

        if (actResponse.error) {
          errors.push(actResponse.error);
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