"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/ControllerAction-cpm-process-query.js
var ControllerAction = require("../../ControllerAction");

var controllerAction = new ControllerAction({
  id: "r-JgxABoS_a-mSE2c1nvKA",
  name: "Cell Process Manager: Process Query",
  description: "Performs a query on a specific cell process managed by the Cell Process Manager.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        process: {
          ____types: "jsObject",
          query: {
            ____types: "jsObject" // TODO:

          }
        }
      }
    }
  },
  actionResultSpec: {
    ____types: "jsObject" // TODO:

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      console.log("Cell Process Manager process query...");
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