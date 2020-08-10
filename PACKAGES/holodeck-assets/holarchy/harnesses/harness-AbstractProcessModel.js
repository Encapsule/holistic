"use strict";

var holodeck = require("@encapsule/holodeck");

var holarchy = require("@encapsule/holarchy");

var factoryResponse = holodeck.harnessFactory.request({
  id: "mC3pPO5wS3SxvhgZgMjsJQ",
  name: "AbstractProcessModel Harness",
  description: "Constructs an instance of ES6 class AbstractProcessModel that is serialized and passed back as response.result.",
  // idempotent
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        AbstractProcessModel: {
          ____types: "jsObject",
          constructorRequest: {
            // Either a AbstractProcessModel constructor request object or pre-constructed AbstractProcessModel class instance reference.
            ____opaque: true
          }
        }
      }
    }
  },
  // testVectorRequestInputSpec
  testVectorResultOutputSpec: {
    ____accept: "jsObject" // TODO: Tighten this up

  },
  // testVectorResultOutputSpec
  harnessBodyFunction: function harnessBodyFunction(request_) {
    var messageBody = request_.vectorRequest.holistic.holarchy.AbstractProcessModel;
    var abstractProcessModel = messageBody.constructorRequest instanceof holarchy.AbstractProcessModel ? messageBody.constructorRequest : new holarchy.AbstractProcessModel(messageBody.constructorRequest);
    var response = {
      error: null,
      result: {
        isValid: abstractProcessModel.isValid(),
        toJSON: abstractProcessModel.toJSON(),
        getID: abstractProcessModel.getID(),
        getName: abstractProcessModel.getName(),
        getDescription: abstractProcessModel.getDescription(),
        getDataSpec: abstractProcessModel.getDataSpec(),
        getDigraph: abstractProcessModel.getDigraph()
      }
    };
    return response;
  } // harnessBodyFunction

});

if (factoryResponse.error) {
  throw new Erorr(factoryResponse.error);
}

module.exports = factoryResponse.result;