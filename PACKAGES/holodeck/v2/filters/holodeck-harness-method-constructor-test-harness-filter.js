"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// holodeck-method-constructor-test-harness-filter.js
var arccore = require("@encapsule/arccore");

var harnessFilterBaseInputSpecGenerator = require("./iospecs/holodeck-harness-filter-input-spec-generator");

var harnessFilterBaseOutputSpecGenerator = require("./iospecs/holodeck-harness-filter-output-spec-generator");

var harnessType = "test-harness";
var factoryResponse = arccore.filter.create({
  operationID: "M054odK1Ti-YSkoYv5OzSA",
  operationName: "HolodeckHarness::constructor Test Harness Factory",
  operationDescription: "A filter that constructs a HolodeckHarness filter for executing a specific class of holodeck test vector.",
  inputFilterSpec: require("./iospecs/holodeck-harness-method-constructor-test-harness-input-spec"),
  outputFilterSpec: require("./iospecs/holodeck-harness-method-constructor-output-spec"),
  // normalized for all harness types
  bodyFunction: function bodyFunction(testHarnessCreateRequest_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var message = testHarnessCreateRequest_.createTestHarness; // ----------------------------------------------------------------
      // CREATE THE TEST HARNESS FILTER

      var innerFactorResponse = arccore.filter.create({
        operationID: message.id,
        operationName: "Test Harness: ".concat(message.name),
        operationDescription: message.description,
        inputFilterSpec: harnessFilterInputSpecGenerator({
          test: _objectSpread({
            ____types: "jsObject"
          }, message.testRequestSpec)
        }),
        outputFilterSpec: harnessFilterOutputSpecGenerator(message.testResultSpec),
        bodyFunction: function bodyFunction(harnessRequest_) {
          var response = {
            error: null
          };
          var errors = [];
          var inBreakScope = false;

          while (!inBreakScope) {
            inBreakScope = true;

            try {
              var innerResponse = message.testBodyFunction;
            } catch (exception_) {}

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