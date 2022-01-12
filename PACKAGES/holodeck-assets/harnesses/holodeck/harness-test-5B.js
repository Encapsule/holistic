"use strict";

// harness-filter-5B.js
var arccore = require("@encapsule/arccore");

var holodeck = require("@encapsule/holodeck");

var factoryResponse = holodeck.harnessFactory.request({
  id: "SP1HKRvJTNaq7-r-XhPYMg",
  name: "Holodeck Runner Test #5B",
  description: "Simple test endpoint that echos back a message.",
  harnessOptions: {
    idempotent: false,
    gitDiffHunkSize: 0
  },
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    testMessage5B: {
      ____types: "jsObject",
      message: {
        ____accept: "jsString"
      }
    }
  },
  testVectorResultOutputSpec: {
    ____opaque: true
  },
  harnessBodyFunction: function harnessBodyFunction(request_) {
    return {
      error: null,
      result: request_.vectorRequest.testMessage5B.message
    };
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;