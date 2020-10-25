"use strict";

/*

  Holistic App Client Kernel: d2r2/React Client Display Adaptor

  d2r2/React Client Display Adaptor process provides generic routing of @encapsule/d2r2 request object that represents
  an application/service command to change entirely, or partially update the layout of the HTML5 page view currently
  visible to the user.

  This process is always created as an owned singleton process by the Holistic App Client Kernel process.

  Derived client application CellModels do not ever interact w/the d2r2/React Client Display Adaptor process directly.
  Rather, d2r2/React Client Display Adaptor acts at the behest of the Holistic App Client Kernel process exclusively:

  - Application-specified DOMElement (typically a reference to a <DIV/>) to be used to render display layout updates via React
  - Application-specified d2r2 Component set (an array of d2r2 Component wrapper filters) used to specialize the d2r2 <ComponentRouter/> instance.
  - The cell process ID of an application-defined AppClientDisplayDriver cell process
    - d2r2/React display adaptor process will open a CellProxy to the derived client application's designated "display driver process".
    - Once display adaptor has connected its proxy to the the derived application's display driver process, it monitors the display driver process for
      change and then reads (PULL) the display driver's updated (because it's changed) d2r2 request when (a) the last display update made by the display
      adaptor has completed AND (b) the derived application's display driver process indicates that a new / updated d2r2 display layout request
      is available for processing.
*/
var holarchy = require("@encapsule/holarchy");

