"use strict";

// cpp-proxy-action-operator-request.js
var arccore = require("@encapsule/arccore");

var cppGetStatusFilter = require("./cpp-get-status-filter");

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
      var message = request_.requestType === "action" ? request_.originalRequestToProxy.actionRequest.holarchy.CellProcessProxy.proxy : request_.originalRequestToProxy.operatorRequest.holarchy.CellProcessProxy.proxy; // This ensures we're addressing an actual CellProcessProxy-bound cell.
      // And, get us a copy of its memory and its current connection state.

      var cppLibResponse = cppGetStatusFilter.request({
        apmBindingPath: request_.originalRequestToProxy.context.apmBindingPath,
        proxyPath: message.proxyPath,
        ocdi: request_.originalRequestToProxy.context.ocdi
      });

      if (cppLibResponse.error) {
        errors.push("Cannot locate the cell process proxy cell instance.");
        errors.push("Failed to resolve request from cell '".concat(request_.originalRequestToProxy.context.apmBindingPath, "' to access cell proxy helper at '").concat(message.proxyPath, "'."));
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
        errors.push("Requesting cell path '".concat(cppMemoryStatusDescriptor.paths.apmBindingPath, "' (we presume the owner of the cell proxy helper)."));
        errors.push("The addressed cell proxy helper cell we're looking at is located at '".concat(cppMemoryStatusDescriptor.paths.resolvedPath, "' (and we know it's actually a cell process proxy)."));
        errors.push("And, we're trying to proxy an ".concat(request.requestType, " request through the proxy when this failure occurred."));
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