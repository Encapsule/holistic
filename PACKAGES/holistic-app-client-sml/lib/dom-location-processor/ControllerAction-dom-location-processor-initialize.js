"use strict";

// ControllerAction-init-dom-client-hash-router.js
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.ControllerAction({
  id: "TlGPCf7uSf2cZMGZCcU85A",
  name: "DOM Client Location Proccessor: Initialize",
  description: "Adds a listener to the brower's 'hashchange' event and redirects subsequent event callbacks to the ControllerAction peTmTek_SB64-ofd_PSGj.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      app: {
        ____types: "jsObject",
        client: {
          ____types: "jsObject",
          sml: {
            ____types: "jsObject",
            actions: {
              ____types: "jsObject",
              DOMLocationProcessor: {
                ____types: "jsObject",
                initialize: {
                  ____accept: "jsBoolean",
                  ____inValueSet: [true]
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
      inBreakScope = true;
      var endsWithHash = location.href.endsWith("#");
      var hashLength = location.hash ? location.hash.length : 0;
      var addHash = !(hashLength || endsWithHash);

      if (addHash) {
        // Always display the hash # delimiter between the server href and client-only hashroute portions of the href string.
        location.replace("".concat(location.href, "#"));
      }

      window.addEventListener("hashchange", function (event_) {
        event_.preventDefault(); // When we receive the hashchange event we simply read some information
        // from the DOM (the message), and notify the DOM Location Processor
        // model by calling OPC.act. Here, this function is the actor
        // (in this case an actor external to OPC) that is affecting some
        // change to the overall state of the system modeled by the OPC.

        var actResponse = request_.context.act({
          opmBindingPath: request_.context.opmBindingPath,
          actorName: "DOM hashchange Event Handler",
          actorTaskDescription: "Notifying the DOM Location Processor of hashchange/location update.",
          actionRequest: {
            holistic: {
              app: {
                client: {
                  sml: {
                    actions: {
                      DOMLocationProcessor: {
                        notifyEvent: {
                          hashchange: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }, false);

        if (actResponse.error) {
          throw new Error(actResponse.error);
        }
      });
      /*
       // https://stackoverflow.com/questions/821011/prevent-a-webpage-from-navigating-away-using-javascript
      window.addEventListener("beforeunload", (event_) => {
          event_.preventDefault();
          event_.returnValue = "";
      }, false);
       */

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});