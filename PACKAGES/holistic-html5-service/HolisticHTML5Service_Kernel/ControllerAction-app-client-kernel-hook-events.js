"use strict";

// ControllerAction-app-client-hook-events.js
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.ControllerAction({
  id: "JwE4LMvpRGC3Jsg1RDjJ1Q",
  name: "Holistic App Client Kernel: Hook DOM Events",
  description: "Registers DOM event handlers on behalf of the Holistic App Client Kernel process needed to track application lifespan and provide core services.",
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
              hookDOMEvents: {
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
      inBreakScope = true; // Hook the window.onload event.

      window.onload = function (event_) {
        // We are now executing in the context of a DOM event handler callback.
        var actResponse = request_.context.act({
          apmBindingPath: request_.context.apmBindingPath,
          actorName: "DOM Event window.onload",
          actorTaskDescription: "Signal that the window.onload event has fired.",
          actionRequest: {
            holistic: {
              app: {
                client: {
                  kernel: {
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
        });
        /*
          As of v0.0.47-alexandrite we can (as required) look at actResponse.error
          to determine if the action request failed. And, if !actionResponse.error then
          we could look at actionResponse.actionResult.lastEvaluation.summary.counts.errors
          to determine if post-action cell plane evaluation occurred w/out error.
          This information is pertinent, if for example, we needed to make additional
          external actor requests on CellProcessor in this context (that we might not
          want to make if a previous external action request failed). However, we are
          not concerned that _any_ failure in the above action request call went unnoticed;
          holistic-v0.0.47 ensures delivery of a notification-via-action-request to the derived
          holistic app client process for all transport errors regardless of when, where, and in
          what execution context they occur.
           And, so because we have no more actions to perform here we are now done.
        */
      }; // end window.onload event handler callback function


      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});