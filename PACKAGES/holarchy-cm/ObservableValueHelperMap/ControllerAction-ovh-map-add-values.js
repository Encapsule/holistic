"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ControllerAction-ovh-map-add-values.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var _require = require("./cell-metadata"),
      cmLabel = _require.cmLabel,
      cmDescription = _require.cmDescription;

  var actionLabel = "addValues";

  var lib = require("./lib"); // We need the action and operator request/response.result filter specs from the ObservableValueHelper CellModel.


  var ovhCellModel = require("../ObservableValueHelper");

  var ovhCellMemorySpec = ovhCellModel.getAPM().getDataSpec();
  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: "".concat(cmLabel, "::").concat(actionLabel),
    description: "Add one or more named ObservableValueHelper cell(s) to a previously activated ObservableValueHelperMap cell.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValueHelperMap: {
              ____types: "jsObject",
              addValues: {
                ____types: "jsObject",
                path: {
                  ____accept: "jsString",
                  ____defaultValue: "#"
                },
                names: {
                  ____label: "Name to ObservableValueHelper::configure Request Map",
                  ____types: "jsObject",
                  ____asMap: true,
                  ____defaultValue: {},
                  name: _objectSpread({}, ovhCellMemorySpec.configuration)
                }
              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____accept: "jsObject" // TODO --- now returning a copy of the ObservableValueHelperMap cell memory as returned by OCD on write.

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        var messageBody = request_.actionRequest.holarchy.common.actions.ObservableValueHelperMap.addValues;
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
        var names = Object.keys(messageBody.names); // You cannot overwrite an existing ObservableValueHelperMap entry. It must be released via removeValues action.

        for (var i = 0; i < names.length; i++) {
          var name = names[i];

          if (cellMemory.ovhMap[name]) {
            errors.push("Invalid duplicate name \"".concat(name, "\" configuration specified in request. There's already an ObservableValueHelper cell with that name active in this ObservableValueHelperMap cell."));
            break;
          }
        } // end for


        if (errors.length) {
          break;
        } // No duplicates. Apply the configurations.


        while (names.length) {
          var _name = names.shift();

          cellMemory.ovhMap[_name] = {
            configuration: messageBody.names[_name]
          }; // Here we activate and configure a new ObservableValueHelper cell in our local cell memory.
        } // This could definitely be optimized. But, for now let's just go for logical end-to-end and optimize it later.


        var ocdResponse = request_.context.ocdi.writeNamespace(ovhmBindingPath, cellMemory);

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