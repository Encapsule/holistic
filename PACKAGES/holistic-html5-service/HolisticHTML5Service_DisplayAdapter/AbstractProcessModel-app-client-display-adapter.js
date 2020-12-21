"use strict";

/*

  Holistic App Client Kernel: d2r2/React Client Display Adapter

  d2r2/React Client Display Adapter process provides generic routing of @encapsule/d2r2 request object that represents
  an application/service command to change entirely, or partially update the layout of the HTML5 page view currently
  visible to the user.

  This process is always created as an owned singleton process by the Holistic App Client Kernel process.

*/
var holarchy = require("@encapsule/holarchy");

var apm = new holarchy.AbstractProcessModel({
  id: "IxoJ83u0TXmG7PLUYBvsyg",
  name: "Holistic Client App Kernel: d2r2/React Client Display Adapter",
  description: "Manages the details of initializing and dynamically updating the client application view (DOM display surface) via @encapsule/d2r2 and Facebook React.",
  ocdDataSpec: {
    ____label: "Holistic App Client Kernel: d2r2/React Client Display Adapter Memory",
    ____description: "Shared memory definition for the d2r2/React Client Display Adapter OPM.",
    ____types: "jsObject",
    toJSON: {
      ____types: "jsFunction",
      ____defaultValue: function ____defaultValue() {
        return {
          tempState: true
        };
      }
    },
    config: {
      ____types: ["jsUndefined", // Initially undefined upon process activation.
      "jsObject" // Set holistic.app.client.display._private.loadConfig action
      ],
      targetDOMElementID: {
        ____accept: "jsString"
      },
      targetDOMElement: {
        ____label: "d2r2 Target DOM Element",
        ____description: "A reference to the DOM element to be be managed by the d2r2/React Client Display Adapter (obtained with document.getElementById).",
        ____opaque: true // This is an "[object HTMLDivElement]" type not natively supported by filter.

      },
      ComponentRouter: {
        ____label: "d2r2 <ComponentRouter/> React Component",
        ____opaque: true // This is a d2r2 <ComponentRouter/> React class used to dynamically update the display layout.

      }
    },
    displayUpdateCount: {
      ____accept: "jsNumber",
      ____defaultValue: -1 // Default value -1 indicates that no client-side render has occurred; the contents of the target DIV was pre-rendered by the app server process.

    }
  },
  // ocdDataSpec
  steps: {
    uninitialized: {
      description: "Default process start step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "display-adapter-load-config"
      }]
    },
    "display-adapter-load-config": {
      description: "d2r2/React display adapter cell is loading construction config into its cell memory.",
      actions: {
        exit: [{
          holistic: {
            app: {
              client: {
                display: {
                  _private: {
                    loadConfig: {}
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
        nextStep: "display-adapter-wait-initial-layout"
      }]
    },
    "display-adapter-wait-initial-layout": {
      description: "d2r2/React Client Display Adapter is waiting for the app client kernel to set the display's initial layout.",
      transitions: [{
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  compare: {
                    values: {
                      a: {
                        value: 0
                      },
                      b: {
                        path: "#.displayUpdateCount"
                      },
                      operator: "==="
                    }
                  }
                }
              }
            }
          }
        },
        nextStep: "display-adapter-service-ready"
      }]
    },
    "display-adapter-service-ready": {
      description: "d2r2/React Client Display Adapter has been initialized, configured, and ready to accept layout update requests from the tab service's app process runtime."
    }
  } // steps

});

if (!apm.isValid()) {
  throw new Error(apm.toJSON());
}

module.exports = apm;