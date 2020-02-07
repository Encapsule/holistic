"use strict";

// ControllerAction-dom-client-event-sink-hashchange.js
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.ControllerAction({
  id: "peTmTek_SB64-ofd_PSGjg",
  name: "DOM Client Location Processor: 'hashchange'",
  description: "Accepts info about the 'hashchange' event and encapsulates the details of updating the DOM Client Locaiton Processor OPM memory to record the event details.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      sml: {
        ____types: "jsObject",
        actions: {
          ____types: "jsObject",
          ClientDOMLocationProcessor: {
            ____types: "jsObject",
            sinkEvent: {
              ____types: "jsObject",
              hashchangeEventDescriptor: {
                // TODO: Complete this
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
    return {
      error: null
    };
  }
});