"use strict";

// cpm-get-cell-process-descriptor.js
var arccore = require("@encapsule/arccore");

var cellProcessQueryRequestFilterBySpec = require("./iospecs/cell-process-query-request-filterby-spec");

var cellProcessQueryResponseDescriptorSpec = require("./iospecs/cell-process-query-response-descriptor-spec");

var cpmMountingNamespaceName = require("../../../filters/cpm-mounting-namespace-name");

var cpmPath = "~.".concat(cpmMountingNamespaceName);
var factoryResponse = arccore.filter.create({
  operationID: "CxS4tmxfRdSF6C7pljlm5Q",
  operationName: "cpmLib: Get Cell Process Descriptor",
  operationDescription: "Returns the cell process descriptor of the specified cell process.",
  inputFilterSpec: {
    ____types: "jsObject",
    cellProcessID: {
      ____accept: "jsString"
    },
    ocdi: {
      ____accept: "jsObject"
    },
    treeData: {
      ____accept: "jsObject"
    }
  },
  outputFilterSpec: cellProcessQueryResponseDescriptorSpec,
  bodyFunction: function bodyFunction(request_) {
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
      var queryPath = cellProcessProps.apmBindingPath !== "~" ? cellProcessProps.apmBindingPath : cpmPath;
      var ocdResponse = request_.ocdi.getNamespaceSpec(queryPath);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var apmBindingID = ocdResponse.result.____appdsl.apm;
      response.result = {
        cellProcessID: request_.cellProcessID,
        apmBindingPath: cellProcessProps.apmBindingPath,
        apmID: apmBindingID
      };
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.result);
}

module.exports = factoryResponse.result;