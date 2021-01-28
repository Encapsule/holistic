"use strict";

// AbstractProcessModel-client-hash-route-location-processor.js
var routerEventDescriptorSpec = require("./lib/iospecs/router-event-descriptor-spec");

var apmClientHashRouteLocationProcessor = module.exports = {
  id: "OWLoNENjQHOKMTCEeXkq2g",
  name: "Holistic App Client Kernel: DOM Location Processor",
  description: "Hooks and monitors DOM location events and publishes them via an observable frame latch. Also, provids programmatic control over DOM location.",
  ocdDataSpec: {
    ____label: "DOM Location Processor Cell",
    ____types: "jsObject",
    ____defaultValue: {},
    // v0.0.48-kyanite - HolisticHTML5Service kernel needs to tell us where the derived app service cell process is located in the cellplane
    // so that DOM Location Processor cell process may relay information to it directly via its actions lifecycle actions.
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
    httpResponseCode: {
      ____label: "HolisticNodeService HTTP Response Code",
      ____description: "Value returned to HolisticHTML5Service_Kernel by HolisticNodeService instance indicating pass/fail of HTML5 document request. Used to determine how to initialize the DOMLocation process for use by the derived HTML5 service logic.",
      ____accept: "jsNumber",
      ____defaultValue: -1 // Not a valid HTTP error code. Used to indicate that the process has not yet been configured by the HolisticHTML5Service_Kernel process.

    },
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
    }
  },
  // ~.ocdDataSpec
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
      description: "Performs first post-activation cell initialization on exit from this process step.",
      actions: {
        exit: [// Parses the initial location.href and writes the initial routerEventDescriptor object to the cell's private locationHistory array.
        {
          holistic: {
            app: {
              client: {
                domLocation: {
                  _private: {
                    initialize: {}
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
        nextStep: "dom-location-wait-kernel-config"
      }]
    },
    "dom-location-wait-kernel-config": {
      description: "Blocks and waits for the HTML5 kernel process to provide additional configuration information needed to determine runtime policy of this cell.",
      transitions: [{
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  compare: {
                    values: {
                      a: {
                        path: "#.httpResponseCode"
                      },
                      b: {
                        value: -1
                      },
                      operator: ">"
                    }
                  }
                }
              }
            }
          }
        },
        nextStep: "dom-location-configured"
      }]
    },
    "dom-location-configured": {
      description: "got here"
    },

    /*
    "dom-location-initialize": {
        description: "Registering hashchange DOM event callback.",
        transitions: [ { transitionIf: { always: true }, nextStep: "dom-location-processor-wait-kernel-ready" } ],
        actions: {
             // Analyze and parse the current location.href into normalized base URI pathname. And, if present the current hashroute fragment.
            // Take no other action wrt hooking the DOM hashchange event at this point; we do not yet know the HTTP response disposition
            // returned by HolisticNodeService instance...
            exit: [ { holistic: { app: { client: { domLocation: { _private: { initialize: true } } } } } } ]
        }
    },
    */
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
                      hashchange: {
                        event: "intial hashroute synthetic event trigggered by DOM Location Processor APM"
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