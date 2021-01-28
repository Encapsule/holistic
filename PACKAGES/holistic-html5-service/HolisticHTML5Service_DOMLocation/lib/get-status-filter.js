"use strict";

// holistic-html5-service/HolisticHTML5Service_DOMLocation/lib/get-status-filter.js
var arccore = require("@encapsule/arccore");

(function () {
  var cachedDOMLocationProcessQuery = null;
  var factoryResponse = arccore.filter.create({
    operationID: "YeZUqgaRQ5alToPPxu_0zQ",
    operationName: "HolisticHTML5Service_DOMLocation Status",
    operationDescription: "Obtains cellplane coordinates for HolisticHTML5Service_DOMLocation singleton process and a copy of the cell instance's memory.",
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

        if (!cachedDOMLocationProcessQuery) {
          // We need to determine the cellProcessPath of the holistic app client kernel process.
          var actResponse = request_.act({
            actorName: "HolisticHTML5Service_DOMLocation Status",
            actorTaskDescription: "Querying the CellProcessor to determine if and where in the cell plane the HolisticHTML5Service_DOMLocation process is activated.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: {
                    apmID: "OWLoNENjQHOKMTCEeXkq2g"
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

          cachedDOMLocationProcessQuery = actResponse.result.actionResult.query;
        } // if cache miss


        var ocdResponse = request_.ocdi.readNamespace(cachedDOMLocationProcessQuery.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        response.result = {
          cellMemory: ocdResponse.result,
          cellProcess: cachedDOMLocationProcessQuery
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

  module.exports = factoryResponse.result; // This is an arccore.filter instance.
})();