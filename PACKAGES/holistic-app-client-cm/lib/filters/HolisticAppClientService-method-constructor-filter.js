"use strict";

// HolisticAppClientService-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "Jrc6uiRXS-aCNcQEDNcTug",
  operationName: "HolisticAppClientService::constructor Filter",
  operationDescription: "Validates/normalizes a HolisticAppClientService::constructor function request descriptor object. And, returns the new instance's private state data.",
  inputFilterSpec: require("./iospecs/app-client-service-method-constructor-input-spec"),
  outputFilterSpec: require("./iospecs/app-client-service-method-constructor-output-spec"),
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null,
      result: {
        test: "fake result"
      }
    };
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;