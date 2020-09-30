"use strict";

// cpm-get-cell-process-children-descriptors.js
var arccore = require("@encapsule/arccore");

var cellProcessQueryResponseDescriptorSpec = require("./iospecs/cell-process-query-response-descriptor-spec");

var cellProcessQueryRequestFilterBySpec = require("./iospecs/cell-process-query-request-filterby-spec");

var factoryResponse = arccore.filter.create({
  operationID: "4wu9ijYAQ-233_jOLQPVGw",
  operationName: "cpmLib: Get Cell Process Children Descriptors",
  operationDescription: "Returns an array of process descriptor objects describing the children cell process(es) of the querying cell process.",
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
      request_.treeData.digraph.outEdges(request_.cellProcessID).forEach(function (outEdge_) {
        var childCellProcessID = outEdge_.v;
        var childCellProcessProps = request_.treeData.digraph.getVertexProperty(childCellProcessID);
        var ocdResponse = request_.ocdi.getNamespaceSpec(childCellProcessProps.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          return;
        }

        var apmBindingID = ocdResponse.result.____appdsl.apm;

        if (!request_.filterBy) {
          response.result.push({
            cellProcessID: childCellProcessID,
            apmBindingPath: childCellProcessProps.apmBindingPath,
            apmID: apmBindingID
          });
        } else {
          var apmIDs = !Array.isArray(request_.filterBy.apmIDs) ? [request_.filterBy.apmIDs] : request_.filterBy.apmIDs;

          if (!apmIDs.length) {
            errors.push("Invalid filterBy specifies no APM ID's.");
            return;
          }

          var indexOfID = apmIDs.indexOf(apmBindingID);

          if (indexOfID >= 0) {
            response.result.push({
              cellProcessID: childCellProcessID,
              apmBindingPath: childCellProcessProps.apmBindingPath,
              apmID: apmBindingID
            });
          }
        } // else

      }); // forEach
    } // while


    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

}); // filter.create

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;