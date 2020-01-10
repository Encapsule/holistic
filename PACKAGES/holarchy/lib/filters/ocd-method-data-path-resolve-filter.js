"use strict";

// ocd-method-data-path-resolve-filter.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "RNUkdw8VT8WLz5H_i-SwYg",
  operationName: "Data Path Resolve Filter",
  operationDescription: "Optionally converts an OPM binding path-relative path to a fully-qualified OCD path.",
  inputFilterSpec: {
    ____label: "Data Path Resolve Request",
    ____description: "Creates a full-qualified OCD data path given a full-qualified OPM binding path, and binding-relative path.",
    ____types: "jsObject",
    opmBindingPath: {
      ____label: "OPM Binding Path",
      ____description: "The fully-qualified OCD path associated with an OPM instance in the OCD.",
      ____accept: "jsString"
    },
    dataPath: {
      ____label: "Resolve Path",
      ____description: "A fully-qualified OCD path. Or, a relative path to be converted by this filter using opmBindingPath.",
      ____accept: "jsString"
    }
  },
  outputFilterSpec: {
    ____label: "OCD Data Path",
    ____description: "A fully-qualified OCD data path.",
    ____accept: "jsString"
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;

      if (!request_.dataPath.startsWith("#")) {
        if (!request_.dataPath.startsWith("~")) {
          errors.push("Invalid dataPath '".concat(request_.dataPath, "' must be fully-qualified (begins w/'~'). Or, relative to the OPM binding path (begins w/'#')."));
          break;
        }

        response.result = request_.dataPath;
        break;
      }

      if (!request_.opmBindingPath.startsWith("~")) {
        errors.push("Invalid opmBindingPath '".concat(request_.opmBindingPath, "' must be fully-qualified (begins w/'~')."));
        break;
      }

      var bindPathTokens = request_.opmBindingPath.split(".");
      var dataPathTokens = request_.dataPath.split(".");
      dataPathTokens.shift(); // dump the leading # that represents the opmBindingPath

      while (dataPathTokens.length) {
        var dataPathToken = dataPathTokens.shift();

        if (dataPathToken !== "//") {
          bindPathTokens.push(dataPathToken);
        } else {
          if (bindPathTokens.length === 1) {
            errors.push("Invalid dataPath '".concat(request_.dataPath, "' references namespace at or above the anonymous '~' namespace."));
            break;
          }

          bindPathTokens.pop();
        }
      }

      if (!errors.length) {
        response.result = bindPathTokens.join(".");
      }

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