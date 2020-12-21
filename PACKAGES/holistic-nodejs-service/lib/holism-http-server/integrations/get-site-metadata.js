"use strict";

// metadata-site-get.js
var arccore = require("@encapsule/arccore");

module.exports = function (request_) {
  console.log("..... " + this.operationID + "::" + this.operationName);
  var response = {
    error: null,
    result: null
  };
  var errors = [];
  var inBreakScope = false;

  while (!inBreakScope) {
    inBreakScope = true; // Dereference the application metadata store subsystem in the application context namespace.

    var appMetadataStore = request_.appStateContext.appMetadataStore;

    if (!appMetadataStore) {
      errors.unshift("Unable to dereference the application metadata store!");
      break;
    }

    if (!appMetadataStore.isVertex("__app")) {
      errors.unshift("Unable to locate app/site/service (whatever you want to call your holistic app) metadata in the application metadata store!");
      break;
    }

    response.result = appMetadataStore.getVertexProperty("__app");
    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  }

  return response;
};