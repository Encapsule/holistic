"use strict";

// ControllerAction-app-metadata-query-app.js
var holarchy = require("@encapsule/holarchy");

var hamdLib = require("./lib");

(function () {
  var action = new holarchy.ControllerAction({
    id: "8KWW5zkCTMKRihNXKX_Pdw",
    name: "Holistic App Common Kernel: Query App Metadata",
    description: "Retrieves a copy of the derived application's application metadata.",
    actionRequestSpec: {
      ____types: "jsObject",
      holistic: {
        ____types: "jsObject",
        app: {
          ____types: "jsObject",
          metadata: {
            ____types: "jsObject",
            query: {
              ____types: "jsObject",
              type: {
                ____accept: "jsString",
                ____inValueSet: ["org", "app", "page", "hashroute", "digraph"]
              },
              uri: {
                ____accept: ["jsNull"
                /* N/A (type is org or app) */
                , "jsString"],
                ____defaultValue: null
              }
            }
          }
        }
      }
    },
    // actionRequestSpec
    actionResultSpec: {
      ____label: "App Metadata Query Result",
      ____description: "App metadata query by type result descriptor object.",
      ____accept: "jsObject" // The metadata descriptor object in the format specified by the developer's app metadata filter specs.

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var filterResponse = hamdLib.getStatus.request({
          act: request_.context.act,
          ocdi: request_.context.ocdi
        });

        if (filterResponse.error) {
          errors.push(filterResponse.error);
          break;
        }

        var cellStatus = filterResponse.result;
        var messageBody = request_.actionRequest.holistic.app.metadata.query;

        switch (messageBody.type) {
          case "org":
            response.result = cellStatus.cellMemory.appMetadataDigraph.getVertexProperty("__org");
            break;

          case "app":
            response.result = cellStatus.cellMemory.appMetadataDigraph.getVertexProperty("__app");
            break;

          case "page":
          case "hashroute":
            if (!cellStatus.cellMemory.appMetadataDigraph.isVertex(messageBody.uri)) {
              errors.push("Invalid ".concat(messageBody.type, " app metadata query. No metadata for ").concat(messageBody.type, " URI \"").concat(messageBody.uri, "\"."));
              break;
            }

            response.result = cellStatus.cellMemory.appMetadataDigraph.getVertexProperty(messageBody.uri);
            break;

          case "digraph":
            response.result = cellStatus.cellMemory.appMetadataDigraph;
            break;

          default:
            errors.push("Internal error: unhandled switch case.");
            break;
        } // switch


        if (errors.length) {
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

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();