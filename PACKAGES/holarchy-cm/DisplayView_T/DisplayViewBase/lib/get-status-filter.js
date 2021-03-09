"use strict";

// DisplayView_T/DisplayViewBase/lib/index.js
(function () {
  var arccore = require("@encapsule/arccore");

  var cmLabel = require("../cell-label");

  var factoryResponse = arccore.filter.create({
    operationID: "C2R38IuiSiuVLkiW1KFW5A",
    operationName: "".concat(cmLabel, " Get Status Filter"),
    operationDescription: "Returns cellMemory for an activated DisplayViewBase cell.",
    inputFilterSpec: {
      ____types: "jsObject",
      act: {
        ____accept: "jsFunction"
      },
      apmBindingPath: {
        ____accept: "jsString"
      },
      ocdi: {
        ____accept: "jsObject"
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

        var cellSpec = ocdResponse.result;

        if (!cellSpec.____appdsl || !cellSpec.____appdsl.apm) {
          errors.push("The cell at apmBindingPath \"".concat(request_.apmBindingPath, "\" does not resolve to a cell!"));
          break;
        }

        ocdResponse = request_.ocdi.readNamespace(request_.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var cellMemory = ocdResponse.result;
        var actResponse = request_.act({
          actorName: "".concat(cmLabel, " Get Status"),
          actorTaskDescription: "Querying the DisplayView cell process...",
          actionRequest: {
            CellProcessor: {
              cell: {
                cellCoordinates: request_.apmBindingPath,
                query: {}
              }
            }
          },
          apmBindingPath: request_.apmBindingPath
        });

        if (actResponse.error) {
          errors.push(actResponse.error);
          break;
        }

        var cellProcess = actResponse.result.actionResult;
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