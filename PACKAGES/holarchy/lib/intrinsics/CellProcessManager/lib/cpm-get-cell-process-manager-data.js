"use strict";

// cpm-get-cell-process-manager-data.js
var arccore = require("@encapsule/arccore");

var cpmMountingNamespaceName = require("../../../filters/cpm-mounting-namespace-name");

var cpmDataPath = "~.".concat(cpmMountingNamespaceName);
var factoryResponse = arccore.filter.create({
  operationID: "0nrwHYIeQEamsFGAU52gmQ",
  operationName: "cpmLib: Get Cell Process Data Descriptor",
  operationDescription: "Retrieves a copy of the current CPM process data and its OCD path.",
  inputFilterSpec: {
    ____types: "jsObject",
    ocdi: {
      ____accept: "jsObject"
    }
  },
  outputFilterSpec: {
    ____types: "jsObject",
    data: {
      ____accept: "jsObject"
    },
    path: {
      ____accept: "jsString"
    } // where we read it from in OCD (and where it should be written back if mutated)

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var ocdResponse = request_.ocdi.readNamespace(cpmDataPath);

      if (ocdResponse.error) {
        errors.push("Internal error: Something has gone horribly wrong...");
        errors.push(ocdResponse.error);
        break;
      }

      response.result = {
        data: ocdResponse.result,
        path: cpmDataPath
      };
      break;
    } // end while


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