"use strict";

// sources/client/app-state-controller/toperators/toperator-ads-exists.js
var transitionOperatorFilterFactory = require("../app-state-controller-toperator-factory");

var getNamespaceInReferenceFromPath = require("../../../../common/data/get-namespace-in-reference-from-path");

var factoryResponse = transitionOperatorFilterFactory.request({
  id: "6IXhiS0CTtyPXYBA4cECcw",
  name: "exists Transition Expression Operator",
  description: "Returns true iff the specified namespace resolves and is not undefined.",
  operatorFilterSpec: {
    ____types: "jsObject",
    exists: {
      ____label: "ADS Namespace Path",
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
        namespacePath: request_.operator.exists,
        sourceRef: request_.context.appDataStore
      });

      if (innerResponse.error === null && innerResponse.result !== undefined) {
        response.result = true;
      }

      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  }
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;