var apm = new holarchy.AbstractProcessModel({
  id: "IxoJ83u0TXmG7PLUYBvsyg",
  name: "Holistic Client App Kernel: d2r2/React Client Display Adaptor",
  description: "Manages the details of initializing and dynamically updating the client application view (DOM display surface) via @encapsule/d2r2 and Facebook React.",
  ocdDataSpec: {
    ____label: "Holistic App Client Kernel: d2r2/React Client Display Adaptor Memory",
    ____description: "Shared memory definition for the d2r2/React Client Display Adaptor OPM.",
    ____types: "jsObject",
    construction: {
      ____types: "jsObject",
      ____defaultValue: {},
      toJSON: {
        ____types: "jsFunction",
        ____defaultValue: function ____defaultValue() {
          return {
            tempState: true
          };
        }
      },
      instanceName: {
        ____types: ["jsNull", "jsString"],
        ____defaultValue: null
      },
      // Set by CellProcessor CPM on owned process initialization.
      DOMElement: {
        // TODO: Not serializable
        ____label: "d2r2 Target DOM Element",
        ____description: "A reference to the DOM element to be be managed by the d2r2/React Client Display Adaptor (obtained with document.getElementById).",
        ____opaque: true,
        // this is typically a "[object HTMLDivElement]" type not natively supported by filter.
        ____defaultValue: null
      },
      d2r2Components: {
        ____types: ["jsNull", "jsArray"],
        ____defaultValue: null,
        d2r2Component: {
          ____accept: "jsObject"
        }
      }
    },
    driverProxy: {
      ____types: "jsObject",
      ____defaultValue: {},
      ____appdsl: {
        apm: "CPPU-UPgS8eWiMap3Ixovg"
        /*CellProxy*/

      }
    },
    "private": {
      ____types: "jsObject",
      ____defaultValue: {},
      renderCount: {
        ____accept: "jsNumber",
        ____defaultValue: -1
      },
      busyRendering: {
        ____accept: "jsBoolean",
        ____defaultValue: false
      },
      runtimeTempState: {
        ____types: "jsObject",
        ____defaultValue: {},
        toJSON: {
          ____types: "jsFunction",
          ____defaultValue: function ____defaultValue() {
            return {
              tempState: true
            };
          }
        },
        DOMElement: {
          // TODO: Not serializable
          ____label: "d2r2 Target DOM Element",
          ____description: "A reference to the DOM element to be be managed by the d2r2/React Client Display Adaptor (obtained with document.getElementById).",
          ____opaque: true,
          // this is typically a "[object HTMLDivElement]" type not natively supported by filter.
          ____defaultValue: null
        },
        ComponentRouterInstance: {
          ____accept: ["jsNull", "jsObject"],
          ____defaultValue: null
        }
      }
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
        nextStep: "initializing"
      }]
    },
    initializing: {
      description: "d2r2/React Client Display Adaptor process is initializing...",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "initialized"
      }]
    },
    initialized: {
      description: "d2r2/React Client Display Adaptor is initialized (temporary placeholder)."
    } // ----------------------------------------------------------------

    /*
      uninitialized: {
        description: "Default APM process step.",
        transitions: [
            {
                transitionIf: { holarchy: { cm: { operators: { cell: { atStep: { path: "#.//.//.//.//", step: "boot1_start_kernel" } } } } } },
                nextStep: "initialize"
            }
        ]
    },
     // Just a placeholder for now (for consistency).
    initialize: {
        description: "Initialize",
        transitions: [
            { transitionIf: { always: true }, nextStep: "wait_invariants" }
        ]
    },
     wait_invariants: {
        description: "Waiting for d2r2 ComponentRouter instance (how to render), and DOM element (where to render) invariants to be specified.",
        transitions: [
            {
                transitionIf: {
                    and: [
                        { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.inputs.ComponentRouter" } } } } } },
                        { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.inputs.DOMElement" } } } } } }
                    ]
                },
                nextStep: "wait_inputs"
            }
        ]
    },
     wait_inputs: {
        description: "Invariants have been satisfied. Waiting for initial d2d2 ComponentRouter render data context to be specified.",
        transitions: [ { transitionIf: { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.inputs.clock.value" } } } } } }, nextStep: "initialized" } ]
    },
     initialized: {
        description: "Preparing for initial render operation. Determining if we rehyrdate server-rendered view. Or, replace it.",
        transitions: [
            { transitionIf: { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.inputs.clock.value.options.rehydrate" } } } } } }, nextStep: "rehydrate" },
            { transitionIf: { always: true }, nextStep: "render" }
        ]
    },
     rehydrate: {
        description: "Rehydrating the specified d2r2 ComponentRouter render data context to reconstruct server-rendered d2r2 ComponentRouter render data context in the client application.",
        actions: {
            enter: [
                { holarchy: { cm: { actions: { ocd: { setBooleanFlag: { path: "#.private.renderPending" } } } } } },
                { holistic: { app: { client: { cm: { actions: { d2r2ReactClientDisplayAdaptor: { operation: "hydrate" } } } } } } }
            ]
        },
        transitions: [ { transitionIf: { always: true }, nextStep: "rendering" } ]
    },
     render: {
        description: "Rendering the specified d2r2 ComponentRouter render data context to refresh layout and client-side React component mountings.",
        actions: {
            enter: [
                { holarchy: { cm: { actions: { ocd: { setBooleanFlag: { path: "#.private.renderPending" } } } } } },
                { holistic: { app: { client: { cm: { actions: { d2r2ReactClientDisplayAdaptor: { operation: "render" } } } } } } }
            ]
        },
        transitions: [ { transitionIf: { always: true }, nextStep: "rendering" } ]
    },
     rendering: {
        description: "Rendering the specified d2r2 ComponentRouter render data context. Please wait for the operation to complete.",
        transitions: [ { transitionIf: { not: { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.private.renderPending" } } } } } } }, nextStep: "ready" } ]
    },
     ready: {
        description: "Waiting for next clock signal to re-render client application view.",
        transitions: [ { transitionIf: { holarchy: { cm: { operators: { opmi: { atStep: { path: "#.inputs.clock", step: "updated" } } } } } },  nextStep: "render" } ]
    }
    */

  } // steps

});

if (!apm.isValid()) {
  throw new Error(apm.toJSON());
}

module.exports = apm;