"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// holistic-platform-test-runner.js
(function () {
  var arccore = require("@encapsule/arccore");

  var holodeck = require("@encapsule/holodeck"); // Test harnesses.


  var holodeckPackageHarnesses = require("../harnesses/holodeck");

  var holarchyPackageHarnesses = require("../harnesses/holarchy"); // const holarchyCMPackageVectorSets = require("./holarchy-cm-package-tests/vector-sets"); // TODO: v0.0.49-spectrolite @encapsule/holarchy-cm package no longer exports CellModels for use in runtime services.
  // Test vectors.


  var holarchyPackageVectorSets = require("../vectors/holarchy-package-tests/vector-sets");

  var holodeckPackageVectorSets = require("../vectors/holodeck-package-tests/vector-sets");

  var holisticAppServerCMVectorSets = require("../vectors/holistic-app-server-cm-package-tests/vector-sets");

  var holisticAppCommonCMVectorSets = require("../vectors/holistic-app-common-cm-package-tests/vector-sets"); // const holisticAppClientCMVectorSets = require("../vectors/holistic-app-client-cm-package-tests/vector-sets"); // TODO: v0.0.49-spectrolite disabled for now


  var mkdirp = require("mkdirp");

  var factoryResponse = arccore.filter.create({
    operationID: "Ga_AZ-2HSHuB0uJ9l6n3Uw",
    operationName: "Holistic Test Runner Generator",
    operationDescription: "Filter that accepts config options and returns an @encapsule/holodeck runner filter instance configured to run holistic platform regression test vectors through holodeck.",
    inputFilterSpec: {
      ____label: "Holistic Test Runner Generator Request",
      ____description: "A request descriptor object containing config options.",
      ____types: "jsObject",
      logsDirectory: {
        ____label: "Holodeck Logs Directory",
        ____description: "Fully-qualified local filesystem path of the holodeck eval logs directory.",
        ____accept: "jsString"
      },
      testRunnerOptions: {
        ____types: "jsObject",
        ____defaultValue: {},
        onlyExecuteVectors: {
          ____types: ["jsNull", "jsArray"],
          ____defaultValue: null,
          vectorId: {
            ____accept: "jsString"
          }
        }
      }
    },
    outputFilterSpec: {
      ____label: "Holistic Platform Holodeck Runner Filter",
      ____accept: "jsObject"
    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        mkdirp(request_.logsDirectory); // HOLODECK TEST RUNNER DEFINITION

        var runnerResponse = holodeck.runnerFilter.request({
          id: "TxK2RjDjS2mQLkm_N8b6_Q",
          name: "Holistic Platform Test Vectors",
          description: "A suite of test vectors for exploring and confirming the behaviors of Encapsule Project holistic app platform libraries.",
          logsRootDir: request_.logsDirectory,
          testHarnessFilters: [].concat(_toConsumableArray(holodeckPackageHarnesses), _toConsumableArray(holarchyPackageHarnesses)),
          testRunnerOptions: request_.testRunnerOptions,
          testRequestSets: [].concat(_toConsumableArray(holodeckPackageVectorSets), _toConsumableArray(holarchyPackageVectorSets), _toConsumableArray(holisticAppServerCMVectorSets), _toConsumableArray(holisticAppCommonCMVectorSets))
        });

        if (runnerResponse.error) {
          errors.push(runnerResponse.error);
          break;
        }

        response.result = runnerResponse.result;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // bodyFunction

  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();