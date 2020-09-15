"use strict";

// TransitionOperator-cpp-proxy-logical-state-connected.js
var TransitionOperator = require("../../../lib/TransitionOperator");

var cppLib = require("./lib");

var transitionOperator = new TransitionOperator({
  id: "aRz-bXOaSY-77jGIvSLFvw",
  name: "Cell Process Proxy: Proxy State Connected",
  description: "Returns Boolean true if the cell process proxy helper cell is logically connected to an owned or shared local cell process.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessProxy: {
        ____types: "jsObject",
        isConnected: {
          ____types: "jsObject",
          proxyPath: {
            ____accept: "jsString",
            ____defaultValue: "#"
          }
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
      var message = request_.operatorRequest.holarchy.CellProcessProxy.isConnected;
      var cppLibResponse = cppLib.getStatus.request({
        apmBindingPath: request_.context.apmBindingPath,
        proxyPath: message.proxyPath,
        ocdi: request_.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push(cppLibResponse.error);
        break;
      }

      response.result = cppLibResponse.result.status === "connected";
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