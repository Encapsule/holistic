"use strict";

(function () {
  var arccore = require("@encapsule/arccore");

  var factoryResponse = arccore.filter.create({
    operationID: "Xe_Bwp4WQ2iw60rNtRGdzw",
    operationName: "ObservableValue::getStatus",
    operationDescription: "Obtains cell memory and process info.",
    inputFilterSpec: {
      ____types: "jsObject",
      act: {
        ____accept: "jsFunction"
      },
      ocdi: {
        ____accept: "jsObject"
      },
      apmBindingPath: {
        ____accept: "jsObject"
      },
      apmID: {
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
        var ocdResponse = request_.ocdi.getNamespaceSpec(request_.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var apmBindingPathSpec = ocdResponse.result;

        if (!apmBindingPathSpec.____appdsl || !apmBindingPathSpec.____appdsl.apm || apmBindingPathSpec.____appdsl.apm !== request_.apmID) {
          errors.push("Invalid apmBindingPath value specified. Value \"".concat(request_.apmBindingPath, "\" does not resolve to a cell bound to APM ID=\"").concat(request_.apmID, "\"."));
          break;
        }

        var actionResponse = request_.act({
          actorName: "ObservableValue::getStatus",
          actorTaskDescription: "Querying the CellProcessor to obtain cell process information.",
          actionRequest: {
            CellProcessor: {
              cell: {
                cellCoordinates: {
                  apmBindingPath: request_.apmBindingPath
                },
                query: {}
              }
            }
          }
        });

        if (actionResponse.error) {
          errors.push(actionResponse.error);
          break;
        }

        var cellProcess = actionResponse.result.actionResult;
        ocdResponse = request_.ocdi.readNamespace(request_.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var cellMemory = ocdResponse.result;
        response.result = {
          cellMemory: cellMemory,
          cellProcess: cellProcess
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
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();