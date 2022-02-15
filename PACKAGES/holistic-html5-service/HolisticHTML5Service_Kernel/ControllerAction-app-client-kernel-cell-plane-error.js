"use strict";

var holarchy = require("@encapsule/holarchy");

var hackLib = require("./lib");

var controllerAction = new holarchy.ControllerAction({
  id: "ZE1JY82CQ5uRlWQ-zgqz5g",
  name: "Holistic App Client Kernel: Cell Plane Error Handler",
  description: "This action is dispatched generically by a CellProcessor's intrinsic Cell Process Manager process when it receives a notification from its contained OPC instance of a cell plane error(s) that occurred during the processing of the last external call to CellProcessor.act method.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      app: {
        ____types: "jsObject",
        kernel: {
          // because the CPM does not know (or care) if we are a holistic app server or holistic app client kernel process.
          ____types: "jsObject",
          _private: {
            ____types: "jsObject",
            cpmCellPlaneErrorNotification: {
              ____types: "jsObject",
              errorType: {
                ____accept: "jsString",
                ____inValueSet: [// An unhandled/unexpected error occurred when an external actor called CellProcessor.act.
                // Or, a closure scope inside of a ControllerAction calls OPC.act in an async callback.
                "action-error", // An unhandled/unexpected error occurred during OPC._evaluate cell plane evaluation that
                // was undertaken in response to some external actor request to CellProcessor.act/OPC.act.
                "evaluation-error"]
              },
              badResponse: {
                ____accept: "jsObject"
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
      var actorName = "[".concat(this.filterDescriptor.operationID, "::").concat(this.filterDescriptor.operationName, "]");
      console.log("".concat(actorName, " processing OPC cell plane error via Cell Process Manager process.")); // This action is called by the CellProcessor's Cell Process Manager process that does
      // not know our process coordinates. So, request_.context.apmBindingPath === "~" (CPM).

      var hackLibResponse = hackLib.getStatus.request({
        ocdi: request_.context.ocdi,
        act: request_.context.act
      });

      if (hackLibResponse.error) {
        errors.push(hackLibResponse.error);
        break;
      }

      var kernelStatus = hackLibResponse.result;

      if (kernelStatus.cellMemory.__apmiStep !== "kernel-service-ready" && !kernelStatus.cellMemory.bootstrapFailureStep) {
        // The app client kernel process is still booting and the derived app client process has not yet been started.
        // We'll let the kernel APM know about this.
        var ocdResponse = request_.context.ocdi.writeNamespace({
          apmBindingPath: kernelStatus.kernelProcess.apmBindingPath,
          dataPath: "#.bootstrapFailureStep"
        }, kernelStatus.cellMemory.__apmiStep);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }
      }

      var messageBody = request_.actionRequest.holistic.app.kernel._private.cpmCellPlaneErrorNotification; // TODO: We will want to do some things here at the app client kernel level as it's
      // not necessarily the case that this error is occurring when the kernel is even active
      // (and if it is then what we do depends on what state the app client kernel is in).

      var lifecyclePhase = kernelStatus.cellMemory.__apmiStep === "kernel-service-ready" ? "app-client-runtime" : "app-client-boot";

      if (lifecyclePhase === "app-client-boot") {
        request_.context.act({
          actorName: actorName,
          actorTaskDescription: "Logging error to app client kernel console display.",
          actionRequest: {
            holistic: {
              app: {
                client: {
                  kernel: {
                    _private: {
                      rootDisplayCommand: {
                        message: "Holistic app client kernel boot has failed!"
                      }
                    }
                  }
                }
              }
            }
          }
        });
        request_.context.act({
          actorName: actorName,
          actorTaskDescription: "Logging error to app client kernel console display.",
          actionRequest: {
            holistic: {
              app: {
                client: {
                  kernel: {
                    _private: {
                      rootDisplayCommand: {
                        command: "hide"
                      }
                    }
                  }
                }
              }
            }
          }
        });
      } // Notify the derived app client process that there's been a cell plane error.


      var errorNotificationActResponse = request_.context.act({
        actorName: actorName,
        actorTaskDescription: "Attempting to notifiy derived app client process that a cell plane error has occured.",
        actionRequest: {
          holistic: {
            app: {
              client: {
                lifecycle: {
                  error: {
                    lifecyclePhase: lifecyclePhase,
                    kernelProcessStep: kernelStatus.cellMemory.__apmiStep,
                    errorType: messageBody.errorType,
                    badResponse: messageBody.badResponse
                  }
                }
              }
            }
          }
        }
      });
    } // end while


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