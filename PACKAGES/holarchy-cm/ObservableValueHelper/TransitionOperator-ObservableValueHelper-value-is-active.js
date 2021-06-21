"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TransitionOperator-ObsevableValueHelper-value-is-active.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var operatorName = "".concat(cmLabel, " Value Is Active");

  var lib = require("./lib");

  var operator = new holarchy.TransitionOperator({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      TOP: "valueIsActive"
    }).result.TOPID,
    name: operatorName,
    description: "Returns Boolean true if the target ObservableValue cell is active.",
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
              valueIsActive: {
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
        inBreakScope = true; // TODO: This is a useful pattern. We should make it generically re-usable somehow. But, not today ;-)

        var messageBody = operatorRequest_.operatorRequest.holarchy.common.operators.ObservableValueHelper.valueIsActive;

        var suboperatorRequest = _objectSpread(_objectSpread({}, operatorRequest_), {}, {
          operatorRequest: {
            holarchy: {
              common: {
                operators: {
                  ObservableValueHelper: {
                    isLinked: {
                      path: messageBody.path
                    }
                  }
                }
              }
            }
          }
        });

        var operatorResponse = operatorRequest_.context.transitionDispatcher.request(suboperatorRequest);

        if (operatorResponse.error) {
          errors.push(operatorResponse.error);
          break;
        }

        var operatorFilter = operatorResponse.result;
        operatorResponse = operatorFilter.request(suboperatorRequest);

        if (operatorResponse.error) {
          errors.push(operatorResponse.error);
          break;
        }

        if (!operatorResponse.result) {
          response.result = false;
          break;
        }

        var ocdResponse = operatorRequest_.context.ocdi.readNamespace({
          apmBindingPath: operatorRequest_.context.apmBindingPath,
          dataPath: "".concat(messageBody.path, ".observableValueWorkerProcess.apmBindingPath")
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var ovwProcessCoordinates = ocdResponse.result;
        suboperatorRequest = {
          context: _objectSpread(_objectSpread({}, operatorRequest_.context), {}, {
            apmBindingPath: ovwProcessCoordinates
          }),
          operatorRequest: {
            holarchy: {
              common: {
                operators: {
                  ObservableValueWorker: {
                    _private: {
                      valueIsActive: {}
                    }
                  }
                }
              }
            }
          }
        };
        operatorResponse = operatorRequest_.context.transitionDispatcher.request(suboperatorRequest);

        if (operatorResponse.error) {
          errors.push(operatorResponse.error);
          break;
        }

        operatorFilter = operatorResponse.result;
        operatorResponse = operatorFilter.request(suboperatorRequest);

        if (operatorResponse.error) {
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

  if (!operator.isValid()) {
    throw new Error(operator.toJSON());
  }

  module.exports = operator;
})();