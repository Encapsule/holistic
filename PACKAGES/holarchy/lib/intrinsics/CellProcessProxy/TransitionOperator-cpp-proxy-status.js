"use strict";

// TransitionOperator-cpp-proxy-status.js
var arccore = require("@encapsule/arccore");

var ObservableControllerData = require("../../../lib/ObservableControllerData");

var TransitionOperator = require("../../../TransitionOperator");

var cppLib = require("./lib");

var transitionOperator = new TransitionOperator({
  id: "c-n6U_maQa23j9jWFDsgOw",
  name: "Cell Process Proxy: Proxy Status",
  description: "Returns Boolean true if the cell process proxy helper cell was logically connected to an owned local cell process that has been deleted.",
  operatorRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      proxy: {
        ____types: "jsObject",
        proxyCoordinates: {
          ____label: "Cell Process Proxy Helper Cell Coordinates Variant (Optional)",
          ____accept: "jsString",
          ____defaultValue: "#"
        },
        connect: {
          ____types: "jsObject",
          statusIs: {
            ____accept: "jsString",
            ____inValueSet: ["connected", "disconnected", "broken"]
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
      var messageBody = request_.operatorRequest.CellProcessor.proxy;

      if (arccore.identifier.irut.isIRUT(messageBody.proxyCoordinates).result) {
        errors.push("Cannot resolve location of the cell process proxy helper cell to link given a cell process ID!");
        break;
      }

      var ocdResponse = ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: messageBody.proxyCoordinates
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var proxyHelperPath = ocdResponse.result;
      var cppLibResponse = cppLib.getStatus.request({
        proxyHelperPath: proxyHelperPath,
        ocdi: request_.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push(cppLibResponse.error);
        break;
      } // Okay - we're talking to an active CellProcessProxy helper cell.


      var cppMemoryStatusDescriptor = cppLibResponse.result;
      response.result = cppMemoryStatusDescriptor.status === messageBody.connect.statusIs;
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