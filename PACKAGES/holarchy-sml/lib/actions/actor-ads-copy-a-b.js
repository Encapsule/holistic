"use strict";

// sources/client/app-state-controller/actors/actor-ads-copy-a-b.js
//
// Overwrites namespace `b` with a reference to namespace `a` in the app data store.
//
var getNamespaceInReferenceFromPath = require("../../../common/data/get-namespace-in-reference-from-path");

module.exports = {
  id: "TTokaBEHQN-GmquAF9TkFQ",
  name: "App Data Store Copy A > B",
  description: "Overwrites a namespace (b) in the app data store with the contents of another (a).",
  commandSpec: {
    ____types: "jsObject",
    copy: {
      ____types: "jsObject",
      a: {
        ____accept: "jsString"
      },
      b: {
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
        namespacePath: request_.command.copy.a,
        sourceRef: request_.runtimeContext.appStateContext.appDataStore
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var sourceA = innerResponse.result;
      var bTokens = request_.command.copy.b.split(".");
      var targetNamespace = bTokens.pop();
      var destinationNamespaceParent = bTokens.join(".");
      innerResponse = getNamespaceInReferenceFromPath.request({
        namespacePath: destinationNamespaceParent,
        sourceRef: request_.runtimeContext.appStateContext.appDataStore
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        break;
      }

      var destinationParent = innerResponse.result;
      destinationParent[targetNamespace] = sourceA;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
};