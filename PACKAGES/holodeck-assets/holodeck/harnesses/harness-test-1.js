"use strict";

// harness-filter-1.js
var holodeck = require("@encapsule/holodeck");

var factoryResponse = holodeck.harnessFactory.request({
  id: "F1zguurrS9-fcdvLk7TCrg",
  name: "Holodeck Runner Test Harness #1",
  description: "A simple holodeck test harness filter to test out the runner.",
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    testMessage1: {
      ____accept: "jsString"
    }
  },
  testVectorResultOutputSpec: {
    ____accept: "jsString"
  },
  harnessBodyFunction: function harnessBodyFunction(request_) {
    return {
      error: null,
      result: request_.vectorRequest.testMessage1
    };
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;