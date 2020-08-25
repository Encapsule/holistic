"use strict";

// TransitionOperator-cpm-parent-process-in-step.js
var cpmLib = require("./lib");

var TransitionOperator = require("../../TransitionOperator");

module.exports = new TransitionOperator({
  id: "PHPSWivjRyK80Gtymsp-pA",
  name: "Cell Process Manager: Parent Process In Step",
  description: "Returns Boolean true request.context.apmBindingPath is a cell process whose parent cell process is in the specified process step.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        parentProcessInStep: {
          ____types: "jsObject",
          apmStep: {
            ____accept: "jsString"
          }
        }
      }
    }
  },
  bodyFunction: function bodyFunction(request_) {
    // Not implemented yet...
    return {
      error: null,
      result: false
    };
  }
});