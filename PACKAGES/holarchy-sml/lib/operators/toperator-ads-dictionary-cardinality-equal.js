"use strict";

// sources/client/app-state-controller/lib/toperators/toperator-ads-dictionary-cardinality.js
//
// Returns Boolean true if the cardinality of the indicated dictionary in the ADS is equal to expected value.
//
var transitionOperatorFilterFactory = require("../app-state-controller-toperator-factory");

var getNamespaceInReferenceFromPath = require("../../../../common/data/get-namespace-in-reference-from-path");

var factoryResponse = transitionOperatorFilterFactory.request({
  id: "20lly9lQRO2S-qdMyui3Jg",
  name: "dictionaryCardinalityEqual Transition Expression Operator",
  description: "Transition operator that determines if the count of elements in a dictionary matches expected value.",
  operatorFilterSpec: {
    ____types: "jsObject",
    dictionaryCardinalityEqual: {
      ____types: "jsObject",
      namespace: {
        ____accept: "jsString"
      },
      value: {
        ____accept: "jsNumber",
        ____defaultValue: 0
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
    var commandBody = request_.operator.dictionaryCardinalityEqual;

    while (!inBreakScope) {
      inBreakScope = true;
      var innerResponse = getNamespaceInReferenceFromPath.request({
        namespacePath: commandBody.namespace,
        sourceRef: request_.context.appDataStore
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var targetNamespace = innerResponse.result;
      var targetNamespaceTypeString = Object.prototype.toString.call(targetNamespace);

      if (targetNamespaceTypeString !== "[object Object]") {
        errors.push("Invalid target type '" + targetNamespaceTypeString + "' for namespace '" + commandBody.namespacePath + "'.");
        break;
      }

      response.result = Object.keys(targetNamespace).length === commandBody.value;
      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  }
});
if (factoryResponse.error) throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;