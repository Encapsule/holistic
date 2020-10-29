"use strict";

var holarchy = require("@encapsule/holarchy");

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
            opcCellPlaneErrorNotification: {
              ____types: "jsObject",
              errorType: {
                ____accept: "jsString",
                ____inValueSet: ["action-error", "transport-error"]
              },
              opcActResponse: {
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
      var actorName = "[".concat(this.operationID, "::").concat(this.operationName, "]");
      console.log("".concat(actorName, " processing cell plane error notification from OPC.")); // TODO: We will want to do some things here at the app client kernel level as it's
      // not necessarily the case that this error is occurring when the kernel is even active
      // (and if it is then what we do depends on what state the app client kernel is in).
      // For now, let's just notify the derived app client process that there's been a cell plane error.

      var messageBody = request_.actionRequest.holistic.app.kernel._private.opcCellPlaneErrorNotification;
      var errorNotificationActResponse = request_.context.act({
        actorName: actorName,
        actorTaskDescription: "Attempting to notifiy derived app client process that a cell plane error has occured.",
        actionRequest: {
          holistic: {
            app: {
              client: {
                lifecycle: {
                  error: messageBody
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