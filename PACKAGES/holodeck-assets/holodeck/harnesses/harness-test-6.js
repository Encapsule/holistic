"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// harness-filter-6.js
var arccore = require("@encapsule/arccore");

var holodeck = require("@encapsule/holodeck");

var factoryResponse = holodeck.harnessFactory.request({
  id: "OLdqtYwjToetbonB-pSRyw",
  name: "Holodeck Runner Test #6",
  description: "A harness that creates a new runner with two vectors as a peer runner eval log directory.",
  harnessOptions: {
    idempotent: false,
    gitDiffHunkSize: 0
  },
  testVectorRequestInputSpec: {
    ____types: "jsObject",
    testMessage6: {
      ____types: "jsObject",
      subRunnerID: {
        ____accept: "jsString" // An IRUT for the child runner

      },
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
    var message = request_.vectorRequest.testMessage6;

    var harnessRequestA = _objectSpread(_objectSpread({}, request_), message.subVectorRequestA);

    var harnessRequestB = _objectSpread(_objectSpread({}, request_), message.subVectorRequestB);

    return request_.harnessRunner.request(_objectSpread(_objectSpread({}, request_), {}, {
      id: message.subRunnerID,
      name: "Test Subrunner #1",
      description: "Test to see if we can launch another runner from within a harness.",
      testRequestSets: [[message.subVectorRequestA, message.subVectorRequestB]]
    }));
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;