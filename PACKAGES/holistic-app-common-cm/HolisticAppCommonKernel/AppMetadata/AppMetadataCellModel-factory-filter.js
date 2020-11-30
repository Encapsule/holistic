"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// AppMetadataCellModel-factory-filter.js
var arccore = require("@encapsule/arccore");

var appMetadataBaseObjectSpecs = require("./lib/iospecs/app-metadata-base-object-specs");

var appMetadataCellModelFactoryInputSpec = require("./lib/iospecs/app-metadata-cellmodel-factory-input-spec");

(function () {
  var filterDeclaration = {
    operationID: "3g72FUVrSUSNvFlTkAmwNw",
    operationName: "App Metadata CellModel Factory",
    operationDescription: "A filter that manufactures a CellModel that encapsulates runtime access to the derived application service's shared static metadata values.",
    inputFilterSpec: appMetadataCellModelFactoryInputSpec,
    // Separate module because the info is replicated in input filter specs at higher layers.
    outputFilterSpec: {
      ____label: "App Metadata CellModel Factory Result",
      ____types: "jsObject",
      appMetadataInputSpec: {
        ____accept: "jsObject"
      },
      // the synthesized input filter spec for derived app metadata
      appMetadataOutputSpec: {
        ____accept: "jsObject"
      },
      // the syntheiszed output filter spec for derived app metadata
      appMetadataCellModel: {
        ____accept: "jsObject"
      },
      // the synthesized AppMetadata CellModel
      appMetadataValues: {
        ____accept: "jsObject"
      } // the derived app's metadata values

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true; // Synthesize a filter spec to validate the derived app's metadata values.

        var derivedAppMetadataInputSpec = {
          ____types: "jsObject",
          org: _objectSpread(_objectSpread({}, request_.inputFilterSpecs.org), appMetadataBaseObjectSpecs.input.org),
          app: _objectSpread(_objectSpread({}, request_.inputFilterSpecs.app), appMetadataBaseObjectSpecs.input.app),
          pages: {
            ____types: "jsObject",
            ____asMap: true,
            pageURI: _objectSpread(_objectSpread({}, request_.inputFilterSpecs.page), appMetadataBaseObjectSpecs.input.page)
          },
          hashroutes: {
            ____types: "jsObject",
            ____asMap: true,
            hashrouteURI: _objectSpread(_objectSpread({}, request_.inputFilterSpecs.hashroute), appMetadataBaseObjectSpecs.input.hashroute)
          }
        }; // derivedAppMetadataInputSpec
        // Synthesize a filter spec to validate the response.result of the app metadata declaration normalization filter.

        var derivedAppMetadataOutputSpec = {
          ____types: "jsObject",
          org: _objectSpread(_objectSpread({}, derivedAppMetadataInputSpec.org), appMetadataBaseObjectSpecs.output.org),
          app: _objectSpread(_objectSpread({}, derivedAppMetadataInputSpec.app), appMetadataBaseObjectSpecs.output.app),
          page: _objectSpread(_objectSpread({}, derivedAppMetadataInputSpec.page), appMetadataBaseObjectSpecs.output.page),
          hashroute: _objectSpread(_objectSpread({}, derivedAppMetadataInputSpec.hashroute), appMetadataBaseObjectSpecs.output.hashroute)
        }; // Create a filter to validate/normalize the developer-provided input values.

        var _factoryResponse = arccore.filter.create({
          operationID: "Y36PPmvcQryUQMmuScPjiQ",
          operationName: "App Metadata Input Values Normalization Filter",
          operationDescription: "Performs validation/normalization of developer-defined app metadata input values.",
          inputFilterSpec: derivedAppMetadataInputSpec
        });

        if (_factoryResponse.error) {
          errors.push("There is a problem with the app metadata input filter spec(s) you specified:");
          errors.push(_factoryResponse.error);
          break;
        }

        var appMetadataInputValuesNormalizationFilter = _factoryResponse.result; // Create a filter to validate normalize the platform-processed output values used throughout the derived app service's process(es).

        _factoryResponse = arccore.filter.create({
          operationID: "ss0vR0cIT9a-cmazs5wYmg",
          operationName: "App Metadata Output Values Normalization Filter",
          operationDescription: "Performs validation/normalization of final app metadata values that will be used throughout the derived app service's runtime processes.",
          outputFilterSpec: derivedAppMetadataOutputSpec
        });

        if (_factoryResponse.error) {
          errors.push("There is a problem with the app metadata output filter spec(s) you specified:");
          errors.push(filterResponse.error);
          break;
        }

        var appMetadataOutputValuesNormalizationFilter = _factoryResponse.result; // Normalize the caller's app metadata input values using the filter we created for this purpose.

        var filterResponse = appMetadataInputValuesNormalizationFilter.request(request_.inputValues);

        if (filterResponse.error) {
          errors.push("There is a problem with the app metadata input value(s) you specified:");
          errors.push(filterResponse.error);
          break;
        }

        var appMetadataInputValues = filterResponse.result; // Perform platform-level processing of the normalized app metadata provided by the caller.
        // TODO: Migrate routine for other places...
        // TODO: This is just temporary:

        var appMetadataResultValues = appMetadataInputValues; // Normalize the final app metadata data that will be used throughout the derived app service's processes(s).

        filterResponse = appMetadataOutputValuesNormalizationFilter.request(appMetadataResultValues);

        if (filterResponse.error) {
          errors.push("Internal error validating the final app metadata values to be used by the derived app service's processes(s):");
          errors.push(filterResponse.error);
          break;
        } // Assign the final result of the App Metadata CellModel Factory.


        response.result = {
          appMetadataInputSpec: derivedAppMetadataInputSpec,
          appMetadataOutputSpec: derivedAppMetadataOutputSpec,
          cellModel: {},
          appMetadataValues: normalizedAppMetadataInputValues
        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  };
  var factoryResponse = arccore.filter.create(filterDeclaration);

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();