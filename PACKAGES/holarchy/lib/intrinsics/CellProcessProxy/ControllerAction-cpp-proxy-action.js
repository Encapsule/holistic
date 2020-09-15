"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/ControllerAction-cpp-proxy-action.js
var ControllerAction = require("../../../lib/ControllerAction");

var action = new ControllerAction({
  id: "rua1glcmTsOlYcfpZuiXnA",
  name: "Cell Process Proxy: Proxy Action",
  description: "Forwards the specified action request to the local cell process to which the proxy is currently connected.",
  actionRequestSpec: {
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
          // ... an arbitrary ControllerAction request.
          actionRequest: {
            ____accept: "jsObject"
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsObject" // TODO

  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  }
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;