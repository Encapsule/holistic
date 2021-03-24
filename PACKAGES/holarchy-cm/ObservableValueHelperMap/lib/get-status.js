"use strict";

// ObservableValueHelperMap/lib/get-status.js
(function () {
  var arccore = require("@encapsule/arccore");

  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var ovhmAPMID = cmasHolarchyCMPackage.mapLabels({
    APM: "ObservableValueHelperMap"
  }).result.APMID;
  var factoryResponse = arccore.filter.create({
    operationID: "XlxMHlb4RW2G1vlIR-19ow",
    operationName: "ObservableValueHelperMap::getStatus",
    operationDescription: "Perform checks on apmBindingPath and retrieve a copy of the ObservableValueHelperMap cell's memory data.",
    inputFilterSpec: {
      ____types: "jsObject",
      ocdi: {
        ____accept: "jsObject"
      },
      apmBindingPath: {
        ____accept: "jsString"
      },
      path: {
        ____accept: "jsString"
      }
    },
    outputFilterSpec: {
      ____types: "jsObject",
      cellMemory: {
        ____accept: "jsObject"
      },
      ovhmBindingPath: {
        ____accept: "jsString"
      }
    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var ocdResponse = holarchy.ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.apmBindingPath,
          dataPath: request_.path
        });

        if (ocdResponse.error) {
          errors.push("Unable to resolve even basic information about path=\"".concat(request_.path, "\" relative to apmBindingPath=\"").concat(request_.apmBindingPath, "\" due to error:"));
          errors.push(ocdResponse.error);
          break;
        }

        var ovhmBindingPath = ocdResponse.result;
        ocdResponse = request_.ocdi.getNamespaceSpec(ovhmBindingPath);

        if (ocdResponse.error) {
          errors.push("Error obtaining filter specification for specified ObservableValueHelperMap cell at OCD path \"".concat(ovhmBindingPath, "\":"));
          errors.push(ocdResponse.error);
          break;
        }

        var cellMemorySpec = ocdResponse.result;

        if (!cellMemorySpec.____appdsl || !cellMemorySpec.____appdsl.apm || cellMemorySpec.____appdsl.apm !== ovhmAPMID) {
          errors.push("Invalid ObservableValueHelperMap cell path \"".concat(ovhmBindingPath, "\" does not resolve to a cell bound to the ObservableValueHelperWorker APM!"));
          break;
        }

        ocdResponse = request_.ocdi.readNamespace(ovhmBindingPath);

        if (ocdResponse.error) {
          errors.push("Error reading ObservableValueHelperMap cell memory at \"".concat(ovhmBindingPath, "\":"));
          errors.push(ocdResponse.error);
        }

        var cellMemory = ocdResponse.result;
        response.result = {
          cellMemory: cellMemory,
          ovhmBindingPath: ovhmBindingPath
        };
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