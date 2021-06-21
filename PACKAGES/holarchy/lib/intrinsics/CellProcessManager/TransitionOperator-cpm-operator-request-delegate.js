"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TransitionOperator-cpm-operator-request-delegate.js
var TransitionOperator = require("../../../TransitionOperator");

var ObservableControllerData = require("../../../lib/ObservableControllerData");

var cpmLib = require("./lib");

var transitionOperator = new TransitionOperator({
  id: "DxL0zD_ERu-0kNGX2FvoGg",
  name: "Cell Process Manager: Operator Request Delegate To Cell",
  description: "Generically re-routes the TransitionOperator request specified by operatorRequest to the active cell indicated by apmBindingPath + path, or path (iff path is fully-qualified).",
  operatorRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      cell: {
        ____types: "jsObject",
        cellCoordinates: {
          ____types: ["jsString", // If a string, then the caller-supplied value must be either a fully-qualified or relative path to a cell. Or, an IRUT that resolves to a known cellProcessID.
          "jsObject" // If an object, then the caller has specified the low-level apmID, instanceName coordinates directly.
          ],
          ____defaultValue: "#",
          apmID: {
            ____accept: "jsString"
          },
          instanceName: {
            ____accept: "jsString",
            ____defaultValue: "singleton"
          }
        },
        delegate: {
          ____types: "jsObject",
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
      var messageBody = request_.operatorRequest.CellProcessor.cell;
      var unresolvedCoordinates = messageBody.cellCoordinates;

      if (Object.prototype.toString.call(unresolvedCoordinates) === "[object String]" && unresolvedCoordinates.startsWith("#")) {
        var ocdResponse = ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: unresolvedCoordinates
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        unresolvedCoordinates = ocdResponse.result;
      }

      var cpmLibResponse = cpmLib.resolveCellCoordinates.request({
        coordinates: unresolvedCoordinates,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        break;
      }

      var targetCellPath = cpmLibResponse.result.cellPath;
      var operatorResponse = request_.context.transitionDispatcher.request({
        context: _objectSpread(_objectSpread({}, request_.context), {}, {
          apmBindingPath: targetCellPath
        }),
        operatorRequest: messageBody.delegate.operatorRequest
      });

      if (operatorResponse.error) {
        errors.push("Unrecognized TransitionOperator request format; unable to resolve plug-in filter.");
        errors.push(operatorResponse.error);
        break;
      }

      var operatorFilter = operatorResponse.result;
      operatorResponse = operatorFilter.request({
        context: _objectSpread(_objectSpread({}, request_.context), {}, {
          apmBindingPath: targetCellPath
        }),
        operatorRequest: messageBody.delegate.operatorRequest
      });

      if (operatorResponse.error) {
        errors.push("TransitionOperator plug-in failed while processing delegated operator request.");
        errors.push(operatorResponse.error);
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