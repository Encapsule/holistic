"use strict";

// TransitionOperator-cpp-proxy-logical-state-disconnect.js
var TransitionOperator = require("../../../TransitionOperator");

var cppLib = require("./lib");

var transitionOperator = new TransitionOperator({
  id: "1SC437izTgKckxxWUq6cbQ",
  name: "Cell Process Proxy: Proxy State Disconnected",
  description: "Returns Boolean true if the cell process proxy helper cell is logically disconnected from a shared local cell process.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessProxy: {
        ____types: "jsObject",
        isDisconnected: {
          ____accept: "jsObject"
        }
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
      var cppLibResponse = cppLib.getStatus.request({
        proxyHelperPath: request_.context.apmBindingPath,
        ocdi: request_.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push(cppLibResponse.error);
        break;
      }

      response.result = cppLibResponse.result.status === "disconnected";
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!transitionOperator.isValid()) {
  throw new Error(transitionOperator.toJSON());
}

module.exports = transitionOperator;