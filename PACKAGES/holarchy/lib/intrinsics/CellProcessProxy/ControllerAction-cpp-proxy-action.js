"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/ControllerAction-cpp-proxy-action.js
var ControllerAction = require("../../../ControllerAction");

var cppLib = require("./lib");

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
    ____opaque: true // what do we know about this? nothing.

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var proxyResponse = cppLib.proxyActionOperatorRequest.request({
        requestType: "action",
        originalRequestToProxy: request_
      });

      if (proxyResponse.error) {
        errors.push("Unable to proxy action request due to error that occurred in the cell your proxy is connected to.");
        errors.push(proxyResponse.error);
        break;
      }

      response.result = proxyResponse.result;
      break;
    }

    if (errors.length) {
      response.error = error.join(" ");
    }

    return response;
  }
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;