"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// harness-filter-5.js
var arccore = require("@encapsule/arccore");

var holodeck = require("@encapsule/holodeck");

var factoryResponse = holodeck.harnessFactory.request({
  id: "TLUZ3YPUTXK8fXhh6t3-Ew",
  name: "Holodeck Runner Test #5",
  description: "A harness that that splits its request and makes two sub-harness calls via MDR that it combines and returns to its runner.",
  harnessOptions: {
    idempotent: false,
    gitDiffHunkSize: 0
  },
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    testMessage5: {
      ____types: "jsObject",
      subVectorRequestA: {
        ____accept: "jsObject" // We do not know what message the caller will pass

      },
      subVectorRequestB: {
        ____accept: "jsObject" // We do not know what message the caller will pass

      }
    }
  },
  testVectorResultOutputSpec: {
    ____opaque: true
  },
  harnessBodyFunction: function harnessBodyFunction(request_) {
    // Here we want to test our ability to delegate via recursive MDR to a sub-harness.
    // Actually two of them, combine their responses, and return it as our own.
    var message = request_.vectorRequest.testMessage5;

    var harnessRequestA = _objectSpread(_objectSpread({}, request_), message.subVectorRequestA);

    var harnessRequestB = _objectSpread(_objectSpread({}, request_), message.subVectorRequestB);

    return {
      error: null,
      result: {
        responseA: request_.harnessDispatcher.request(harnessRequestA).result.request(harnessRequestA),
        responseB: request_.harnessDispatcher.request(harnessRequestB).result.request(harnessRequestB)
      }
    };
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;