"use strict";

var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

var ServiceCore_AppMetadataCellModelFactory = require("../HolisticServiceCore_Metadata");

(function () {
  var factoryResponse = arccore.filter.create({
    operationID: "J6fm3-uZRm21k0gSjJ2-Ow",
    operationName: "Holistic Service Core Kernel CellModel Factory",
    operationDescription: "Uses context available during construction of a HolisticServiceCore class instance to perform any specializations that may be required to adapt the behavior(s) of the service kernel (and by extension, its dependencies, and so on, and so on...).",
    inputFilterSpec: {
      ____types: "jsObject",
      appBuild: {
        // Because lazy
        ____accept: "jsObject" // TODO make this explicit should be explicit

      },
      appTypes: {
        ____types: "jsObject",
        metadata: {
          ____types: "jsObject",
          specs: {
            ____accept: "jsObject" // TODO: lock this down? It's technically fine as we're passing through a filter spec as an opaque descriptor object here. No need to actually re-filter it.

          }
        },
        bootROM: {
          ____types: "jsObject",
          spec: {
            ____accept: "jsObject" // TODO: lock this down? Same rationale for leaving it as-is as above.

          }
        }
      },
      appModels: {
        ____types: "jsObject",
        metadata: {
          ____types: "jsObject",
          accessors: {
            ____accept: "jsObject"
          }
        }
      }
    },
    outputFilterSpec: {
      ____accept: "jsObject" // This is an @encapsule/holarchy CellModel that rolls up core CellModels that must be included in every holistic service instance (currently HolisticNodeService and HolisticTabService).

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var appBuild = request_.appBuild; // Here what we need to specialize per request_ input is the HolisticServiceCore's AppMetadata CellModel.
        // We already did all the filter spec splicing and all the developer metadata value verification, and the
        // digraph building upstairs in the HolisticServiceCore::constructor. But, we just use the same delegation
        // pattern and push the details down into the AppMetadata cell definition at let it sort it out.

        var cmFactoryResponse = ServiceCore_AppMetadataCellModelFactory.request(request_); // it's a filter so will clip out what we're not interested in on the way in through input filter spec.

        if (cmFactoryResponse.error) {
          errors.push("Unable to synthesize HolisticServiceCore instance kernel CellModel because an error occurred synthesizing a required CellModel dependency:");
          errors.push(cmFactoryResponse.error);
          break;
        }

        var AppMetadataCellModel = cmFactoryResponse.result; // ----------------------------------------------------------------

        var cellModel = new holarchy.CellModel({
          id: "74npOB-3S8GEgHwdtWwHrg",
          name: "Holistic Service Core Kernel Model",
          description: "Provides core kernel cell process models shared by the holistic app server and holistic app client application cell models.",
          subcells: [AppMetadataCellModel, require("../HolisticServiceCore_StylesThemeProcessor"), require("../HolisticServiceCore_PageViewController")]
        });

        if (!cellModel.isValid()) {
          errors.push("Unable to synthesize HolisticServiceCore instance kernel CellModel due to error:");
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
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();