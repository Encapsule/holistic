"use strict";

// TransitionOperator-cpm-descendant-processes-all-in-step.js
var cpmLib = require("./lib");

var TransitionOperator = require("../../TransitionOperator");

module.exports = new TransitionOperator({
  id: "DX5GfJcwRNq0xW20KzMSJQ",
  name: "Cell Process Manager: Descendant Processes All In Step",
  description: "Returns Boolean true request.context.apmBindingPath is a cell process with all descendant cell processes in the specified process step.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        descendantProcessesAllInStep: {
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