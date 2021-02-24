"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/TransitionOperator-cpp-proxy-operator.js
var TransitionOperator = require("../../../TransitionOperator");

var cppLib = require("./lib"); // TO BE REMOVED in v0.0.48!


var action = new TransitionOperator({
  id: "FTxze-WaRp6HS0Dlr_Ke6A",
  name: "Cell Process Proxy: Proxy Operator",
  description: "Forwards the specified operator request to the local cell process to which the proxy is currently connected.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessProxy: {
        ____types: "jsObject",
        proxy: {
          ____types: "jsObject",
          // ... an arbitrary TransitionOperator request.
          operatorRequest: {
            ____accept: "jsObject"
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
      var proxyResponse = cppLib.proxyActionOperatorRequest.request({
        requestType: "operator",
        originalRequestToProxy: request_
      });

      if (proxyResponse.error) {
        errors.push("Unable to proxy operator request due to error:");
        errors.push(proxyResponse.error);
        break;
      }

      response.result = proxyResponse.result;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;