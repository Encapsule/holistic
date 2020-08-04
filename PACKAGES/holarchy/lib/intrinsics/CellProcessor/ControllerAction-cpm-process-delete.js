"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/ControllerAction-cpm-process-delete.js
var ControllerAction = require("../../ControllerAction");

var controllerAction = new ControllerAction({
  id: "4s_DUfKnQ4aS-xRjewAfUQ",
  name: "Cell Process Manager: Process Delete",
  description: "Requests that the Cell Process Manager delete a branch of the cell process tree.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        process: {
          ____types: "jsObject",
          "delete": {
            ____types: "jsObject",
            // Either...
            apmBindingPath: {
              ____accept: ["jsUndefined", "jsString"]
            },
            // ... or
            cellProcessID: {
              ____accept: ["jsUndefined", "jsString"]
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____types: "jsObject",
    apmBindingPath: {
      ____accept: "jsString"
    },
    // this is the OCD path of deleted process' parent process
    cellProcessID: {
      ____accept: "jsString"
    } // this is an IRUT-format hash of the apmBindingPath

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      console.log("Cell Process Manager process delete...");
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;