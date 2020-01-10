"use strict";

// sources/client/app-state-controller/actors/actor-ads-delete.js
//
// Delete namespace in the app data store.
//
var getNamespaceInReferenceFromPath = require("../../../common/data/get-namespace-in-reference-from-path");

module.exports = {
  id: "RRnl5qncQKGhIPOTsh4wkg",
  name: "App Data Store Delete Namespace",
  description: "Deletes the specified namespace in the app data store.",
  commandSpec: {
    ____types: "jsObject",
    delete: {
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
      var targetNamespacePathTokens = request_.command.delete.split(".");
      var deleteNamespaceName = targetNamespacePathTokens.pop();
      var parentNamespacePath = targetNamespacePathTokens.join(".");
      var innerResponse = getNamespaceInReferenceFromPath.request({
        namespacePath: parentNamespacePath,
        sourceRef: request_.runtimeContext.appStateContext.appDataStore
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var parentNamespace = innerResponse.result;
      delete parentNamespace[deleteNamespaceName];
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
};