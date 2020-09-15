"use strict";

// SOUCES/LIB/holarchy/lib/intrinsics/CellProcessManager/ControllerAction-cpm-process-open.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../ControllerAction");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var action = new ControllerAction({
  id: "MAaYEUinReO3AKaTI21CaQ",
  name: "Cell Process Manager: Open Cell Process",
  description: "Instruct CellProcessor to open the specified cell process instance as a shared cell process, and link it to the indicated worker proxy subcell.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        process: {
          ____types: "jsObject",
          open: {
            ____types: "jsObject",
            apmID: {
              ____accept: "jsString"
            },
            instanceName: {
              ____accept: "jsString",
              ____defaultValue: "singleton"
            },
            proxyPath: {
              ____accept: "jsString",
              ____defaultValue: "#"
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____types: "jsObject",
    apmBindingPath: {
      ____accept: ["jsNull", "jsString"],
      ____defaultValue: null
    },
    // this is the OCD path of the new process
    cellProcessID: {
      ____accept: ["jsNull", "jsString"],
      ____defaultValue: null
    } // This is an IRUT-format cell process ID

  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  }
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;