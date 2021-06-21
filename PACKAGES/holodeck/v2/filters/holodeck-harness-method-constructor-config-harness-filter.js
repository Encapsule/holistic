"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// holodeck-harness-method-constructor-config-harness-filter.js
var arccore = require("@encapsule/arccore");

var harnessFilterInputSpecGenerator = require("./iospecs/holodeck-harness-filter-input-spec-generator");

var harnessFilterOutputSpecGenerator = require("./iospecs/holodeck-harness-filter-output-spec-generator");

var harnessType = "config-harness";
var factoryResponse = arccore.filter.create({
  operationID: "TTKPNaovTSCFN8T-K3oYEA",
  operationName: "Config Harness Factory",
  operationDescription: "Constructs a holodeck harness plug-in filter specialized for configuration programData.",
  inputFilterSpec: require("./iospecs/holodeck-harness-method-constructor-config-harness-input-spec"),
  outputFilterSpec: require("./iospecs/holodeck-harness-method-constructor-output-spec"),
  // normalized for all harness types
  bodyFunction: function bodyFunction(harnessCreateRequest_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var message = harnessCreateRequest_.createConfigHarness; // ----------------------------------------------------------------
      // CREATE THE CONFIG HARNESS FILTER

      var innerFactoryResponse = arccore.filter.create({
        operationID: message.id,
        operationName: "Config Harness: ".concat(message.name),
        operationDescription: message.description,
        inputFilterSpec: harnessFilterInputSpecGenerator({
          config: _objectSpread({
            ____types: "jsObject"
          }, message.configCommandSpec)
        }),
        outputFilterSpec: harnessFilterOutputSpecGenerator(message.configPluginResultSpec),
        bodyFunction: function bodyFunction(harnessRequest_) {
          var response = {
            error: null
          };
          var errors = [];
          var inBreakScope = false;

          while (!inBreakScope) {
            inBreakScope = true;

            try {
              var innerResponse = message.configPluginBodyFunction(harnessRequest_);

              if (innerResponse.error) {
                errors.push(innerResponse.error);
                break;
              }

              response.result = innerResponse.result;
            } catch (exception_) {
              errors.push("Unhandled exception in config harness plug-in:");
              errors.push(exception_.message);
            }

            break;
          }

          if (errors.length) {
            response.error = errors.join(" ");
          }

          return response;
        } // end bodyFunction

      });

      if (innerFactoryResponse.error) {
        errors.push(innerFactoryResponse.error);
        return "break";
      }

      response.result = {
        harnessType: harnessType,
        harnessFilter: innerFactoryResponse.result
      };
      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;