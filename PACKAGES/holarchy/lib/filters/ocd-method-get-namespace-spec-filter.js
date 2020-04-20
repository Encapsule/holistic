"use strict";

// ocd-method-get-namespace-spec-filter.js
var arccore = require("@encapsule/arccore");

var ocdMethodPathSpec = require("./iospecs/ocd-method-path-spec");

var getNamespaceInReferenceFromPathFilter = require("./get-namespace-in-reference-from-path");

var factoryResponse = arccore.filter.create({
  operationID: "DD5Kc2KETyOPQ07hYu8n-w",
  operationName: "OCD.getNamespaceSpec Method Filter",
  operationDescription: "Implements ObservableControllerData::getNamespaceSpec method.",
  inputFilterSpec: {
    ____label: "OCD.getNamespaceSpec Request",
    ____types: "jsObject",
    ocdReference: {
      ____label: "OCD Instance Reference",
      ____description: "A reference to the calling OCD class instance.",
      ____opaque: true
    },
    path: ocdMethodPathSpec
  },
  outputFilterSpec: {
    ____label: "OCD.getNamespaceSpec Result",
    ____opaque: true // Result depends on the namespace's filter specification

  },
  // outputFilterSpec
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var fqPath = null;

      switch (Object.prototype.toString.call(request_.path)) {
        case "[object String]":
          fqPath = request_.path;
          break;

        case "[object Object]":
          var rpResponse = request_.ocdReference.dataPathResolve({
            apmBindingPath: request_.path.apmBindingPath,
            dataPath: request_.path.dataPath
          });

          if (rpResponse.error) {
            errors.push(rpResponse.error);
          } else {
            fqPath = rpResponse.result;
          }

          break;
      }

      if (errors.length) {
        break;
      }

      var filterResponse = getNamespaceInReferenceFromPathFilter.request({
        namespacePath: fqPath,
        sourceRef: request_.ocdReference._private.storeDataSpec,
        parseFilterSpec: true
      });

      if (filterResponse.error) {
        errors.push("Cannot resolve a namespace descriptor in filter specification for path '".concat(fqPath, "'."));
        errors.push(filterResponse.error);
        break;
      } // if error


      response.result = filterResponse.result;
      break;
    }

    if (errors.length) {
      reponse.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;