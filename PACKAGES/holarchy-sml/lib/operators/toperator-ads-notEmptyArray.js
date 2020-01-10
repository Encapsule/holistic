"use strict";

// sources/client/app-data-model/transition-operators/transition-operator-notEmpty-filter.js
var transitionOperatorFilterFactory = require("../app-state-controller-toperator-factory");

var getNamespaceInReferenceFromPath = require("../../../../common/data/get-namespace-in-reference-from-path");

var factoryResponse = transitionOperatorFilterFactory.request({
  id: "Boq9DbFDS8yYxPOYAvX8-w",
  name: "isEmpty Transition Expression Operator",
  description: "Transition operator to check if the contents of a mailbox from the app data store is not null or empty",
  operatorFilterSpec: {
    ____types: "jsObject",
    notEmpty: {
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
        namespacePath: request_.operator.notEmpty,
        sourceRef: request_.context.appDataStore
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      if (innerResponse.result && innerResponse.result.length > 0) response.result = true;
      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  }
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;