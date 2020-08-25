"use strict";

// cpm-get-cell-process-descriptor.js

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

    if (!request_.treeData.digraph.isVertex(request_.cellProcessID)) {
      errors.push("Invalid cellProcessID specified. No active cell process with ID '".concat(request_.cellProcessID, "'."));
      break;
    }

    var cellProcessProps = request_.treeData.digraph.getVertexProperty(request_.cellProcessID);
    response.result = {
      cellProcessID: request_.cellProcessID,
      apmBindingPath: cellProcessProps.apmBindingPath
    };
    break;
  }

  if (errors.length) {
    repsonse.error = errors.join(" ");
  }

  return response;
};