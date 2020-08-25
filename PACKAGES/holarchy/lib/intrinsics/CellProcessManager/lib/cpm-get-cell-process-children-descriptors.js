"use strict";

// cpm-get-cell-process-children-descriptors.js

/*
  request = {
  cellProcessID: string,
  treeData: object
  }

  response.result = [ {
  cellProcessID: string,
  apmBindingPath: string
  }, ... ]

*/
module.exports = function (request_) {
  var response = {
    error: null,
    result: []
  };
  request_.treeData.digraph.outEdges(request_.cellProcessID).forEach(function (outEdge_) {
    var childCellProcessID = outEdge_.v;
    var childCellProcessProps = request_.treeData.digraph.getVertexProperty(childCellProcessID);
    response.result.push({
      cellProcessID: childCellProcessID,
      apmBindingPath: childCellProcessProps.apmBindingPath
    });
  });
  return response;
};