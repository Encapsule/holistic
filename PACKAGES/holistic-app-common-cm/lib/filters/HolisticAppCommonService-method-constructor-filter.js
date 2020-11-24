"use strict";

// HolisticAppCommonService-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "P9-aWxR5Ts6AhYSQ7Ymgbg",
  operationName: "HolisticAppCommonService::constructor Filter",
  operationDescription: "Validates/normalizes a HolisticAppCommonService::constructor function request descriptor object. And, returns the new instance's private state data.",
  inputFilterSpec: {
    ____opaque: true
  },
  outputFilterSpec: {
    ____accept: "jsObject" // TODO

  },
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