"use strict";

var arccore = require("@encapsule/arccore");

var apmID = arccore.identifier.irut.fromReference("@encapsule/holarchy-cm.ValueObserver.AbstractProcessModel").result;

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "eKkJzE6USxqKPCmR3xmDdQ",
    operationName: "ValueObserver Get Status",
    operationDescription: "Retrieves cell memory and process info for the ValueObserver cell.",
    inputFilterSpec: {
      ____types: "jsObject",
      ocdi: {
        ____accept: "jsObject"
      },
      act: {
        ____accept: "jsFunction"
      },
      apmBindingPath: {
        ____accept: "jsString"
      }
    },
    outputFilterSpec: {
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
        var ocdResponse = request_.context.ocdi.getNamespaceSpec(request_.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var apmBindingPathSpec = ocdResponse.result;

        if (!apmBindingPathSpec.____appdsl || !apmBindingPathSpec.____appdsl.apm || apmBindingPathSpec.____appdsl.apm !== apmID) {
          errors.push("Invalid apmBindingPath=\"".concat(request_.apmBindingPath, "\" does not resolve to a ValueObserver cell!"));
          break;
        }

        var actResponse = request_.act({
          actorName: "ValueObserver Get Status",
          actorTaskDescription: "Query cell process manager for cell process info...",
          actionRequest: {
            CellProcessor: {
              cell: {
                query: {},
                cellCoordinates: request_.apmBindingPath
              }
            }
          }
        });

        if (actResponse.error) {
          errors.push(actResponse.error);
          break;
        }

        ocdResponse = request_.ocdi.readNamespace(request_.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        response.result = {
          cellMemory: ocdResponse.result,
          cellProcess: actResponse.result.actionResult
        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      console.log(response);
      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();