"use strict";

// ControllerAction-app-client-kernel-step-worker.js
var holarchy = require("@encapsule/holarchy");

var hackLib = require("./lib");

var controllerAction = new holarchy.ControllerAction({
  id: "4zsKHGrWRPm9fFa-RxsBuw",
  name: "Holistic App Client Kernel: Process Step Worker",
  description: "Performs actions on behalf of the Holistic App Client Kernel APM.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      app: {
        ____types: "jsObject",
        client: {
          ____types: "jsObject",
          kernel: {
            ____types: "jsObject",
            _private: {
              ____types: "jsObject",
              stepWorker: {
                ____types: "jsObject",
                action: {
                  ____accept: "jsString",
                  ____inValueSet: ["noop", "activate-subprocesses"],
                  ____defaultValue: "noop"
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
      var actorName = "[".concat(this.operationID, "::").concat(this.operationName, "]");
      var messageBody = request_.actionRequest.holistic.app.client.kernel._private.stepWorker;
      console.log("".concat(actorName, " processing \"").concat(messageBody.action, "\" request from app client kernel APM."));
      var hackLibResponse = hackLib.getStatus.request(request_.context);

      if (hackLibResponse.error) {
        errors.push(hackLibResponse.error);
        break;
      }

      var hackDescriptor = hackLibResponse.result;
      var kernelCellData = hackDescriptor.cellMemory;
      var actResponse = void 0,
          ocdResponse = void 0;

      switch (messageBody.action) {
        case "noop":
          break;

        case "activate-subprocesses":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Activating DOMLocationProcessor process on behalf of the app client kernel process.",
            actionRequest: {
              CellProcessor: {
                util: {
                  writeActionResponseToPath: {
                    dataPath: "#.serviceProcesses.domLocationProcessor",
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {},
                          processCoordinates: {
                            apmID: "-1Ptaq_zTUa8Gfv_3ODtDg"
                            /* "Holistic App Client Kernel: DOM Location Processor" */

                          }
                        }
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

          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Activating d2r2DisplayAdapter process on behalf of the app client kernel process.",
            actionRequest: {
              CellProcessor: {
                util: {
                  writeActionResponseToPath: {
                    dataPath: "#.serviceProcesses.d2r2DisplayAdapter",
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {
                            processData: {
                              construction: {
                                d2r2Components: kernelCellData.lifecycleResponses.query.result.actionResult.d2r2ComponentsArray
                              }
                            }
                          },
                          processCoordinates: {
                            apmID: "IxoJ83u0TXmG7PLUYBvsyg"
                            /* "Holistic Client App Kernel: d2r2/React Client Display Adaptor" */

                          }
                        }
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
          } // TODO: Let's leave this out for now until the basic stuff is working end-to-end and requirements are less abstract.
          // { CellProcessor: { util: { writeActionResponseToPath: { dataPath: "#.serviceProcesses.clientViewProcessor", actionRequest: { CellProcessor: { process: { activate: {}, processCoordinates: { apmID: "Hsu-43zBRgqHItCPWPiBng" /* "Holistic App Client Kernel: Client View Processor" */ } } } } } } } },


          break;

        default:
          errors.push("Internal error: unhandled action value \"".concat(messageBody.action, "\"."));
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

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;