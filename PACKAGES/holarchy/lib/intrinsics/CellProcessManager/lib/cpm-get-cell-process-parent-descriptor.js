"use strict";

// cpm-get-cell-process-parent-descriptor.js

/*
  request = {
  cellProcessID: string,
  treeData: object
  }

  response.result = {
  cellProcessID: string,
  apmBindingPath: string
  }

*/
module.exports = function (request_) {
  var response = {
    error: null
  };
  var errors = [];
  var inBreakScope = false;

  while (!inBreakScope) {
    inBreakScope = true;

    switch (request_.treeData.digraph.inDegree(request_.cellProcessID)) {
      case -1:
        errors.push("Invalid cellProcessID specified. No active cell process with ID '".concat(request_.cellProcessID, "'."));
        break;

      case 0:
        response.result = {
          cellProcessID: null,
          apmBindingPath: null
        };
        break;

      case 1:
        var parentCellProcessID = request_.treeData.digraph.inEdges(request_.cellProcessID)[0].u;
        var parentCellProcessProps = request_.treeData.digraph.getVertexProperty(parentCellProcessID);
        response.result = {
          cellProcessID: parentCellProcessID,
          apmBindingPath: parentCellProcessProps.apmBindingPath
        };
        break;

      default:
        errors.push("Internal error: Unexpected inDegree!");
        break;
    }

    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  }

  return response;
};