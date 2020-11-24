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
  href: {
    ____accept: "jsString"
    /* copy of location.href */

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
    // v0.0.48-kyanite
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
        nextStep: "dom-location-initialize"
      }]
    },
    "dom-location-initialize": {
      description: "Registering hashchange DOM event callback.",
      actions: {
        exit: [{
          holistic: {
            app: {
              client: {
                cm: {
                  actions: {
                    DOMLocationProcessor: {
                      initialize: true
                    }
                  }
                }
              }
            }
          }
        }] // exit : [ { holistic: { app: { client: { cm: { actions: { DOMLocationProcessor: { notifyEvent: { hashchange: true } } } } } } } } ]

      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "dom-location-wait-kernel-ready"
      }]
    },
    "dom-location-wait-kernel-ready": {
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
        nextStep: "dom-location-signal-initial-hashroute"
      }]
    },
    "dom-location-signal-initial-hashroute": {
      description: "Inform the app client process of the initial hashroute assignment inherited from the HTTP request URL. Note, that it is up to the app client process to decide what to do with this information specifically wrt to active cells etc.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "dom-location-wait-hashchange-event"
      }],
      actions: {
        exit: [{
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
        }]
      }
    },
    "dom-location-wait-hashchange-event": {
      description: "Waiting for DOM hashchange event.",
      transitions: [{
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isBooleanFlagSet: {
                    path: "#.private.updateObservers"
                  }
                }
              }
            }
          }
        },
        nextStep: "dom-location-signal-update"
      }]
    },
    "dom-location-signal-update": {
      description: "The observable browser location has been updated. Information about the current location, and who set it is available in this model's output namespace.",
      // v0.0.48-kyanite this is changing...
      actions: {
        exit: [{
          holarchy: {
            cm: {
              actions: {
                ocd: {
                  clearBooleanFlag: {
                    path: "#.private.updateObservers"
                  }
                }
              }
            }
          }
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "dom-location-wait-hashchange-event"
      }]
    }
  }
};