"use strict";

// cpp-proxy-action-operator-request.js

/*
  NOTE: WE EXPECT THIS MODULE TO BE COMPLETELY DEPRECATED BY THE VIRTUALIZATION OF CELL PROCESS PROXY
  IN THE OCD LAYER BELOW OPC PLANNED FOR v0.0.48 PLATFORM RELEASE. MEANWHILE, IT IS REQUIRED TO
  MAINTAIN THIS SHIM IN ORDER TO AFFECT A SINGLE-LEVEL INDIRECTION VIA A CONNECTED CELLPROCESSPROXY HELPER
  CELL INSTANCE.

  For v0.0.47-alexandrite release that seeks to establish self-consistent patterns for inter-cell
  and inter-cell-process communication (both are often required simultaneously) we will require that,
  consistent w/new guidelines, any attempt to call this shim will be assumed to have been delegated
  via new CPM actOn or OpOn action/operator request call. And, it always the responsibility of
  actOn and OpOn to delegate using the appropriate binding path. In this case, that means that this
  filter should only be called when passed request.originalRequestToProxy.context.apmBindingPath
  that resolves to a cell that's bound to CPP APM. Otherwise it should fail.

*/
var arccore = require("@encapsule/arccore");

var cppGetStatusFilter = require("./cpp-get-status-filter"); // This module is exported into lib/index.js. But, so is cpp-get-status-filter. So, we'll just grab what we need here.


var factoryResponse = arccore.filter.create({
  operationID: "3jzAnKzYTrqfbOggqk_FUw",
  operationName: "cppLib: Proxy Action/Operator Request Helper",
  operationDescription: "Implements the actual proxy logic (generially) for both action and operator requests.",
  inputFilterSpec: {
    ____types: "jsObject",
    originalRequestToProxy: {
      ____accept: "jsObject"
    },
    requestType: {
      ____accept: "jsString",
      ____inValueSet: ["action", "operator"]
    }
  },
  outputFilterSpec: {
    ____opaque: true
  },
  // we know nothing of this
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.requestType === "action" ? request_.originalRequestToProxy.actionRequest.holarchy.CellProcessProxy.proxy : request_.originalRequestToProxy.operatorRequest.holarchy.CellProcessProxy.proxy; // This ensures we're addressing an actual CellProcessProxy-bound cell. And, get us a copy of its memory and its current connection state.

      var proxyHelperPath = request_.originalRequestToProxy.context.apmBindingPath;
      var cppLibResponse = cppGetStatusFilter.request({
        proxyHelperPath: proxyHelperPath,
        ocdi: request_.originalRequestToProxy.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push("Cannot locate the cell process proxy cell instance.");
        errors.push("Failed to resolve request from cell '".concat(request_.originalRequestToProxy.context.apmBindingPath, "' to access cell proxy helper at '").concat(proxyHelperPath, "'."));
        errors.push(cppLibResponse.error);
        break;
      }

      var cppMemoryStatusDescriptor = cppLibResponse.result;

      switch (cppMemoryStatusDescriptor.status) {
        case "connected":
          switch (request_.requestType) {
            case "action":
              response = request_.originalRequestToProxy.context.act({
                actorName: "Cell Process Proxy: Action Request Forwarder",
                actorTaskDescription: "Forwarding action request through connected proxy instance to local cell process.",
                actionRequest: message.actionRequest,
                apmBindingPath: cppMemoryStatusDescriptor.data.lcpConnect
              });
              break;

            case "operator":
              var operatorRequest = {
                context: {
                  apmBindingPath: cppMemoryStatusDescriptor.data.lcpConnect,
                  ocdi: request_.originalRequestToProxy.context.ocdi,
                  transitionDispatcher: request_.originalRequestToProxy.context.transitionDispatcher
                },
                operatorRequest: message.operatorRequest
              };
              response = request_.originalRequestToProxy.context.transitionDispatcher.request(operatorRequest);

              if (response.error) {
                errors.push(response.error);
                break;
              }

              var operatorFilter = response.result;
              response = operatorFilter.request(operatorRequest);

              if (response.error) {
                errors.push(response.error);
                break;
              }

              break;
          }

          break;

        case "disconnected":
          errors.push("Invalid attempt to proxy an ".concat(request_.requestType, " request through a disconnected cell proxy."));
          break;

        case "broken":
          errors.push("Invalid attempt to proxy an ".concat(request_.requestType, " request through a broken cell proxy connection."));
          break;

        default:
          errors.push("INTERNAL ERROR: Unknown cpp status '".concat(cppMemoryStatusDescriptor.status, "'."));
          break;
      }

      if (errors.length) {
        errors.unshift("During attempt to proxy an ".concat(request_.requestType, " request through the proxy:"));
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;