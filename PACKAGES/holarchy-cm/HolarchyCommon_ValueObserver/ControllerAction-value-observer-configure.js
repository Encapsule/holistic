"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ControllerAction-value-observer-configure.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

(function () {
  var lib = require("./lib");

  var apmValueObserver = require("./AbstractProcessModel-value-observer");

  var configurationDataSpec = _objectSpread({}, apmValueObserver._private.declaration.ocdDataSpec.configuration);

  delete configurationDataSpec.____defaultValue;
  var action = new holarchy.ControllerAction({
    id: arccore.identifier.irut.fromReference("@encapsule/holarchy-cm.ValueObserver.ControllerAction.configure").result,
    name: "ValueObserver Configure",
    description: "ValueObserver configure action write configuration data into the cell instance indicated by apmBindingPath.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        cm: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ValueObserver: {
              ____types: "jsObject",
              configure: _objectSpread({}, configurationDataSpec)
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
      return {
        error: null
      };
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();