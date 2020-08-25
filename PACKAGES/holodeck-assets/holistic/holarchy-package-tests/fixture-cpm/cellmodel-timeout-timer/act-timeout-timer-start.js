"use strict";

// act-timeout-timer-start.js
var holarchy = require("@encapsule/holarchy");

var OCD = holarchy.ObservableControllerData;
module.exports = {
  id: "HmyZa9CNQMuD6cRMa0FcfA",
  name: "Start Timeout Timer Action",
  description: "Starts a JavaScript timeout timer managed by the timeout timer cell process.",
  actionRequestSpec: {
    ____types: "jsObject",
    startTimeoutTimer: {
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
        errors.push(ocdResponse.error);
        break;
      }

      var cellMemory = ocdResponse.result;
      var timeoutTimer = setTimeout(function () {
        console.log("YOOOOO!!!!");
        var actionRequest = {
          actorName: "External setTimeout Callback",
          actorTaskDescription: "Process the timeout timer event.",
          actionRequest: {
            completeTimeoutTimer: {}
          },
          apmBindingPath: request_.context.apmBindingPath
        };
        var actionResponse = request_.context.act(actionRequest);

        if (actionResponse.error) {
          // TODO: We do not have any standard way of dealing with this sort of thing now.
          throw new Error(actionResponse.error);
        } // and return to code we do not control

      }, cellMemory.construction.timeoutMs);
      ocdResponse = OCD.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#.private.timeoutTimer"
      });

      if (ocdResponse.error) {
        clearTimeout(timeoutTimer);
        errors.push(ocdResponse.error);
        break;
      }

      var pathTimeoutTimer = ocdResponse.result;
      ocdResponse = request_.context.ocdi.writeNamespace(pathTimeoutTimer, timeoutTimer);

      if (ocdResponse.error) {
        clearTimeout(timeoutTimer);
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