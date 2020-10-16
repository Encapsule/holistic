"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TransitionOperator-cpm-operator-request-on.js
var TransitionOperator = require("../../../TransitionOperator");

var ObservableControllerData = require("../../../lib/ObservableControllerData");

var cpmLib = require("./lib");

var transitionOperator = new TransitionOperator({
  id: "DxL0zD_ERu-0kNGX2FvoGg",
  name: "Cell Process Manager: Operator Request On Cell (opOn)",
  description: "Generically re-routes the TransitionOperator request specified by operatorRequest to the active cell indicated by apmBindingPath + path, or path (iff path is fully-qualified).",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        opOn: {
          ____types: "jsObject",
          cellPath: {
            ____accept: "jsString",
            ____defaultValue: "#"
          },
          cellProcessCoordinates: {
            ____types: ["jsUndefined", "jsObject"],
            apmID: {
              ____accept: "jsString"
            },
            instanceName: {
              ____accept: "jsString",
              ____defaultValue: "singleton"
            }
          },
          cellProcessID: {
            ____accept: ["jsUndefined", "jsString"]
          },
          operatorRequest: {
            ____accept: "jsObject"
          }
        }
      }
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var messageBody = request_.operatorRequest.holarchy.CellProcessor.opOn;
      var ocdResponse = ObservableControllerData.dataPathResolve({
        dataPath: messageBody.cellPath,
        apmBindingPath: request_.context.apmBindingPath
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var targetCellPath = ocdResponse.result;
      var operatorResponse = request_.context.transitionDispatcher.request({
        context: _objectSpread(_objectSpread({}, request_.context), {}, {
          apmBindingPath: targetCellPath
        }),
        operatorRequest: messageBody.operatorRequest
      });

      if (operatorResponse.error) {
        errors.push("Unable to resolve TransitionOperator plug-in to process specified request:");
        errors.push(operatorResponse.error);
        errros.push("Check the format of your TransitionOperator request for syntax error(s). Failing that, possibly you have failed to register CellModel's?");
        break;
      }

      var operatorFilter = operatorResponse.result;
      operatorResponse = operatorFilter.request({
        context: _objectSpread(_objectSpread({}, request_.context), {}, {
          apmBindingPath: targetCellPath
        }),
        operatorRequest: messageBody.operatorRequest
      });

      if (operatorResponse.error) {
        errors.push("We were not able to delegate your TransitionOperator request to a plug-in. However, the plug-in subsequently rejected your request with error:");
        errors.push(operatorResponse.error);
        errors.push("Check the details of TransitionOperator plug-in to ensure you're calling it correctly.");
        break;
      }

      response.result = operatorResponse.result;
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