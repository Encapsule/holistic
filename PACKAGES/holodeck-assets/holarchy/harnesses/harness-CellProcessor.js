"use strict";

var holodeck = require("@encapsule/holodeck");

var holarchy = require("@encapsule/holarchy");

var factoryResponse = holodeck.harnessFactory.request({
  id: "UBSclp3gSqCCmSvoG3W4tw",
  name: "CellProcessor Harness",
  description: "Constructs an instance of ES6 class CellProcessor and serializes it for inspection. There's a lot more we plan to do with this later.",
  harnessOptions: {
    idempotent: true
  },
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        CellProcessor: {
          ____types: "jsObject",
          constructorRequest: {
            // CellProcessor constructor request object or pre-constructed CellProcessor class instance reference.
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
      var messageBody = vectorRequest_.vectorRequest.holistic.holarchy.CellProcessor;
      var scpInstance = messageBody.constructorRequest instanceof holarchy.CellProcessor ? messageBody.constructorRequest : new holarchy.CellProcessor(messageBody.constructorRequest);
      response.result = {
        isValid: scpInstance.isValid(),
        toJSON: scpInstance.toJSON()
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