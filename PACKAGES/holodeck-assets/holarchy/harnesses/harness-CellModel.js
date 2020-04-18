"use strict";

var arccore = require("@encapsule/arccore");

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
            // Either a CellModel constructor request object or pre-constructed CellModel class instance reference.
            ____opaque: true // accept any request and let CellModel sort it out

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
    summary: {
      ____accept: ["jsString", // invalid instance constructor error
      "jsObject" // valid instance data
      ]
    },
    opcConfig: {
      ____accept: ["jsString", "jsObject"]
    },
    cmat: {
      ____accept: ["jsString", "jsObject"]
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
      var cell = messageBody.constructorRequest instanceof holarchy.CellModel ? messageBody.constructorRequest : new holarchy.CellModel(messageBody.constructorRequest);
      var summary = cell.isValid() ? {} : cell.toJSON();

      if (cell.isValid()) {
        summary.counts = {
          vertices: cell._private.digraph.verticesCount(),
          edges: cell._private.digraph.edgesCount(),
          artifacts: {
            cm: cell._private.digraph.outDegree("INDEX_CM"),
            apm: cell._private.digraph.outDegree("INDEX_APM"),
            top: cell._private.digraph.outDegree("INDEX_TOP"),
            act: cell._private.digraph.outDegree("INDEX_ACT")
          }
        };
      } // if cell.isValid()


      response.result = {
        isValid: cell.isValid(),
        summary: summary,
        // toJSON: cell.toJSON(),
        opcConfig: cell.getCMConfig({
          type: "CM"
        }),
        cmat: cell.getCMConfig({
          type: "CMAT"
        }) // CellModel Artifact Tree (CMAT)

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