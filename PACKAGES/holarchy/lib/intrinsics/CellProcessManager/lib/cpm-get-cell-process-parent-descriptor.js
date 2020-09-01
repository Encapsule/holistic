"use strict";

// cpm-get-cell-process-parent-descriptor.js
var arccore = require("@encapsule/arccore");

var cellProcessQueryResponseDescriptorSpec = require("./iospecs/cell-process-query-response-descriptor-spec");

var cellProcessQueryRequestFilterBySpec = require("./iospecs/cell-process-query-request-filterby-spec");

var cpmMountingNamespaceName = require("../../../filters/cpm-mounting-namespace-name");

var cpmPath = "~.".concat(cpmMountingNamespaceName);
var factoryResponse = arccore.filter.create({
  operationID: "f3Q_0uCcRs-hNx25ekTK4w",
  operationName: "cpmLib: Get Cell Process Parent Descriptor",
  operationDescription: "Returns a process descriptor object describing the parent cell process of the querying cell process.",
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
  outputFilterSpec: cellProcessQueryResponseDescriptorSpec,
  bodyFunction: function bodyFunction(request_) {
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
          // Take all response.result default values (all null's).
          break;

        case 1:
          var parentCellProcessID = request_.treeData.digraph.inEdges(request_.cellProcessID)[0].u;
          var parentCellProcessProps = request_.treeData.digraph.getVertexProperty(parentCellProcessID);
          var queryPath = parentCellProcessProps.apmBindingPath !== "~" ? parentCellProcessProps.apmBindingPath : cpmPath;
          var ocdResponse = request_.ocdi.getNamespaceSpec(queryPath);

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          var apmBindingID = ocdResponse.result.____appdsl.apm;

          if (!request_.filterBy) {
            response.result = {
              cellProcessID: parentCellProcessID,
              apmBindingPath: parentCellProcessProps.apmBindingPath,
              apmID: apmBindingID
            };
          } else {
            var apmIDs = !Array.isArray(request_.filterBy.apmIDs) ? [request_.filterBy.apmIDs] : request_.filterBy.apmIDs;

            if (!apmIDs.length) {
              errors.push("Invalid filterBy specifies no APM ID's.");
            } else {
              var indexOfID = apmIDs.indexOf(apmBindingID);

              if (indexOfID >= 0) {
                response.result = {
                  cellProcessID: parentCellProcessID,
                  apmBindingPath: parentCellProcessProps.apmBindingPath,
                  apmID: apmBindingID
                };
              }
            } // else

          } // else


          break;

        default:
          errors.push("Internal error: Unexpected inDegree!");
          break;
      } // switch


      break;
    } // while


    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;