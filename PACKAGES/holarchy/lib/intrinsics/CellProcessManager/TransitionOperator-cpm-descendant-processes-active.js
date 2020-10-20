"use strict";

// TransitionOperator-cpm-descendant-processes-active.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../../TransitionOperator");

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec"); // TODO: Not sure we'll actually ever use this. But it's simple enough. Keep an eye. Maybe remove it later?


module.exports = new TransitionOperator({
  id: "Fs6tE76WR5yTOdbwQ_N_FQ",
  name: "Cell Process Manager: Descendant Processes Active",
  description: "Returns Boolean true if request.context.apmBindingPath is a cell process with active dependant cell processes.",
  operatorRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      cell: {
        ____types: "jsObject",
        cellCoordinates: {
          ____types: ["jsString", // If a string, then the caller-supplied value must be either a fully-qualified or relative path to a cell. Or, an IRUT that resolves to a known cellProcessID.
          "jsObject" // If an object, then the caller has specified the low-level apmID, instanceName coordinates directly.
          ],
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
          descendantProcessesActive: {
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
      inBreakScope = true;
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

      var prologueData = cpmLibResponse.result;
      cpmLibResponse = cpmLib.getProcessDescendantDescriptors.request({
        cellProcessID: prologueData.resolvedCellCoordinates.cellPathID,
        filterBy: messageBody.query.filterBy,
        ocdi: request_.context.ocdi,
        treeData: prologueData.ownedCellProcessesData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var descendantCellProcessDescriptors = cpmLibResponse.result;
      response.result = descendantCellProcessDescriptors.length ? true : false;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});