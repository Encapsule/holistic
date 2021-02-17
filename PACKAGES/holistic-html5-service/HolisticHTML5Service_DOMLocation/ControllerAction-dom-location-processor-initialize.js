"use strict";

// ControllerAction-dom-location-processor-initialize.js
var holarchy = require("@encapsule/holarchy");

var queryString = require("query-string");

var url = require("url");

var dlpLib = require("./lib");

(function () {
  var action = new holarchy.ControllerAction({
    id: "TlGPCf7uSf2cZMGZCcU85A",
    name: "HolisticHTML5Service_DOMLocation Initialize",
    description: "Adds a listener to the brower's 'hashchange' event and redirects subsequent event callbacks to the ControllerAction peTmTek_SB64-ofd_PSGj.",
    actionRequestSpec: {
      ____types: "jsObject",
      holistic: {
        ____types: "jsObject",
        app: {
          ____types: "jsObject",
          client: {
            ____types: "jsObject",
            domLocation: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                initialize: {
                  ____accept: "jsObject"
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
        /* I THINK WE DO NOT EVEN NEED INIT
         let libResponse = dlpLib.getStatus.request(request_.context);
        if (libResponse.error) {
            errors.push(libResponse.error);
            break;
        }
        const { cellMemory, cellProcess } = libResponse.result;
         libResponse = dlpLib.parseLocation.request({
            actor: "server",
            href: window.location.href,
            routerEventNumber: 0,
        });
        if (libResponse.error) {
            errors.push(libResponse.error);
            break;
        }
        const routerEventDescriptor = libResponse.result;
         let actResponse = request_.context.act({
            actorName: "DOMLocationProcessor",
            actionTaskDescription: "Write the new router event descriptor to our ObservableValue output mailbox.",
            actionRequest: {
                holarchy: {
                    common: {
                        ObservableValue: {
                            writeValue: {
                                value: routerEventDescriptor,
                                path: "#.outputs.domLocation" // Relative to apmBindingPath
                            }
                        }
                    }
                }
            },
            apmBindingPath: request_.context.apmBindingPath // Our binding path
        });
         */

        /* ----------------------------------------------------------------
           v0.0.48-kyanite
           SAVE THIS - this is the actual spanner in the works that blocks the user from navigating away or
           to another domain or closing the browser tab. But, it's very tricky to use it correctly; there
           needs to be a whole app-level protocol based on some sort of model of the user's browser tab
           session that toggles this mechanism on/off as appropriate. We will bring this back into the
           mix shortly....
            // https://stackoverflow.com/questions/821011/prevent-a-webpage-from-navigating-away-using-javascript
           window.addEventListener("beforeunload", (event_) => {
           event_.preventDefault();
           event_.returnValue = "";
           }, false); // <- This last parameter is deprecated as a Boolean. It's not an options object per MDN docs.
            ^^^ SAVE THIS
           ---------------------------------------------------------------- */

        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON);
  }

  module.exports = action;
})();