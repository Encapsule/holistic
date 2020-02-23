"use strict";

var holodeck = require("@encapsule/holodeck");

var holarchy = require("@encapsule/holarchy");

var factoryResponse = holodeck.harnessFactory.request({
  id: "FAvFLw0XQN6yomNs13r21g",
  name: "CellModel Harness",
  description: "Constructs an instance of ES6 class CellModel and serializes it for inspection. There's a lot more we plan to do with this later.",
  harnessOptions: {
    idempotent: true
  },
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        CellModel: {
          ____types: "jsObject",
          constructorRequest: {
            ____opaque: true // accept any request and let SCM sort it out

          }
        }
      }
    }
  },
  testVectorResultOutputSpec: {
    ____types: "jsObject",
    isValid: {
      ____accept: "jsBoolean"
    },
    toJSON: {
      ____accept: ["jsString", // The instance is invalid and this is this._private.constructorError string.
      "jsObject"]
    }
  },
  harnessBodyFunction: function harnessBodyFunction(vectorRequest_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var messageBody = vectorRequest_.vectorRequest.holistic.holarchy.CellModel;
      var cell = new holarchy.CellModel(messageBody.constructorRequest);
      response.result = {
        isValid: cell.isValid(),
        toJSON: cell.toJSON(),
        cellModelDigraphStats: {
          vertices: cell.isValid() ? cell._private.digraph.verticesCount() : "invalid",
          edges: cell.isValid() ? cell._private.digraph.edgesCount() : "invalid",
          counts: {
            cm: cell.isValid() ? cell._private.digraph.outDegree("CM_INDEX") : "invalid",
            apm: cell.isValid() ? cell._private.digraph.outDegree("APM_INDEX") : "invalid",
            top: cell.isValid() ? cell._private.digraph.outDegree("TOP_INDEX") : "invalid",
            act: cell.isValid() ? cell._private.digraph.outDegree("ACT_INDEX") : "invalid"
          }
        }
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