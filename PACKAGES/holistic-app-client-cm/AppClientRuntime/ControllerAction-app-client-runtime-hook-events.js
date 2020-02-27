"use strict";

// ControllerAction-app-client-hook-events.js
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.ControllerAction({
  id: "JwE4LMvpRGC3Jsg1RDjJ1Q",
  name: "Holistic App Client Hook Events",
  description: "Hooks DOM events on behalf of the Holistic App Client Runtime APM.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      app: {
        ____types: "jsObject",
        client: {
          ____types: "jsObject",
          cm: {
            ____types: "jsObject",
            HolisticAppRuntime: {
              ____types: "jsObject",
              actions: {
                ____types: "jsObject",
                _private: {
                  ____types: "jsObject",
                  hookEvents: {
                    ____accept: "jsBoolean",
                    ____inValueSet: [true]
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsUndefined"
  },
  // action returns no response.result
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true; // Hook the window.onload event.

      window.onload = function (event_) {
        var actResponse = request_.context.act({
          apmBindingPath: request_.context.apmBindingPath,
          actorName: "DOM Event window.onload",
          actorTaskDescription: "Signal that the window.onload event has fired.",
          actionRequest: {
            holistic: {
              app: {
                client: {
                  cm: {
                    HolisticAppRuntime: {
                      _private: {
                        notifyEvent: {
                          eventName: "window.onload",
                          eventData: event_
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        });

        if (actResponse.error) {
          // TODO: We need a general way to report external actor failures back
          // to the holistic app client kernel so that it can ensure that the
          // derived application is made aware of the issue(s).
          console.error("External actor failed to call DOM Event window.onload handler."); // throw new Error(actResponse.error);
        }
      }; // end window.onload event handler callback function


      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});