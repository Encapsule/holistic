"use strict";

// sources/client/app-state-controller/lib/toperators/toperator-ads-equal-a-b.js
var transitionOperatorFilterFactory = require("../app-state-controller-toperator-factory");

var getNamespaceInReferenceFromPath = require("../../../../common/data/get-namespace-in-reference-from-path");

var factoryResponse = transitionOperatorFilterFactory.request({
  id: "3Zp5XUIcR6-q_tZnoqZ33w",
  name: "EQUAL A/B (ADS) Transition Expression Operator",
  description: "Retrieves two values, a and b, from the ADS and compares them using JavaScript === operator.",
  operatorFilterSpec: {
    ____types: "jsObject",
    equal: {
      ____types: "jsObject",
      a: {
        ____label: "Operand A App Data Store Path",
        ____accept: "jsString"
      },
      b: {
        ____label: "Operand B App Data Store Path",
        ____accept: "jsString"
      }
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
        namespacePath: request_.operator.equal.a,
        sourceRef: request_.context.appDataStore
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var a = innerResponse.result;
      innerResponse = getNamespaceInReferenceFromPath.request({
        namespacePath: request_.operator.equal.b,
        sourceRef: request_.context.appDataStore
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var b = innerResponse.result;
      response.result = a === b;
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