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
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        descendantProcessesActive: {
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
      var message = request_.operatorRequest.holarchy.CellProcessor.descendantProcessesActive;
      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var ownedCellProcessesData = cpmDataDescriptor.data.ownedCellProcesses;
      cpmLibResponse = cpmLib.getProcessDescendantDescriptors.request({
        cellProcessID: arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result,
        filterBy: message.filterBy,
        ocdi: request_.context.ocdi,
        treeData: ownedCellProcessesData
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