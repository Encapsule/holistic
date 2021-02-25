"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/ControllerAction-cpp-proxy-action.js
var ControllerAction = require("../../../ControllerAction");

var cppLib = require("./lib"); // TO BE REMOVED in v0.0.48!


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
        errors.push("Unable to proxy action request due to error:");
        errors.push(proxyResponse.error);
        break;
      }

      response.result = proxyResponse.result.actionResult;
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