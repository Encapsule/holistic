"use strict";

// ControllerAction-app-client-runtime-notify-event.js
var holarchy = require("@encapsule/holarchy");

var controllerAction = new holarchy.ControllerAction({
  id: "h-auSE-OSP2TG1jh_3EQ1Q",
  name: "Holistic App Client Kernel: Receive DOM Event",
  description: "ControllerAction that signals the Holistic App Client Kernel process of the occurance of a previously-hooked DOM event.",
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
              notifyEvent: {
                ____types: "jsObject",
                eventName: {
                  ____types: "jsString",
                  ____inValueSet: ["window.onload"]
                },
                eventData: {
                  ____opaque: true
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
      var messageBody = request_.actionRequest.holistic.app.client.kernel._private.notifyEvent;
      var ocdResponse = void 0;

      switch (messageBody.eventName) {
        case "window.onload":
          // We just need to signal the HolisticAppClientRuntime cell process that the window has loaded.
          ocdResponse = request_.context.ocdi.writeNamespace({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: "#.windowLoaded"
          }, true);

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          ocdResponse = request_.context.ocdi.writeNamespace({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: "#.windowLoadTimeMs"
          }, Math.round(messageBody.eventData.timeStamp));

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          console.log("> The browser tab reports that so far it has taken ".concat(messageBody.eventData.timeStamp, " ms to download and parse this HTML5 document + its referenced resources."));
          break;

        default:
          errors.push("Internal error: unhandled event name \"{messageBody.eventName}\".");
          break;
      } // end switch


      break;
    }

    if (errors.length) {
      response.error = join(" ");
    }

    return response;
  }
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;