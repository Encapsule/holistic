"use strict";

// ControllerAction-page-view-udpate-hashroute-query.js
var holarchy = require("@encapsule/holarchy");

var lib = require("./lib");

var action = new holarchy.ControllerAction({
  id: "z6p3A0KZRT6ATx53WQ13QA",
  name: "Page View Update Hashroute Query",
  description: "Tell a PageView process that the URL-encoded query parameter values parsed from the browser's current location.href string have been updated.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      service: {
        ____types: "jsObject",
        view: {
          ____types: "jsObject",
          _private: {
            ____types: "jsObject",
            updateQuery: {
              ____types: "jsObject",
              hashrouteQueryParse: {
                ____types: "jsObject",
                ____asMap: true,
                propName: {
                  ____accept: ["jsNull", "jsString"]
                }
              },
              routerEventNumber: {
                ____accept: "jsNumber"
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsString",
    ____defaultValue: "Okay"
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var libResponse = lib.getStatus.request({
        context: request_.context
      });

      if (libResponse.error) {
        errors.push(libResponse.error);
        break;
      }

      ;
      var cellStatus = libResponse.result;
      var messageBody = request_.actionRequest.holistic.server.view._private.updateQuery;
      cellStatus.cellMemory.routerEventNumber = messageBody.routerEventNumber;
      cellStatus.cellMemory.hashrouteQueryParse = messageBody.hashrouteQueryParse;
      var ocdResponse = request_.context.ocdi.writeNamespace(request_.context.apmBindingPath, cellStatus.cellMemory);

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
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;