"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ControllerAction-ObservableValueHelper-get-link-error.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var lib = require("./lib");

  var apmObservableValueHelper = require("./AbstractProcessModel-ObservableValueHelper");

  var configurationSpec = _objectSpread(_objectSpread({}, apmObservableValueHelper._private.declaration.ocdDataSpec.configuration), {}, {
    ____defaultValue: undefined,
    observableValue: _objectSpread(_objectSpread({}, apmObservableValueHelper._private.declaration.ocdDataSpec.configuration.observableValue), {}, {
      ____defaultValue: undefined
    })
  });

  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: "getLinkError"
    }).result.ACTID,
    name: "".concat(cmLabel, " Get Link Error"),
    description: "Retrieves link error message string if the process is in the observable-value-helper-link-error step. Or, null.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValueHelper: {
              ____types: "jsObject",
              getLinkError: {
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
    actionResultSpec: {
      ____accept: ["jsNull", "jsString"]
    },
    bodyFunction: function bodyFunction(actionRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = actionRequest_.actionRequest.holarchy.common.actions.ObservableValueHelper.getLinkError;
        var ocdResponse = holarchy.ObservableControllerData.dataPathResolve({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: messageBody.path
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var ovhBindingPath = ocdResponse.result;
        var libResponse = lib.getStatus.request(_objectSpread(_objectSpread({}, actionRequest_.context), {}, {
          apmBindingPath: ovhBindingPath
        }));

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var cellMemory = libResponse.result.cellMemory;

        if (cellMemory.__apmiStep !== "observable-value-helper-link-error") {
          response.result = null;
          break;
        }

        ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: cellMemory.observableValueWorkerProcess.apmBindingPath,
          dataPath: "#.ovcpProviderProxyError"
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        response.result = ocdResponse.result;
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
})();