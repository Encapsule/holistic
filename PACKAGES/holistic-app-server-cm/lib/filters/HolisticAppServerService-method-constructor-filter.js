"use strict";

// HolisticAppServerService-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "365COUTSRWCt2PLogVt51g",
  operationName: "HolisticAppServerService::constructor Filter",
  operationDescription: "Validates/normalizes a HolisticAppServerService::constructor function request descriptor object. And, returns the new instance's private state data.",
  inputFilterSpec: require("./iospecs/app-server-service-method-constructor-input-spec"),
  outputFilterSpec: require("./iospecs/app-server-service-method-constructor-output-spec"),
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