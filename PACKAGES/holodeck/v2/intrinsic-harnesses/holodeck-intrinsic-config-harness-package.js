"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// holodeck-intrinisic-config-harness-package.js
var HolodeckHarness = require("../HolodeckHarness");

var configHarnessPackage = new HolodeckHarness({
  createConfigHarness: {
    id: "rGvH1YMLTxawuZtJwMD_eg",
    name: "Package",
    description: "Configures program for testing a specific npm/yarn package.",
    configCommandSpec: {
      ____types: "jsObject",
      "package": {
        ____types: "jsObject",
        packageName: {
          ____accept: "jsString"
        },
        programRequest: {
          ____accept: ["jsObject", "jsArray", "jsNull"],
          ____defaultValue: null // missing sub-programRequest

        }
      }
    },
    configPluginBodyFunction: function configPluginBodyFunction(harnessRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var message = harnessRequest_.programRequest.config["package"];
        harnessRequest_.context.programRequestPath.push(harnessRequest_.programRequest.id);
        harnessRequest_.context.config.packageName = message.packageName;
        response.result = {
          context: _objectSpread({}, harnessRequest_.context),
          harnessResult: {
            test: "This should work fine because this object is declared ____accept."
          },
          programRequest: message.programRequest // this gets executed by the holodeck environment run method using the context above

        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // harnessBodyFunction

  } // createConfigHarness

});

if (!configHarnessPackage.isValid()) {
  throw new Error(configHarnessPackage.toJSON());
}

module.exports = configHarnessPackage;