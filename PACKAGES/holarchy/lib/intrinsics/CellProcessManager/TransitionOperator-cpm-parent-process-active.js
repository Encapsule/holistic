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
    CellProcessor: {
      ____types: "jsObject",
      cell: {
        ____types: "jsObject",
        cellCoordinates: {
          ____types: [// If a string, then the caller-supplied value must be either a fully-qualified or relative path to a cell.
          // Or, an IRUT that resolves to a known cellProcessID (that by definition must resolve to an active cell).
          "jsString", // If an object, then the caller has specified the low-level apmID, instanceName coordinates directly.
          "jsObject"],
          ____defaultValue: "#",
          apmID: {
            ____accept: "jsString"
          },
          instanceName: {
            ____accept: "jsString",
            ____defaultValue: "singleton"
          }
        },
        query: {
          ____types: "jsObject",
          filterBy: cellProcessQueryRequestFilterBySpec,
          parentProcessActive: {
            ____accept: "jsObject"
          }
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
      inBreakScope = true; // This is all we can ever be 100% sure about based on the apmBindingPath.

      if (request_.context.apmBindingPath === "~") {
        break; // response.result === false
      }

      var messageBody = request_.operatorRequest.CellProcessor.cell;
      var cpmLibResponse = cpmLib.cellProcessFamilyOperatorPrologue.request({
        unresolvedCellCoordinates: messageBody.cellCoordinates,
        apmBindingPath: request_.context.apmBindingPath,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var prologueData = cpmLibResponse.result; // Get the parent process descriptor.

      cpmLibResponse = cpmLib.getProcessParentDescriptor.request({
        cellProcessID: prologueData.resolvedCellCoordinates.cellPathID,
        filterBy: messageBody.query.filterBy,
        ocdi: request_.context.ocdi,
        treeData: prologueData.ownedCellProcessesData
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