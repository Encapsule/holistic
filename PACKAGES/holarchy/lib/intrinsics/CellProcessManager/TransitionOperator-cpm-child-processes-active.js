"use strict";

// TransitionOperator-cpm-child-processes-active.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../TransitionOperator");

module.exports = new TransitionOperator({
  id: "xIRhBHueTRGO0xq63UUbyQ",
  name: "Cell Process Manager: Child Processes Active",
  description: "Returns Boolean true iff request.context.apmBindingPath is a cell process with one or more child cell processes.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        childProcessesActive: {
          ____types: "jsObject"
        }
      }
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: false
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var cpmLibResponse = cpmLib.getProcessTreeData({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellProcessTreeData = cpmLibResponse.result;
      cpmLibResponse = cpmLib.getProcessChildrenDescriptors({
        cellProcessID: arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result,
        treeData: cellProcessTreeData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var childCellProcessDescriptors = cpmLibResponse.result;
      response.result = childCellProcessDescriptors.length ? true : false;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});