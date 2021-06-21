"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TransitionOperator-ObsevableValueWorker-value-is-active.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueWorker = require("./cmasObservableValueWorker");

  var cmLabel = require("./cell-label");

  var operatorName = "".concat(cmLabel, " Value Is Active");

  var lib = require("./lib");

  var operator = new holarchy.TransitionOperator({
    id: cmasObservableValueWorker.mapLabels({
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
            ObservableValueWorker: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                valueIsActive: {
                  ____types: "jsObject"
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
        var ocdResponse = operatorRequest_.context.ocdi.readNamespace({
          apmBindingPath: operatorRequest_.context.apmBindingPath,
          dataPath: "#.__apmiStep"
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var apmiStep = ocdResponse.result;

        if (apmiStep !== "observable-value-worker-proxy-connected") {
          response.result = false;
          break;
        }

        ocdResponse = operatorRequest_.context.ocdi.readNamespace({
          apmBindingPath: operatorRequest_.context.apmBindingPath,
          dataPath: "#.ovCell.path"
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var ovPath = ocdResponse.result; // Now, actually verify the existence of the ObservableValue cell.

        var operatorRequest = _objectSpread(_objectSpread({}, operatorRequest_), {}, {
          operatorRequest: {
            CellProcessor: {
              cell: {
                cellCoordinates: "#.ovcpProviderProxy",
                delegate: {
                  operatorRequest: {
                    holarchy: {
                      CellProcessProxy: {
                        proxy: {
                          operatorRequest: {
                            holarchy: {
                              common: {
                                operators: {
                                  ObservableValue: {
                                    valueIsActive: {
                                      path: ovPath
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
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
        operatorResponse = operatorFilter.request(operatorRequest);

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