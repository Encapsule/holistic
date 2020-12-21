"use strict";

// metadata-org-get
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

    if (!appMetadataStore.isVertex("__org")) {
      errors.unshift("Unable to locate organizational metadata in the application data store!");
      break;
    }

    response.result = appMetadataStore.getVertexProperty("__org");
    break;
  }

  if (errors.length) {
    response.error = errors.join(" ");
  }

  return response;
};