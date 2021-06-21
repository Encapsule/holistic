"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TransitionOperator-ovh-map-is-linked.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var _require = require("./cell-metadata"),
      cmLabel = _require.cmLabel,
      cmDescription = _require.cmDescription;

  var operatorLabel = "mapIsLinked";
  var operatorName = "".concat(cmLabel, "::").concat(operatorLabel);

  var lib = require("./lib");

  var operator = new holarchy.TransitionOperator({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      TOP: operatorLabel
    }).result.TOPID,
    name: operatorName,
    description: "Returns Boolean true if the ObservableValueHelperMap cell contains N > 0 ObservableValueHelper cell(s) (aka signals) AND ObservableValueHelper::isLinked === true for ALL N signal(s).",
    operatorRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          operators: {
            ____types: "jsObject",
            ObservableValueHelperMap: {
              ____types: "jsObject",
              mapIsLinked: {
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
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null,
        result: false
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = request_.operatorRequest.holarchy.common.operators.ObservableValueHelperMap.mapIsLinked;
        var libResponse = lib.getStatus.request(_objectSpread(_objectSpread({}, request_.context), {}, {
          path: messageBody.path
        }));

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var _libResponse$result = libResponse.result,
            cellMemory = _libResponse$result.cellMemory,
            ovhmBindingPath = _libResponse$result.ovhmBindingPath;
        var ovhOperatorTerms = [];
        var signalNames = Object.keys(cellMemory.ovhMap);

        if (signalNames.length === 0) {
          response.result = false;
          break;
        }

        while (signalNames.length) {
          var signalName = signalNames.shift();
          ovhOperatorTerms.push({
            holarchy: {
              common: {
                operators: {
                  ObservableValueHelper: {
                    isLinked: {
                      path: "".concat(messageBody.path, ".ovhMap.").concat(signalName)
                    }
                  }
                }
              }
            }
          });
        }

        var operatorRequestDescriptor = {
          operatorRequest: {
            and: ovhOperatorTerms
          },
          context: request_.context
        };
        var opResponse = request_.context.transitionDispatcher.request(operatorRequestDescriptor);

        if (opResponse.error) {
          errors.push(opResponse.error);
          break;
        }

        var operatorFilter = opResponse.result;
        opResponse = operatorFilter.request(operatorRequestDescriptor);

        if (opResponse.error) {
          errors.push(opResponse.error);
          break;
        }

        response.result = opResponse.result;
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