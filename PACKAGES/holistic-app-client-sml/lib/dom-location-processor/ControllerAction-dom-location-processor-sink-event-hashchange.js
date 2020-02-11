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
      inBreakScope = true;
      console.log("Current value of location.href is '".concat(location.href, "'")); // Resolve the full path the DOM Location Processor outputs namespace.

      var rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        opmBindingPath: request_.context.opmBindingPath,
        dataPath: "#.outputs"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var pathOutputs = rpResponse.result;
      var ocdResponse = request_.context.ocdi.readNamespace(pathOutputs);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var outputs = ocdResponse.result;

      if (outputs.currentRoute && outputs.currentRoute.href === location.href) {
        console.log("This event will be ignored. It was induced by the DOM Location Processor's init action replacing the server's non-hashroute with the default, #.");
        break;
      } // Resolve the full path the DOM Location Processor _private namespace.


      rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        opmBindingPath: request_.context.opmBindingPath,
        dataPath: "#._private"
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var pathPrivate = rpResponse.result; // Read the DOM Location Processor's _private OCD namespace.

      ocdResponse = request_.context.ocdi.readNamespace(pathPrivate);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var _private = ocdResponse.result;
      var routerEventDescriptor = {
        actor: _private.routerEventCount === _private.lastOutputEventIndex ? _private.routerEventCount ? "user" : "server" : "app",
        href: location.href,
        // capture the entire href serialization from the location object
        routerEventNumber: _private.routerEventCount
      };

      _private.locationHistory.push(routerEventDescriptor);

      _private.routerEventCount++; // total hashchange events

      if (_private.routerEventCount > _private.lastOutputEventIndex) {
        // Always re-written in the epilogue.
        _private.lastOutputEventIndex++;
        _private.updateObservers = true; // Resolve the full path the DOM Location Processor outputs.currentRoute namespace.

        var _rpResponse = holarchy.ObservableControllerData.dataPathResolve({
          opmBindingPath: request_.context.opmBindingPath,
          dataPath: "#.outputs.currentRoute"
        });

        if (_rpResponse.error) {
          errors.push(_rpResponse.error);
          break;
        }

        var pathCurrentRoute = _rpResponse.result; // Write the current route descriptor to the output.

        var _ocdResponse = request_.context.ocdi.writeNamespace(pathCurrentRoute, routerEventDescriptor);

        if (_ocdResponse.error) {
          errors.push(_ocdResponse.error);
          break;
        }
      }

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