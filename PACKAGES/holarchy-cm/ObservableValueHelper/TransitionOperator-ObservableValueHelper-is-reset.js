"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TransitionOperator-ObservableValueHelper-is-reset.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var operatorName = "".concat(cmLabel, " Is Reset");

  var lib = require("./lib");

  var operator = new holarchy.TransitionOperator({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      TOP: "isReset"
    }).result.TOPID,
    name: operatorName,
    description: "Returns Boolean true if the specified ObservableValueHelper cell is linked to the target ObservableValue cell's provider cell process.",
    operatorRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          operators: {
            ____types: "jsObject",
            ObservableValueHelper: {
              ____types: "jsObject",
              isReset: {
                ____types: "jsObject",
                path: {
                  ____accept: "jsString",
                  ____defaultValue: "#"
                }
              }
            }
          }
        }
      }
    },
    bodyFunction: function bodyFunction(operatorRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = operatorRequest_.operatorRequest.holarchy.common.operators.ObservableValueHelper.isReset; // Query the cell process step of the indicated ObservableValueHelper cell.

        var operatorRequest = _objectSpread(_objectSpread({}, operatorRequest_), {}, {
          operatorRequest: {
            CellProcessor: {
              cell: {
                cellCoordinates: messageBody.path,
                query: {
                  inStep: {
                    apmStep: "observable-value-helper-reset"
                  }
                }
              }
            }
          }
        });

        var operatorResponse = operatorRequest_.context.transitionDispatcher.request(operatorRequest);

        if (operatorResponse.error) {
          errors.push(operatorResponse.error);
          break;
        }

        var operatorFilter = operatorResponse.result;
        response = operatorFilter.request(operatorRequest);
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (!operator.isValid()) {
    throw new Error(operator.toJSON());
  }

  module.exports = operator;
})();