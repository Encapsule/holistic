"use strict";

// TransitionOperator-cpm-parent-process-active.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../../TransitionOperator");

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec"); // TODO: This operator will require one or more APM ID's be specified as a mandatory filter.
// Otherwise, this is essentially meaningless as it will always return true for all cell processes
// created via CPM create process (because they're all by definition descendents of CPM, the intrincis cell process bound to the anonymous OCD namespace, ~).


var transitionOperator = new TransitionOperator({
  id: "9HNGDusyTtKpleXFae7O5A",
  name: "Cell Process Manager: Parent Process Active",
  description: "Returns Boolean true iff request.context.apmBindingPath is a cell process with an active parent process.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        parentProcessActive: {
          ____types: "jsObject",
          filterBy: cellProcessQueryRequestFilterBySpec
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
      var message = request_.operatorRequest.holarchy.CellProcessor.parentProcessActive; // This is all we can ever be 100% sure about based on the apmBindingPath.

      if (request_.context.apmBindingPath === "~") {
        break; // resposne.result === false
      } // So, we have to query the CPM process tree.


      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var ownedCellProcessesData = cpmDataDescriptor.data.ownedCellProcesses; // Get the parent process descriptor.

      cpmLibResponse = cpmLib.getProcessParentDescriptor.request({
        cellProcessID: arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result,
        filterBy: message.filterBy,
        ocdi: request_.context.ocdi,
        treeData: ownedCellProcessesData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var parentCellProcessDescriptor = cpmLibResponse.result;
      response.result = parentCellProcessDescriptor.apmBindingPath ? true : false;
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