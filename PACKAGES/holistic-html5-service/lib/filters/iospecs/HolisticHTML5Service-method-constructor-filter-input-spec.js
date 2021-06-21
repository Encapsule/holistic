"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: app-client-method-constructor-input-spec.js
var holarchy = require("@encapsule/holarchy");

var apmConstructorRequestSpec = holarchy.appTypes.AbstractProcessModel.constructorRequest;
var cmConstructorRequestSpec = holarchy.appTypes.CellModel.constructorRequest;

var serviceTypes = require("@encapsule/holistic-service-core").serviceTypes;

module.exports = {
  ____label: "HolisticHTML5Service::constructor Request Object",
  ____description: "A developer-defined descriptor object containing the information required to configure and initialize a holistic app service running inside a browser tab instance.",
  ____types: "jsObject",
  appServiceCore: {
    ____label: "HolisticServiceCore Definition",
    ____description: "A reference to your app service's HolisticServiceCore class instance. Or, a descriptor object from which we can construct a new instance of HolisticServiceCore for use by your browser tab service.",
    ____accept: "jsObject" // Reference to HolisticAppCore instance

  },
  appTypes: {
    ____label: "HolisticHTML5Service Runtime Types",
    ____description: "Developer-defined runtime type definitions, and extensions holistic-platform-defined types for a set of core application-layer objects for which the browser tab service kernel provides type filtering and/or generic orchestration services on behalf of the derived app service.",
    ____types: "jsObject",
    ____defaultValue: {} // v0.0.49-spectrolite
    // We do not currently have any such platform-defined types specific only to holistic browser tab service.
    // So, ignore this for now and just take default value unless/until we actually need it (kind of doubtful but we'll see).

  },
  appModels: _objectSpread(_objectSpread({}, serviceTypes.HolisticServiceCore.constructor.appModels), {}, {
    // this gives us standard display and cellModels artifact spec defs
    ____label: "HolisticHTML5Service Behavior Models",
    ____description: "A collection of application-specific plug-in artifacts derived from @encapsule/holistic RTL's to register for use inside this holistic browser tab service instance.",
    ____types: "jsObject",
    ____defaultValue: {},
    html5ServiceCell: {
      ____label: "HolisticHTML5Service App CellModel Declaration",
      ____description: "Intialization options, type and runtime behavior specializations to be applied to the generic Holistic Tab Service kernel (synthesized CellModel specialized for your specific derived tab service).",
      ____types: "jsObject",
      ____defaultValue: {},
      apmDeclaration: {
        ____label: "HolisticHTML5Service App CellModel APM Declaratoin",
        ____description: "Information provided by a developer to specialize the top level HolisticHTML5Service App CellModel synthesized for the derived service.",
        ____types: "jsObject",
        ____defaultValue: {},
        ocdDataSpec: apmConstructorRequestSpec.ocdDataSpec,
        steps: apmConstructorRequestSpec.steps
      },
      operators: cmConstructorRequestSpec.operators,
      actions: cmConstructorRequestSpec.actions,
      subcells: cmConstructorRequestSpec.subcells,
      lifecycle: {
        ____label: "HTML5 Service Lifecycle Actions",
        ____description: "Holistic tab service kernel cell signals to the derived app service via \"lifecycle\" actions. The request and response.result format of these effectively synchronous arccore.filter-style body functions is pre-defined by holistic platform. App developers may accept default values. Or, override these values w/custom handlers.",
        ____types: "jsObject",
        ____defaultValue: {},
        hashrouteFunction: {
          ____label: "Application Client Lifecycle Signal Action: Hashroute",
          ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.hashroute ControllerAction plug-in.",
          ____accept: "jsFunction",
          ____defaultValue: function ____defaultValue(request_) {
            console.log("WARNING: No holistic.app.client.lifecycle.hashroute signal action registered. USING DEFAULT HANDLER (does nothing).");
            return {
              error: null
            };
          }
        },
        errorFunction: {
          ____label: "Application Client Lifecycle Signal Action: Error",
          ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.error ControllerAction plug-in.",
          ____accept: "jsFunction",
          ____defaultValue: function ____defaultValue(request_) {
            console.log("WARNING: holistic.app.client.lifecycle.error signal action registerd. USING DEFAULT HANDLER (overrides client app display to show error(s)).");
            return {
              error: null
            };
          }
        }
      } // ~.appModels.html5ServiceConfig.lifecycle

    } // ~.appModels.html5ServiceConfig

  }) // ~.appModels

};