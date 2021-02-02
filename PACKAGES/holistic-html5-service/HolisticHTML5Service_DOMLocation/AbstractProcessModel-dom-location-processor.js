"use strict";

// AbstractProcessModel-client-hash-route-location-processor.js
var arccore = require("@encapsule/arccore");

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
    locationHistory: {
      ____label: "Location History Array",
      ____description: "Array written by the sink hashchange event action for every observed change in location.",
      ____types: "jsArray",
      ____defaultValue: [],
      routerEventDescriptor: routerEventDescriptorSpec
    },
    observableValues: {
      ____label: "Observable Values",
      ____types: "jsObject",
      ____defaultValue: {},
      domLocation: {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: arccore.identifier.irut.fromReference("HolisticHTML5Service_DOMLocation.ObservableValue.AbstractProcessModel.routerEventDescriptor").result
        }
      }
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
      description: "The HolisticHTML5Service_DOMLocation process has been configured.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "dom-location-ready"
      }]
    },
    "dom-location-ready": {
      description: "The DOM Location Processor is active and waiting from action requests from the app. And, hashchange events caused by user interaction w/the browser."
    }
  }
};