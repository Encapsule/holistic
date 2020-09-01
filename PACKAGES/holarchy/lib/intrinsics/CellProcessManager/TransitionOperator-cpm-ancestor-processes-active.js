"use strict";

// TransitionOperator-cpm-ancestor-processes-active.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../TransitionOperator");

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec");

var transitionOperator = new TransitionOperator({
  id: "gJnA-VJTTLa0g9TKFmjv1Q",
  name: "Cell Process Manager: Ancestor Processes Active",
  description: "Return Boolean true if request.context.apmBindingPath is a cell process with active ancestor processes.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        ancestorProcessesActive: {
          ____types: "jsObject",
          filterBy: cellProcessQueryRequestFilterBySpec
        }
      }
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.operatorRequest.holarchy.CellProcessor.ancestorProcessesActive;
      var cpmLibResponse = cpmLib.getProcessTreeData({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cellProcessTreeData = cpmLibResponse.result;
      cpmLibResponse = cpmLib.getProcessAncestorDescriptors.request({
        cellProcessID: arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result,
        filterBy: message.filterBy,
        ocdi: request_.context.ocdi,
        treeData: cellProcessTreeData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var ancestorCellProcessDescriptors = cpmLibResponse.result;
      response.result = ancestorCellProcessDescriptors.length ? true : false;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!transitionOperator.isValid()) {
  throw new Error(transitionOperator.toJSON());
}

module.exports = transitionOperator;