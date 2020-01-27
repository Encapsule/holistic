"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var arccore = require("@encapsule/arccore");

var harnessFactoryInputSpec = require("./iospecs/holodeck-harness-factory-input-spec");

var harnessFactoryOutputSpec = require("./iospecs/holodeck-harness-factory-output-spec");

var factoryResponse = arccore.filter.create({
  operationID: "4LIYsbDbTJmVWEYgDLJ7Jw",
  operationName: "Holodeck Harness Factory",
  operationDescription: "A filter that generates a holdeck harness plug-in filter.",
  inputFilterSpec: harnessFactoryInputSpec,
  outputFilterSpec: harnessFactoryOutputSpec,
  bodyFunction: function bodyFunction(factoryRequest_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true; // This is the input filter spec for the inner plug-in filter - the harness that wraps
      // the developer's provided harness bodyFunction inside of a standardized filter that
      // is called by an outer proxy filter. The proxy handles the upstream interface details
      // of parsing incoming runner requests and dispatching them to the plug-in harness filter.
      // And, then boxing up the response received from the inner plug-in and returning it
      // back to the runner. This allows the developer-defined harness bodyFunction to be very
      // simple.

      var harnessPluginFilterInputSpec = {
        ____types: "jsObject",
        id: {
          ____accept: "jsString"
        },
        name: {
          ____accept: "jsString"
        },
        description: {
          ____accept: "jsString"
        },
        vectorRequest: factoryRequest_.testVectorRequestInputSpec
      };
      var innerResponse = arccore.filter.create({
        operationID: factoryRequest_.id,
        operationName: factoryRequest_.name,
        operationDescription: factoryRequest_.description,
        inputFilterSpec: harnessPluginFilterInputSpec,
        outputFilterSpec: factoryRequest_.testVectorResultOutputSpec,
        bodyFunction: factoryRequest_.harnessBodyFunction
      });

      if (innerResponse.error) {
        errors.push("Error attempting to construct plug-in harness filter [".concat(factoryRequest_.id, "::").concat(factoryRequest_.name, "]:"));
        errors.push(innerResponse.error);
        return "break";
      }

      var harnessPluginFilter = innerResponse.result;
      var harnessPluginProxyName = "Harness Proxy::<".concat(factoryRequest_.id, "::").concat(factoryRequest_.name, ">");
      var harnessPluginProxyFilterID = arccore.identifier.irut.fromReference(harnessPluginProxyName).result;
      var harnessPluginProxyFilterOutputSpec = {
        ____label: "Harness Proxy Result",
        ____description: "A descriptor object derived from the inner plug-in harness filter's response + options and analysis.",
        ____types: "jsObject",
        harnessOptions: harnessFactoryInputSpec.harnessOptions,
        harnessDispatch: {
          ____types: "jsObject",
          ____asMap: true,
          harnessID: {
            ____types: "jsObject",
            ____asMap: true,
            testID: factoryRequest_.testVectorResultOutputSpec
          }
        }
      };
      innerResponse = arccore.filter.create({
        operationID: harnessPluginProxyFilterID,
        operationName: harnessPluginProxyName,
        operationDescription: "Wraps custom harness plug-in [".concat(factoryRequest_.id, "::").concat(factoryRequest_.name, "] in generic runtime proxy filter wrapper compatible with holodeck runner."),
        inputFilterSpec: harnessPluginFilterInputSpec,
        outputFilterSpec: harnessPluginProxyFilterOutputSpec,
        bodyFunction: function bodyFunction(testRequest_) {
          var response = {
            error: null,
            result: undefined
          };
          var errors = [];
          var inBreakScope = false;

          while (!inBreakScope) {
            inBreakScope = true;
            var pluginResponse = void 0;

            try {
              pluginResponse = harnessPluginFilter.request(testRequest_);

              if (pluginResponse.error) {
                errors.push(pluginResponse.error);
                break;
              }
            } catch (harnessException_) {
              errors.push("Unexpected harness filter exception: '".concat(harnessException_.message, "'."));
              console.error(harnessException_.stack);
              break;
            }

            response.result = {
              harnessOptions: _objectSpread({}, factoryRequest_.harnessOptions),
              harnessDispatch: {}
            };
            response.result.harnessDispatch[factoryRequest_.id] = {};
            response.result.harnessDispatch[factoryRequest_.id][testRequest_.id] = pluginResponse.result;
            break;
          }

          if (errors.length) {
            errors.unshift("Error attempting to dispatch plug-in harness filter [".concat(factoryRequest_.id, "::").concat(factoryRequest_.name, "]:"));
            response.error = errors.join(" ");
          }

          return response;
        }
      });

      if (innerResponse.error) {
        errors.unshift("Error attempting to construct plug-in harness proxy filter [".concat(harnessPluginProxyFilterID, "::").concat(harnessPluginProxyName, "]:"));
        errors.push(innerResponse.error);
        return "break";
      }

      var harnessPluginProxyFilter = innerResponse.result;
      response.result = harnessPluginProxyFilter;
      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (errors.length) {
      errors.unshift("Holodeck harness factory failed:");
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;