"use strict";

// cpm-get-cell-process-ancestor-descriptors.js
var arccore = require("@encapsule/arccore");

var cellProcessQueryResponseDescriptorSpec = require("./iospecs/cell-process-query-response-descriptor-spec");

var cellProcessQueryRequestFilterBySpec = require("./iospecs/cell-process-query-request-filterby-spec");

var cpmMountingNamespaceName = require("../../../filters/cpm-mounting-namespace-name");

var cpmPath = "~.".concat(cpmMountingNamespaceName);
var factoryResponse = arccore.filter.create({
  operationID: "IAokn6EeTcug9ZZH2iqgvw",
  operationName: "cpmlib: Get Cell Process Ancestor Descriptors",
  operationDescription: "Generates an array of cell process descriptor objects describing the ancestor cell process(es) of the querying cell process.",
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
      var ancestorCellProcessID = request_.cellProcessID;

      while (request_.treeData.digraph.inDegree(ancestorCellProcessID)) {
        ancestorCellProcessID = request_.treeData.digraph.inEdges(ancestorCellProcessID)[0].u;
        var ancestorCellProcessProps = request_.treeData.digraph.getVertexProperty(ancestorCellProcessID);
        var queryPath = ancestorCellProcessProps.apmBindingPath !== "~" ? ancestorCellProcessProps.apmBindingPath : cpmPath;
        var ocdResponse = request_.ocdi.getNamespaceSpec(queryPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var apmBindingID = ocdResponse.result.____appdsl.apm;

        if (!request_.filterBy) {
          response.result.push({
            cellProcessID: ancestorCellProcessID,
            apmBindingPath: ancestorCellProcessProps.apmBindingPath,
            apmID: apmBindingID
          });
        } else {
          var apmIDs = !Array.isArray(request_.filterBy.apmIDs) ? [request_.filterBy.apmIDs] : request_.filterBy.apmIDs;

          if (!apmIDs.length) {
            errors.push("Invalid filterBy specifies no APM ID's.");
            break;
          }

          var indexOfID = apmIDs.indexOf(apmBindingID);

          if (indexOfID >= 0) {
            response.result.push({
              cellProcessID: ancestorCellProcessID,
              apmBindingPath: ancestorCellProcessProps.apmBindingPath,
              apmID: apmBindingID
            });
          }
        }
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