"use strict";

// ocd-method-read-namespace-filter.js
var arccore = require("@encapsule/arccore");

var getNamespaceInReferenceFromPathFilter = require("./get-namespace-in-reference-from-path");

var ocdMethodPathSpec = require("./iospecs/ocd-method-path-spec");

var factoryResponse = arccore.filter.create({
  operationID: "wjTFsXoyQ_ehUHIdegBumQ",
  operationName: "OCD::readNamespace Method Filter",
  operationDescription: "Implements ObservableControllerData::readNamespace method.",
  inputFilterSpec: {
    ____label: "OCD Read Namespace Request",
    ____types: "jsObject",
    ocdClass: {
      ____label: "OCD Class Reference",
      ____description: "A reference to the OCD class constructor so that this filter can call static methods defined on the class prototype.",
      ____opaque: true
    },
    ocdReference: {
      ____label: "OCD Instance Reference",
      ____description: "A reference to the calling OCD class instance.",
      ____opaque: true
    },
    path: ocdMethodPathSpec
  },
  // inputFilterSpec
  outputFilterSpec: {
    ____label: "OCD Read Namepace Result",
    ____opaque: true // Result depends on the namespace's filter specification

  },
  // outputFilterSpec
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: undefined
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      var fqPath = null;

      switch (Object.prototype.toString.call(request_.path)) {
        case "[object String]":
          fqPath = request_.path;
          break;

        case "[object Object]":
          var rpResponse = request_.ocdClass.dataPathResolve({
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
        return "break";
      } // Determine if we have already instantiated a read filter for this namespace.


      if (!request_.ocdReference._private.accessFilters.read[fqPath]) {
        // Cache miss. Create a new read filter for the requested namespace.
        var operationId = arccore.identifier.irut.fromReference("read-filter" + fqPath).result;
        var filterResponse = getNamespaceInReferenceFromPathFilter.request({
          namespacePath: fqPath,
          specRef: request_.ocdReference._private.storeDataSpec
        });

        if (filterResponse.error || !filterResponse.result) {
          errors.push("Cannot read controller data store namespace path '".concat(fqPath, "' because it is not possible to construct a read filter for this namespace."));
          errors.push(filterResponse.error);
          return "break";
        } // if error


        var targetNamespaceSpec = filterResponse.result;
        filterResponse = arccore.filter.create({
          operationID: operationId,
          operationName: "Controller Data Read Filter ".concat(operationId),
          operationDescription: "Validated/normalized read operations from OCD namespace '".concat(fqPath, "'."),
          bodyFunction: function bodyFunction() {
            return getNamespaceInReferenceFromPathFilter.request({
              namespacePath: fqPath,
              dataRef: request_.ocdReference._private.storeData,
              specRef: request_.ocdReference._private.storeDataSpec
            });
          },
          outputFilterSpec: targetNamespaceSpec
        });

        if (filterResponse.error) {
          errors.push("Cannot read controller data store namespace path '".concat(fqPath, "' because it is not possible to construct a read filter for this namespace."));
          errors.push(filterResponse.error);
          return "break";
        } // if error
        // Cache the newly-created read filter.


        request_.ocdReference._private.accessFilters.read[fqPath] = filterResponse.result;
      } // if read filter doesn't exist


      var readFilter = request_.ocdReference._private.accessFilters.read[fqPath];
      response = readFilter.request();
      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    } // end while


    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;