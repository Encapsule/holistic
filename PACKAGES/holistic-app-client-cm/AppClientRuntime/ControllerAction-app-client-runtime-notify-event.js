"use strict";

// ControllerAction-app-client-runtime-notify-event.js
module.exports = {
  id: "h-auSE-OSP2TG1jh_3EQ1Q",
  name: "Holistic App Client Runtime Receive DOM Event",
  description: "ControllerAction that signals the HolisticAppClientRuntime CM that the window.onload event has occurred.",
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
    }
  },
  actionResultSpec: {
    ____accept: "jsUndefined"
  },
  // action return no response.result
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.actionRequest.holistic.app.client.cm.HolisticAppRuntime._private.notifyEvent;

      switch (message.eventName) {
        case "window.onload":
          // We just need to signal the HolisticAppClientRuntime cell process that the window has loaded.
          var actionResponse = request_.context.act({
            actorName: "HolisticAppClientRuntime External DOM Event Notify",
            actorTaskDescription: "Inform the HolisticAppClientRutime cell process that the window has loaded.",
            actionRequest: {
              holarchy: {
                cm: {
                  actions: {
                    ocd: {
                      setBooleanFlag: {
                        path: "#.PPL45jw5RDWSMNsB97WIWg._private.windowLoaded"
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: request_.context.apmBindingPath
          });

          if (actionResponse.error) {
            // TODO: Report this back to the app kernel via an action that needs to get written soon.
            console.error(actionResponse.error);
          }

          break;

        default:
          errors.push("Action implementation does not yet support event name '".concat(message.eventName, "'."));
          break;
      }

      break;
    }

    if (errors.length) {
      response.error = join(" ");
    }

    return response;
  }
};