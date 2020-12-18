"use strict";

var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

var displayAdapterFactory = require("./AppClientDisplayAdapter"); // TODO - these names suck; clean them up
// v0.0.49-spectrolite


(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "yYgnnofMQHCjacBRCYNhzQ",
    operationName: "Holistic Tab Service Kernel CellModel Factory",
    operationDescription: "Factory filter leveraged by the HolisticTabService class constructor filter to synthesize a specialized holistic tab service kernel CellModel.",
    inputFilterSpec: {
      ____types: "jsObject",
      appBuild: {
        ____accept: "jsObject"
      },
      appModels: {
        ____types: "jsObject",
        display: {
          ____label: "Holistic Tab Service Display Adapter Specializations",
          ____types: "jsObject",
          targetDOMElementID: {
            ____accept: "jsString" // This is the platform's selected DOM element id string value used by the caller to obtain targetDOMElement from the DOM.

          },
          d2r2Components: {
            ____label: "Holistic Tab Service Display Adapter d2r2 Components",
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
      ____accept: "jsObject" // This an @encapsule/holarcy CellModel that encapsulates a specialized holistic tab service kernel cell

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var appBuild = request_.appBuild; // Synthesize the tab service display adapter CellModel.

        var factoryRequest = displayAdapterFactory.request(request_);

        if (factoryRequest.error) {
          errors.push("Cannot synthesize a display adapter CellModel for use by the ".concat(appBuild.app.name, " tab service runtime due to error:"));
          errors.push(factoryRequest.error);
          break;
        }

        var displayAdapterCellModel = factoryRequest.result;
        var cellModel = new holarchy.CellModel({
          id: "JatYSE8JQj6GxT8AOsbssQ",
          name: "Holistic Tab Service Kernel Model",
          description: "Holistic tab service kernel cell manages the overall lifecycle of a tab service and provide base-level services to other cells that implement app-specific features, logic, etc.",
          apm: require("./AbstractProcessModel-app-client-kernel"),
          actions: [require("./ControllerAction-app-client-kernel-cell-plane-error"), require("./ControllerAction-app-client-kernel-hook-events"), require("./ControllerAction-app-client-kernel-notify-event"), require("./ControllerAction-app-client-kernel-step-worker"), require("./ControllerAction-app-client-kernel-signal-lifecycle-event")],
          subcells: [// v0.0.49-spectrolite --- AppClientDOMLocation is fine w/out any changes I think
          displayAdapterCellModel, // Manages the boundary between the app service implementation process(es) and the app service display process.
          require("./AppClientDOMLocation") // Manages the boundary between the app service runtime process and the DOM's location.
          // v0.0.49-spectrolite this is very old. Remove it and replace w/similarly named modern concept (PageView and PageViewController to be synthesized in here I think).
          // TRY DISABLING THIS
          // require("./AppClientView"), // Provides high-level orchestration for lifespan of application-specific subview processes (a concept we haven't discussed yet).
          // v0.0.49-spectrolite pretty suspicious there's anything all that good in here either
          // TRY DISABLING THIS
          // require("@encapsule/holarchy-cm").cml, // Low-level shared CellModel library used by @encapsule/holistic RTL's.
          ]
        });

        if (!cellModel.isValid()) {
          errors.push("Unable to synthesize a specialized tab service kernel CellModel for ".concat(appBuild.app.name, " due to error:"));
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

  module.exports = factoryResponse.result; // This is an @encapsule/arccore.filter that synthesizes a specialized holistic tab service kernel CellModel returned via response.result
})();