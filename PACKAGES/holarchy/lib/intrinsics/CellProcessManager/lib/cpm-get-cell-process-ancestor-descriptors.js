"use strict";

// cpm-get-cell-process-ancestor-descriptors.js

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
    error: null,
    result: []
  };
  var errors = [];
  var inBreakScope = false;

  while (!inBreakScope) {
    inBreakScope = true;
    var ancestorCellProcessID = request_.cellProcessID;

    while (request_.treeData.digraph.inDegree(ancestorCellProcessID)) {
      ancestorCellProcessID = request_.treeData.digraph.inEdges(ancestorCellProcessID)[0].u;
      var ancestorCellProcessProps = request_.treeData.digraph.getVertexProperty(ancestorCellProcessID);
      response.result.push({
        cellProcessID: ancestorCellProcessID,
        apmBindingPath: ancestorCellProcessProps.apmBindingPath
      });
    }

    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  }

  return response;
};