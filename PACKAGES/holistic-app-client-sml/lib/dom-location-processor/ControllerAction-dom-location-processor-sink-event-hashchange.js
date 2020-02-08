"use strict";

// ControllerAction-dom-client-event-sink-hashchange.js
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.ControllerAction({
  id: "peTmTek_SB64-ofd_PSGjg",
  name: "DOM Client Location Processor: 'hashchange'",
  description: "Accepts info about the 'hashchange' event and encapsulates the details of updating the DOM Client Locaiton Processor OPM memory to record the event details.",
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
                notifyEvent: {
                  ____types: "jsObject",
                  hashchange: {
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
      inBreakScope = true; // Resolve the full path the DOM Location Processor _private namespace.

      var rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        opmBindingPath: request_.context.opmBindingPath,
        dataPath: "#._private"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var pathPrivate = rpResponse.result; // Read the DOM Location Processor's _private OCD namespace.

      var ocdResponse = request_.context.ocdi.readNamespace(pathPrivate);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var _private = ocdResponse.result;
      _private.routerEventCount++;

      _private.locationHistory.push({
        eventSource: !_private.routerEventCount ? "initial" : "user_route",
        href: location.href,
        // capture the entire href serialization from the location object
        routerEventNumber: _private.routerEventCount
      });

      ocdResponse = request_.context.ocdi.writeNamespace(pathPrivate, _private);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});