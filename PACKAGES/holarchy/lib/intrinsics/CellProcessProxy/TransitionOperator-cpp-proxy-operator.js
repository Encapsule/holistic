"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/TransitionOperator-cpp-proxy-operator.js
var TransitionOperator = require("../../../TransitionOperator");

var cppLib = require("./lib");

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
          // Proxy (i.e. forward through) this proxy to another local cell process...
          proxyPath: {
            ____accept: "jsString",
            ____defaultValue: "#"
          },
          // ... an arbitrary TransitionOperator request.
          operatorRequest: {
            ____accept: "jsObject"
          }
        }
      }
    }
  },
  bodyFunction: function bodyFunction(request_) {
    return cppLib.proxyActionOperatorRequest.request({
      requestType: "operator",
      originalRequestToProxy: request_
    });
  }
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;