"use strict";

// cpm-get-cell-process-descendant-descriptors.js
var arccore = require("@encapsule/arccore");

var cellProcessQueryResponseDescriptorSpec = require("./iospecs/cell-process-query-response-descriptor-spec");

var cellProcessQueryRequestFilterBySpec = require("./iospecs/cell-process-query-request-filterby-spec");

var factoryResponse = arccore.filter.create({
  operationID: "roU4m7MkR_yj1hvoOFbvAA",
  operationName: "cpmLib: Get Cell Process Descendant Descriptors",
  operationDescription: "Returns an array of process descriptor objects describing the descendant process(es) of the querying cell process.",
  inputFilterSpec: {
    ____types: "jsObject",
    cellProcessID: {
      ____accept: "jsString"
    },
    filterBy: cellProcessQueryRequestFilterBySpec,
    ocdi: {
      ____accept: "jsObject"
    },
    treeData: {
      ____accept: "jsObject"
    }
  },
  outputFilterSpec: {
    ____types: "jsArray",
    ____defaultValue: [],
    cellProcessDescriptor: cellProcessQueryResponseDescriptorSpec
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: []
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var digraphTraversalResponse = arccore.graph.directed.breadthFirstTraverse({
        digraph: request_.treeData.digraph,
        options: {
          startVector: [request_.cellProcessID]
        },
        visitor: {
          discoverVertex: function discoverVertex(visitorRequest_) {
            if (visitorRequest_.u === request_.cellProcessID) {
              // exclude the query cell process
              return true;
            }

            var descendantCellProcessID = visitorRequest_.u;
            var descendantCellProcessProps = visitorRequest_.g.getVertexProperty(descendantCellProcessID);
            var ocdResponse = request_.ocdi.getNamespaceSpec(descendantCellProcessProps.apmBindingPath);

            if (ocdResponse.error) {
              errors.push(opdResponse.error);
              return false; // abort the BF search
            }

            var apmBindingID = ocdResponse.result.____appdsl.apm;

            if (!request_.filterBy) {
              response.result.push({
                cellProcessID: descendantCellProcessID,
                apmBindingPath: descendantCellProcessProps.apmBindingPath,
                apmID: apmBindingID
              });
            } else {
              var apmIDs = !Array.isArray(request_.filterBy.apmIDs) ? [request_.filterBy.apmIDs] : request_.filterBy.apmIDs;

              if (!apmIDs.length) {
                errors.push("Invalid filterBy specifies no APM ID's.");
                return false; // abort the BF search
              }

              var indexOfID = apmIDs.indexOf(apmBindingID);

              if (indexOfID > 0) {
                response.result.push({
                  cellProcessID: descendantCellProcessID,
                  apmBindingPath: descendantCellProcessProps.apmBindingPath,
                  apmID: apmBindingID
                });
              }
            }

            return true;
          }
        }
      });

      if (digraphTraversalResponse.error) {
        errors.push(digraphTraversalResponse.error);
        break;
      }

      if (digraphTraversalResponse.result.searchStatus !== "completed") {
        errors.unshift("Internal validation error performing breadth-first visit of cell process digraph from cellProcessID = '".concat(cellProcessID, "'. Search did not complete?!"));
        break;
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;