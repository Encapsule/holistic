"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// AbstractProcessModel-client-hash-route-location-processor.js
var routerEventDescriptorSpec = {
  ____types: "jsObject",
  actor: {
    ____accept: "jsString",
    ____inValueSet: ["server", // href value set by the app server actor (usually a copy of HTTP request URL from the user actor's agent, the browser).
    "user", // User actor set the current href value via browser user agent forward/back navigation. Or, explicit modification of browser location bar input value.
    "app" // Application actor set the current href value by calling a DOM Location Processor controller action.
    ]
  },
  hashrouteString: {
    ____accept: "jsString"
  },
  // This is the string beginning with the # character as we specified in the user request. Or, was added by the app client kernel during boot.
  hashrouteParse: {
    ____types: "jsObject",
    pathname: {
      ____label: "Secondary Resource Request Pathname",
      ____description: "Use this string as the primary key to query app metadata for hashroute descriptor.",
      ____accept: "jsString"
    },
    path: {
      ____label: "Secondary Resource Request Path",
      ____description: "Same as above except that it includes any URL-encoded query params. In for debugging only but not really useful vs hashrouteQueryParse.",
      ____accept: "jsString"
    },
    search: {
      ____label: "Secondary Resource Reqeust Search Params String",
      ____accept: ["jsString", "jsNull"]
    },
    query: {
      ____label: "Secondary Resource Request Query Params String",
      ____accept: ["jsString", "jsNull"]
    }
  },
  hashrouteQueryParse: {
    ____types: "jsObject",
    ____asMap: true,
    paramName: {
      ____accept: ["jsString", "jsNull"
      /*e.g. #x?foo --> foo: null */
      ]
    }
  },
  routerEventNumber: {
    ____accept: "jsNumber"
  }
};
var apmClientHashRouteLocationProcessor = module.exports = {
  id: "OWLoNENjQHOKMTCEeXkq2g",
  name: "Holistic App Client Kernel: DOM Location Processor",
  description: "Hooks and monitors DOM location events and publishes them via an observable frame latch. Also, provids programmatic control over DOM location.",
  ocdDataSpec: {
    ____label: "DOM Location Processor Cell",
    ____types: "jsObject",
    ____defaultValue: {},
    // v0.0.48-kyanite - app client kernel needs to tell us where the derived app client cell process is located in the cellplane
    // so that DOM Location Processor cell process can communicate with it via actions.
    derivedAppClientProcessCoordinates: {
      ____label: "Derived App Client Runtime Process Coordinates",
      ____description: "The cell process coordinates to be used to launch the derived app client cell process.",
      ____types: "jsObject",
      apmID: {
        ____accept: "jsString"
      },
      instanceName: {
        ____accept: "jsString",
        ____defaultValue: "singleton"
      }
    },
    "private": {
      ____types: "jsObject",
      ____defaultValue: {},
      routerEventCount: {
        ____label: "Router Event Count",
        ____description: "A count of the total number of observed changes of the DOM location object induced by all actors.",
        ____accept: "jsNumber",
        ____defaultValue: 0
      },
      lastOutputEventIndex: {
        ____label: "Last Output Index",
        ____description: "A count of the total number of routerEventDescriptor objects written to the model's output.",
        ____accept: "jsNumber",
        ____defaultValue: 0
      },
      // v0.0.48-kyanite
      // TODO: We are currently maintaining an unbounded array of routerEventDescriptors.
      // So, we need to study this a bit and understand if we need the history at all.
      // If yes, how many entries max. Do we actions to allow the app to query and reset this info?
      locationHistory: {
        ____label: "Location History Array",
        ____description: "Array written by the sink hashchange event action for every observed change in location.",
        ____types: "jsArray",
        ____defaultValue: [],
        routerEventDescriptor: routerEventDescriptorSpec
      },
      updateObservers: {
        ____label: "Update Observers Flag",
        ____description: "A Boolean flag set by DOM Location Processor actions to indicate to the DOM Location Processor model that it should transition to update step.",
        ____accept: "jsBoolean",
        ____defaultValue: false
      }
    },
    outputs: {
      ____types: "jsObject",
      ____defaultValue: {},
      currentRoute: _objectSpread(_objectSpread({}, routerEventDescriptorSpec), {}, {
        ____types: ["jsNull", "jsObject"],
        ____defaultValue: null
      })
    }
  },
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "dom-location-processor-initialize"
      }]
    },
    "dom-location-processor-initialize": {
      description: "Registering hashchange DOM event callback.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "dom-location-processor-wait-kernel-ready"
      }],
      actions: {
        exit: [{
          holistic: {
            app: {
              client: {
                domLocation: {
                  _private: {
                    initialize: true
                  }
                }
              }
            }
          }
        }]
      }
    },
    "dom-location-processor-wait-kernel-ready": {
      description: "Waiting on the kernel to reach its active state. After that point, we start actively communicating directly with the derived app client process.",
      transitions: [{
        transitionIf: {
          CellProcessor: {
            cell: {
              query: {
                inStep: {
                  apmStep: "kernel-service-ready"
                }
              },
              cellCoordinates: {
                apmID: "PPL45jw5RDWSMNsB97WIWg"
                /* "Holistic App Client Kernel Process" */

              }
            }
          }
        },
        nextStep: "dom-location-processor-signal-initial-hashroute"
      }]
    },
    "dom-location-processor-signal-initial-hashroute": {
      description: "Inform the app client process of the initial hashroute assignment inherited from the HTTP request URL. Note, that it is up to the app client process to decide what to do with this information specifically wrt to active cells etc.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "dom-location-processor-active"
      }],
      actions: {
        exit: [{
          holistic: {
            app: {
              client: {
                domLocation: {
                  _private: {
                    notifyEvent: {
                      hashchange: true
                    }
                  }
                }
              }
            }
          }
        }]
      }
    },
    "dom-location-processor-active": {
      description: "The DOM Location Processor is active and waiting from action requests from the app. And, hashchange events caused by user interaction w/the browser."
    }
    /*
    "dom-location-wait-hashchange-event": {
        description: "Waiting for DOM hashchange event.",
        transitions: [
            {
                transitionIf: { holarchy: { cm: { operators: { ocd: { isBooleanFlagSet: { path: "#.private.updateObservers" } } } } } },
                nextStep: "dom-location-signal-update"
            }
        ]
    },
     "dom-location-signal-update": {
        description: "The observable browser location has been updated. Information about the current location, and who set it is available in this model's output namespace.",
        // v0.0.48-kyanite this is changing...
        actions: { exit: [ { holarchy: { cm: { actions: { ocd: { clearBooleanFlag: { path: "#.private.updateObservers" } } } } } } ] },
        transitions: [ { transitionIf: { always: true }, nextStep: "dom-location-wait-hashchange-event" } ]
    }
    */

  }
};