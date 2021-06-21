"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

var kernelAPMFactory = require("./AbstractProcessModel-app-client-kernel");

var displayAdapterFactory = require("../HolisticHTML5Service_DisplayAdapter"); // v0.0.49-spectrolite


(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "yYgnnofMQHCjacBRCYNhzQ",
    operationName: "HolisticHTML5Service_Kernel CellModel Factory",
    operationDescription: "Factory filter leveraged by the HolisticHTMLService class constructor filter to synthesize a specialized holistic HolisticHTML5Service_Kernel CellModel.",
    inputFilterSpec: {
      ____types: "jsObject",
      appBuild: {
        ____accept: "jsObject"
      },
      appTypes: {
        ____types: "jsObject",
        bootROMSpec: {
          ____accept: "jsObject" // this is an arccore.filter spec for HolisticHTML5Service kernel's bootROM (base64-encoded JSON blob written into HTML5 doc synthesized by HolisticNodeService

        }
      },
      appModels: {
        ____types: "jsObject",
        display: {
          ____label: "HolisticHTML5Service Display Adapter Specializations",
          ____types: "jsObject",
          targetDOMElementID: {
            ____accept: "jsString" // This is the platform's selected DOM element id string value used by the caller to obtain targetDOMElement from the DOM.

          },
          d2r2Components: {
            ____label: "HolisticHTML5Service Display Adapter d2r2 Components",
            ____description: "This is derived app service's d2r2 component set. The display adapter merges platform-provided d2r2 components prior to creating <ComponentRouter/>.",
            ____types: "jsArray",
            d2r2Component: {
              ____accept: "jsObject" // This is an @encapsule/d2r2 component element generator filter object

            }
          }
        }
      }
    },
    outputFilterSpec: {
      ____accept: "jsObject" // This an @encapsule/holarcy CellModel that encapsulates a specialized holistic HTML5 service kernel cell

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var appBuild = request_.appBuild; // Synthesize the HTML5 service display adapter CellModel.

        var _factoryResponse = displayAdapterFactory.request(request_);

        if (_factoryResponse.error) {
          errors.push("Cannot synthesize a display adapter CellModel for use by the ".concat(appBuild.app.name, " HTML5 service kernel due to error:"));
          errors.push(_factoryResponse.error);
          break;
        }

        var displayAdapterCellModel = _factoryResponse.result; // Synthesize the service kernel's APM.

        _factoryResponse = kernelAPMFactory.request({
          appTypes: {
            bootROMSpec: _objectSpread({}, request_.appTypes.bootROMSpec)
          }
        });

        if (_factoryResponse.error) {
          errors.push("Cannot synthesize service kernel AbstractProcessModel for use by the ".concat(appBuild.app.name, " HTML5 service kernel due to error:"));
          errors.push(_factoryResponse.error);
          break;
        }

        var serviceKernelAPM = _factoryResponse.result;
        var cellModel = new holarchy.CellModel({
          id: "JatYSE8JQj6GxT8AOsbssQ",
          name: "HolisticHTML5Service Kernel Model",
          description: "Holistic HTML5 service kernel cell manages the overall lifecycle of a HolisicHTML5Service app instance (i.e. the client JavaScript executing in a user's browser tab) and provides base-level services by all app-specific features, logic, etc.",
          apm: serviceKernelAPM,
          actions: [require("./ControllerAction-app-client-kernel-cell-plane-error"), require("./ControllerAction-app-client-kernel-hook-events"), require("./ControllerAction-app-client-kernel-notify-event"), require("./ControllerAction-app-client-kernel-step-worker")],
          subcells: [// v0.0.49-spectrolite --- AppClientDOMLocation is fine w/out any changes I think
          displayAdapterCellModel, // Manages the boundary between the app service implementation process(es) and the app service display process.
          require("../HolisticHTML5Service_DOMLocation") // Manages the boundary between the app service runtime process and the DOM's location.
          ]
        });

        if (!cellModel.isValid()) {
          errors.push("Unable to synthesize a specialized HTML5 service kernel CellModel for ".concat(appBuild.app.name, " due to error:"));
          errors.push(cellModel.toJSON());
          break;
        }

        response.result = cellModel;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  }); // arccore.filter.create

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result; // This is an @encapsule/arccore.filter that synthesizes a specialized holistic HTML5 service kernel CellModel returned via response.result
})();