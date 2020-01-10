"use strict";

// sources/client/app-data-model/transition-operators/transition-operator-filterError.js
var transitionOperatorFilterFactory = require("../app-state-controller-toperator-factory");

var getNamespaceInReferenceFromPath = require("../../../../common/data/get-namespace-in-reference-from-path");

var factoryResponse = transitionOperatorFilterFactory.request({
  id: "CWvqXpHdSoquxErVZwW3pg",
  name: "filterError Transition Operator",
  description: "Evaluates an ARCcore.filter response object's `error` value and returns true iff it the value is not the null type.",
  operatorFilterSpec: {
    ____types: "jsObject",
    filterError: {
      ____label: "Filter Response Path",
      ____accept: "jsString"
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: false
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var innerResponse = getNamespaceInReferenceFromPath.request({
        namespacePath: request_.operator.filterError + ".error",
        sourceRef: request_.context.appDataStore
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      response.result = innerResponse.result === null ? false : true;
      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  }
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;