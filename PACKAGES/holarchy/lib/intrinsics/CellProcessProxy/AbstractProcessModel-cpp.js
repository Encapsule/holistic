"use strict";

// AbstractProcessModel-cpp.js
var AbstractProcessModel = require("../../../AbstractProcessModel");

var apm = new AbstractProcessModel({
  id: "CPPU-UPgS8eWiMap3Ixovg",
  name: "Holarchy Cell Process Proxy Helper Process",
  description: "Defines a helper process that functions as a proxy for action and operator calls to some (any) shared cell process.",
  ocdDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    // This namespace is named like this so that it can be used to discriminate between calls through a connected proxy from calls to the proxy itself.
    "CPPU-UPgS8eWiMap3Ixovg_private": {
      ____types: "jsObject",
      ____defaultValue: {},
      lcpRequest: {
        ____types: ["jsUndefined", "jsObject"],
        apmID: {
          ____accept: "jsString"
        },
        instanceName: {
          ____accept: "jsString"
        }
      },
      lcpConnect: {
        ____accept: ["jsUndefined", // the cell process proxy is disconnected currently
        "jsString", // the apmBindingPath of the connected local cell process (lcp)
        "jsNull" // the previous connection has been disconnected due to deletion of owned lcp
        ]
      }
    }
  }
  /*
    I CONCLUDE THAT THIS IS NOT THE CORRECT WAY TO COMMUNICATE THE STATUS
    OF A CELL PROCESS PROXY TO ANY PROCESS (E.G. THE PROCESS THAT ACTUALLY
    OWNS THE CELL PROCESS PROXY CELL ITSELF).
     We do not need the actions or the operators defined by this cell
    to use information derived from prior and constant evaluation of
    APM process step operator evaluations when we can simply and easily
    deduce that information directly from cell memory values when we
    need to.
     And, the same goes for any other cell that might be able to get
    or deduce the apmBindingPath of a cell process proxy. Any
    other cell that wishes to obtain the proxy status can call a
    custom operator/action provided by the cell process proxy cell
    that gives them the answer they seek - what's the cell process
    proxy cell's current status. In this case, it makes no difference
    to the cell attempting to deduce the status how the question
    gets answered. But, it makes a huge difference in terms of
    performance because they analysis is done when it is actually
    needed by a consumer instead of being done on every OPC
    evaluation frame for every active cell process proxy cell
    regardless of if there are consumers or if they're interested.
     So, it's important enough to try to socialize this observation
    that I am leaving the initial step process definition that I
    started before realizing that it was not the correct approach
    given what we're actually trying to get done here.
     ================================================================
      steps: {
      uninitialized: {
     description: "Default cell process step.",
     transitions: [
     {
     nextStep: "connected",
     transitionIf: { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.CPPU-UPgS8eWiMap3Ixovg_CellProcessProxy.lcpConnect" } } } } } }
     },
     {
     nextStep: "disconnected",
     transitionIf: { always: true }
     }
     ]
     },
      disconnected: {
     description: "This cell process proxy helper is waiting for a connection action request from a hosting cell process.",
     transitions: [
     {
     nextStep: "connected",
     transitionIf: { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.CPPU-UPgS8eWiMap3Ixovg_CellProcessProxy.lcpConnect" } } } } } },
     }
     ]
     },
      connected: {
     description: "This cell process proxy helper is connected to a local (CellProcessor-resident) cell process.",
     transitions: [
     {
     nextStep: "broken",
     transitionIf: { holarchy: { cm: { operators: { ocd: { compare: { values: {
     a: { path: "#.CPPU-UPgS8eWiMap3Ixovg_CellProcessProxy.lcpConnect" },
     b: { value: null },
     operator: "==="
     } } } } } } }
     },
     {
     nextStep: "disconnected",
     transitionIf: { not: { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.CPPU-UPgS8eWiMap3Ixovg_CellProcessProxy.lcpConnect" } } } } } } },
     }
     ]
     },
      broken: {
     description: "This cell process proxy helper was connected to an owned cell process that has been deleted.",
     transitions: [
     {
     nextStep: "connected",
     transitionIf: { holarchy: { cm: { operators: { ocd: { isNamespaceTruthy: { path: "#.CPPU-UPgS8eWiMap3Ixovg_CellProcessProxy.lcpConnect" } } } } } },
     },
     {
     nextStep: "disconnected",
     transitionIf: { holarchy: { cm: { operators: { ocd: { isNamespaceIdenticalToValue: {
     path: "#.CPPU-UPgS8eWiMap3Ixovg_CellProcessProxy.lcpConnect",
     value: undefined
     } } } } } }
     }
     ]
     }
      } // steps
      ================================================================
  */

});

if (!apm.isValid()) {
  throw new Error(apm.toJSON());
}

module.exports = apm;