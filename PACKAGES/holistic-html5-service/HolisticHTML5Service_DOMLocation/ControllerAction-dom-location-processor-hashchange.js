"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ControllerAction-dom-client-event-sink-hashchange.js
var holarchy = require("@encapsule/holarchy");

var dlpLib = require("./lib");

module.exports = new holarchy.ControllerAction({
  id: "peTmTek_SB64-ofd_PSGjg",
  name: "DOM Client Location Processor: 'hashchange'",
  description: "Accepts info about the 'hashchange' event and encapsulates the details of updating the DOM Client Locaiton Processor APM memory to record the event details.",
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
              notifyEvent: {
                ____types: "jsObject",
                hashchange: {
                  ____types: "jsObject",
                  event: {
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
  // action returns no response.result
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var libResponse = dlpLib.getStatus.request(request_.context);

      if (libResponse.error) {
        errors.push(libResponse.error);
        break;
      }

      var _libResponse$result = libResponse.result,
          cellMemory = _libResponse$result.cellMemory,
          cellProcess = _libResponse$result.cellProcess;
      libResponse = dlpLib.parseLocation.request({
        actor: "user",
        href: window.location.href,
        routerEventNumber: cellMemory.locationHistory.length + 1
      });

      if (libResponse.error) {
        errors.push(libResponse.error);
        break;
      }

      ;
      var routerEventDescriptor = libResponse.result;
      cellMemory.locationHistory.push(routerEventDescriptor);
      var actResponse = request_.context.act({
        actorName: "DOMLocationProcessor",
        actionTaskDescription: "Informing the app client service of udpate to the current hashroute location data.",
        actionRequest: {
          CellProcessor: {
            cell: {
              delegate: {
                cell: cellMemory.derivedAppClientProcessCoordinates,
                actionRequest: {
                  holistic: {
                    app: {
                      client: {
                        lifecycle: {
                          hashroute: _objectSpread({}, routerEventDescriptor)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        apmBindingPath: request_.context.apmBindingPath
      });

      if (actResponse.error) {
        errors.push(actResponse.error);
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