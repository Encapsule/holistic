"use strict";

// scp-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "7tYVAis3TJGjaEe-6DiKHw",
  operationName: "SoftwareCellProcessor::constructor Filter",
  operationDescription: "Filters request descriptor passed to SoftwareCellProcessor::constructor function.",
  inputFilterSpec: {
    ____label: "Software Cell Processor Descriptor",
    ____description: "A request object passed to the SoftwareCellProcessor ES6 class constructor function.",
    ____types: "jsObject",
    id: {
      ____label: "Processor ID",
      ____description: "A unique version-independent IRUT identifier used to identify this SoftwareModel.",
      ____accept: "jsString" // must be an IRUT

    },
    name: {
      ____label: "Processor Name",
      ____description: "A short name used to refer to this SoftwareCellProcessor.",
      ____accept: "jsString"
    },
    description: {
      ____label: "Processor Description",
      ____description: "A short description of this SoftwareCellProcessor's purpose and/or function.",
      ____accept: "jsString"
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScrope) {
      inBreakScope = true; // For now.

      response.result = request_;
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