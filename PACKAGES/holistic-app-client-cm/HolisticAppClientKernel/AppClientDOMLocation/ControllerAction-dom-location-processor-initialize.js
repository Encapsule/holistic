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
          cm: {
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

    var _loop = function _loop() {
      inBreakScope = true;
      var endsWithHash = location.href.endsWith("#");
      var hashLength = location.hash ? location.hash.length : 0;
      var addHash = !(hashLength || endsWithHash);
      var ignoreEvent = false;

      if (addHash) {
        // Always display the hash # delimiter between the server href and client-only hashroute portions of the href string.
        var newLocation = "".concat(location.href, "#");
        console.log("> DOMLocationProcessor is setting the replacing the DOM location with \"".concat(newLocation, "\"."));
        location.replace(newLocation);
        ignoreEvent = true;
      }

      window.addEventListener("hashchange", function (event_) {
        event_.preventDefault();

        if (!ignoreEvent) {
          // If this act request fails, the app client process will get notified via its error lifecycle action.
          request_.context.act({
            apmBindingPath: request_.context.apmBindingPath,
            actorName: "DOMLocationProcessor:hashchange Event Handler",
            actorTaskDescription: "Notifying the DOM Location Processor of hashchange/location update.",
            actionRequest: {
              holistic: {
                app: {
                  client: {
                    cm: {
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
        } else {
          console.log("> DOMLocationProcessor is dropping the first hashchange event because we caused it by replacing the DOM location during initialization.");
          ignoreEvent = false; // this is one-shot flag that's set true iff addHash
        }
      });
      /*
       // https://stackoverflow.com/questions/821011/prevent-a-webpage-from-navigating-away-using-javascript
      window.addEventListener("beforeunload", (event_) => {
          event_.preventDefault();
          event_.returnValue = "";
      }, false);
       */

      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});