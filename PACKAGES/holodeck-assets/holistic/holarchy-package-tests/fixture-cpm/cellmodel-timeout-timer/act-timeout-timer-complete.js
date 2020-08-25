"use strict";

// act-timeout-timer-complete.js
module.exports = {
  id: "VHByX1LLQSuKIAQW4Ws0Aw",
  name: "Complete Timeout Timer Expired Action",
  description: "Inform the timeout timer cell process that the timeout timer has expired; the time timeout has ellapsed.",
  actionRequestSpec: {
    ____types: "jsObject",
    completeTimeoutTimer: {
      ____types: "jsObject"
    }
  },
  actionResultSpec: {
    ____types: "jsUndefined"
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true; // Attempt to read the cell process memory namespace.

      var ocdResponse = request_.context.ocdi.readNamespace(request_.context.apmBindingPath);

      if (ocdResponse.error) {
        // This means that the cell process has been deleted and that its APM binding namespace no longer exists.
        // But, this isn't really an error as we support the hard cancellation of an timeout timer process via cell process delete.
        // So, no error. And, we're done.
        break;
      }

      var cellMemory = ocdResponse.result;
      cellMemory["private"].timeoutTimer = null;
      cellMemory.outputs.timeoutEllapsed = cellMemory.construction.timeoutMs;
      ocdResponse = request_.context.ocdi.writeNamespace(request_.context.apmBindingPath, cellMemory);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
};