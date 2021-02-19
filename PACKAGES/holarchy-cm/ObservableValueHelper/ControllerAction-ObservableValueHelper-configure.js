"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ControllerAction-ObservableValueHelper-configure.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cm-label-string");

  var cmasResponse = cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: cmLabel
  });

  if (cmasResponse.error) {
    throw new Error(cmasResponse.error);
  }

  var cmasObservableValueHelper = new holarchy.CellModelArtifactSpace(cmasResponse.result);

  var lib = require("./lib");

  var apmObservableValueHelper = require("./AbstractProcessModel-ObservableValueHelper");

  var configurationSpec = _objectSpread(_objectSpread({}, apmObservableValueHelper._private.declaration.ocdDataSpec.configuration), {}, {
    ____defaultValue: undefined,
    observableValue: _objectSpread(_objectSpread({}, apmObservableValueHelper._private.declaration.ocdDataSpec.configuration.observableValue), {}, {
      ____defaultValue: undefined
    })
  });

  var action = new holarchy.ControllerAction({
    id: cmasObservableValueHelper.mapLabels({
      ACT: "configure"
    }).result.ACTID,
    name: "".concat(cmLabel, " Configure"),
    description: "Allows an actor to configure / reconfigure the ".concat(cmLabel, " cell process."),
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
              configure: {
                ____label: "ObservableValueHelper Link Request",
                ____description: "This action links an ObservableValueHelper cell instance to an ObservableValue family cell using information specified in this request.",
                ____types: "jsObject",
                helperPath: {
                  ____label: "Helper Path",
                  ____description: "The relative path of the ObservableValueHelper cell to configure relative to actionRequest.context.apmBindingPath that is presumed to be a cell process that owns the ObservableValue family cell of interest.",
                  ____accept: "jsString",
                  ____defaultValue: "#" // only ever correct if the ObservableValue family cell you want to connect to is to be used as a cell process (atypical) and not as a cell helper (typical).

                },
                configuration: _objectSpread({}, configurationSpec)
              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____accept: "jsString",
      ____defaultValue: "okay"
    },
    bodyFunction: function bodyFunction(actionRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = actionRequest_.actionRequest.holarchy.common.actions.ValueObserverHelper.configure;
        var ocdResponse = holarcy.ObservableControllerData.dataPathResolve({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: messageBody.helperPath
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

        if (cellMemory.__apmiStep !== "observable-value-helper-wait-configuration") {
          errors.push("Sorry. The ObservableValueHelper cell at \"".concat(ovhBindingPath, "\" is currently in process step \"").concat(cellMemory.__apmiStep, "\" and cannot be configure/re-configured by calling this action at this time."));
          break;
        }

        ocdResponse = actionRequest_.context.ocdi.writeNamespace(ovhBindingPath, _objectSpread(_objectSpread({}, cellMemory), {}, {
          __apmiStep: "observable-value-helper-apply-configuration",
          configuration: messageBody.configuration
        }));

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

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