"use strict";

// harness-filter-3.js
var holodeck = require("@encapsule/holodeck");

var factoryResponse = holodeck.harnessFactory.request({
  id: "EmU3C0AASciHnBpz-xMmgA",
  name: "Holodeck Runner Test Harness #3",
  description: "A simple holodeck test harness filter to test out the runner.",
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    testMessage3: {
      ____types: "jsObject",
      message: {
        ____accept: "jsString"
      }
    }
  },
  harnessBodyFunction: function harnessBodyFunction(request_) {
    if (request_.vectorRequest.testMessage3.message === "error") {
      return {
        error: "We were asked to report an error."
      };
    }

    return {
      error: null,
      result: request_.vectorRequest.testMessage3.message
    };
  },
  testVectorResultOutputSpec: {
    ____accept: "jsString"
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;