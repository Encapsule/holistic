"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// holodeck-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var intrinsicHarnesses = require("../intrinsic-harnesses");

var fs = require("fs");

var path = require("path");

var helperGenerateFilterMarkdown = require("../../lib/helpers/helper-generate-filter-markdown-string");

var mkdirp = require("mkdirp");

var factoryResponse = arccore.filter.create({
  operationID: "1WWlhU6aQ4WtF9puW3ujfg",
  operationName: "Holodeck::constructor Method Filter",
  operationDescription: "Intializes the internal state of a new Holodeck class instance.",
  inputFilterSpec: require("./iospecs/holodeck-method-constructor-input-spec"),
  outputFilterSpec: require("./iospecs/holodeck-method-constructor-output-spec"),
  bodyFunction: function bodyFunction(constructorRequest_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var logRootDirStat = null;

      try {
        logRootDirStat = fs.statSync(path.resolve(constructorRequest_.logRootDir));
      } catch (_exception) {
        errors.push("The specified value for ~.logRooDir, '".concat(constructorRequest_.logRootDir, "', does not exist. Please create this directory for first-time setup."));
        return "break";
      }

      if (!logRootDirStat.isDirectory) {
        errors.push("The specified value for ~.logRooDir, '".concat(constructorRequest_.logRootDir, "', isn't actually a directory!"));
        return "break";
      }

      var harnessFilters = [];
      intrinsicHarnesses.forEach(function (harness_) {
        harnessFilters.push(harness_.getHarnessFilter());
        /* known valid */
      });

      for (var i = 0; i < constructorRequest_.holodeckHarnesses.length; i++) {
        var harnessInstance = constructorRequest_.holodeckHarnesses[i];

        if (!harnessInstance.isValid()) {
          errors.push("Invalid HolodeckHarness instance specified for ~.holodeckHarnesses[".concat(i, "]: ").concat(harnessInstance.toJSON()));
          continue; // check them all at once and accumlate the errors - it's simpler for developers than one at a time I think.
        }

        harnessFilters.push(harnessInstance.getHarnessFilter());
      } // end for


      if (errors.length) {
        errors.unshift("Unable to process HolodeckHarness registration(s):");
        return "break";
      }

      harnessFilters.sort(function (a_, b_) {
        var aName = a_.filterDescriptor.operationName;
        var bName = b_.filterDescriptor.operationName;
        return aName < bName ? -1 : aName > bName ? 1 : 0;
      });
      var innerResponse = arccore.discriminator.create({
        id: "PyNFH9n9Qsi1skOlo9-q5A",
        name: "Holodeck Test Runner Discriminator",
        description: "Routes test requests to an appropriate holodeck test harness plug-in filter for processing, evaluation, and comparison.",
        options: {
          action: "getFilter"
        },
        // arccore.discriminator will return a reference to the only filter that might accept your request
        filters: harnessFilters
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        return "break";
      }

      response.result = _objectSpread(_objectSpread({}, constructorRequest_), {}, {
        harnessFilters: harnessFilters,
        harnessDiscriminator: innerResponse.result
      });
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