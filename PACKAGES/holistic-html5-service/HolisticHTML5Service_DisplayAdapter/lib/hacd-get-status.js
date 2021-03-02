"use strict";

var arccore = require("@encapsule/arccore");

(function () {
  var cachedKernelProcessQuery = null;
  var factoryResponse = arccore.filter.create({
    operationID: "ebrOFXLaS3mFAUYFDj14sw",
    operationName: "hacdLib: Get Status",
    operationDescription: "Retrieves the status and current cell memory for Holistic App Client Display Adapter process.",
    inputFilterSpec: {
      ____types: "jsObject",
      act: {
        ____accept: "jsFunction"
      },
      ocdi: {
        ____accept: "jsObject"
      }
    },
    outputFilterSpec: {
      ____label: "Holistic App Client Display Adapter Process Memory & Status",
      ____types: "jsObject",
      cellMemory: {
        ____accept: "jsObject"
      },
      cellProcess: {
        ____accept: "jsObject"
      }
    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;

        if (!cachedKernelProcessQuery) {
          // We need to determine the cellProcessPath of the holistic app client display adapter process.
          var actResponse = request_.act({
            actorName: "Holistic App Client Display Adapter: Get Status",
            actorTaskDescription: "Querying the CellProcessor to determine if and where in the cell plane the Holistic App Client Kernel process is activated.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: {
                    apmID: "IxoJ83u0TXmG7PLUYBvsyg"
                  },
                  query: {}
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          cachedKernelProcessQuery = actResponse.result.actionResult.query;
        } // if cache miss


        var ocdResponse = request_.ocdi.readNamespace(cachedKernelProcessQuery.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        response.result = {
          cellMemory: ocdResponse.result,
          cellProcess: cachedKernelProcessQuery
        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // bodyFunciton

  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();