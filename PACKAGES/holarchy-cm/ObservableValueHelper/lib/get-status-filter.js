"use strict";

(function () {
  var arccore = require("@encapsule/arccore");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("../cell-label");

  var filterLabel = "".concat(cmLabel, "::getStatus");
  var apmID = cmasHolarchyCMPackage.mapLabels({
    APM: "ObservableValueHelper"
  }).result.APMID;
  var filterID = cmasHolarchyCMPackage.mapLabels({
    OTHER: filterLabel
  }).result.OTHERID;
  var factoryResponse = arccore.filter.create({
    operationID: filterID,
    operationName: filterLabel,
    operationDescription: "Retrieves cell memory and process info for the ObservableValueHelper cell.",
    inputFilterSpec: {
      ____types: "jsObject",
      ocdi: {
        ____accept: "jsObject"
      },
      apmBindingPath: {
        ____accept: "jsString"
      }
    },
    outputFilterSpec: {
      ____types: "jsObject",
      cellMemory: {
        ____accept: "jsObject"
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
        var ocdResponse = request_.ocdi.getNamespaceSpec(request_.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var apmBindingPathSpec = ocdResponse.result;

        if (!apmBindingPathSpec.____appdsl || !apmBindingPathSpec.____appdsl.apm || apmBindingPathSpec.____appdsl.apm !== apmID) {
          errors.push("Invalid apmBindingPath=\"".concat(request_.apmBindingPath, "\" does not resolve to an ").concat(cmLabel, " cell!"));
          break;
        }

        ocdResponse = request_.ocdi.readNamespace(request_.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        response.result = {
          cellMemory: ocdResponse.result
        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      console.log(response);
      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();