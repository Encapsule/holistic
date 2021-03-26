"use strict";

// ocd-method-write-namespace-filter.js
var arccore = require("@encapsule/arccore");

var ocdMethodPathSpec = require("./iospecs/ocd-method-path-spec");

var getNamespaceInReferenceFromPathFilter = require("./get-namespace-in-reference-from-path");

var factoryResponse = arccore.filter.create({
  operationID: "NqAyu1cLQQyX0w95zaQt6A",
  operationName: "OCD::writeNamespace Method Filter",
  operationDescription: "Implementes ObservableControllerData.writeNamespace method.",
  inputFilterSpec: {
    ____label: "OCD Write Namespace Request",
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
    path: ocdMethodPathSpec,
    data: {
      ____label: "Write Data",
      ____opaque: true
    }
  },
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
      inBreakScope = true;
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


      if (!request_.ocdReference._private.accessFilters.write[fqPath]) {
        // Cache miss. Create a new write filter for the requested namespace.
        var operationId = arccore.identifier.irut.fromReference("write-filter" + fqPath).result;
        var pathTokens = fqPath.split(".");

        if (pathTokens.length < 2) {
          errors.push("Cannot write to controller data store namespace '".concat(fqPath, "'; invalid attempt to overwrite the entire store."));
          return "break";
        } // if invalid write attempt


        var parentPath = pathTokens.slice(0, pathTokens.length - 1).join(".");
        var targetNamespace = pathTokens[pathTokens.length - 1];
        var filterResponse = getNamespaceInReferenceFromPathFilter.request({
          namespacePath: fqPath,
          specRef: request_.ocdReference._private.storeDataSpec
        });

        if (filterResponse.error || !filterResponse.result) {
          errors.push("Cannot write controller data store namespace path '".concat(fqPath, "' because it is not possible to construct a write filter for this namespace."));
          errors.push(filterResponse.error);
          return "break";
        } // if error


        var targetNamespaceSpec = filterResponse.result;
        filterResponse = arccore.filter.create({
          operationID: operationId,
          operationName: "Controller Data Write Filter ".concat(operationId),
          operationDescription: "Validated/normalized write to OCD namespace '".concat(fqPath, "'."),
          inputFilterSpec: targetNamespaceSpec,
          bodyFunction: function bodyFunction(data_) {
            var response = {
              error: null,
              result: undefined
            };
            var errors = [];
            var inBreakScope = false;

            while (!inBreakScope) {
              inBreakScope = true;
              var innerResponse = getNamespaceInReferenceFromPathFilter.request({
                namespacePath: parentPath,
                dataRef: request_.ocdReference._private.storeData,
                specRef: request_.ocdReference._private.storeDataSpec
              });

              if (innerResponse.error) {
                errors.push("Unable to write to OCD namespace '".concat(fqPath, "' due to an error reading parent namespace '").concat(parentPath, "'."));
                errors.push(innerResponse.error);
                break;
              }

              var parentNamespace = innerResponse.result; // You are only allowed to write into a collection (i.e. an Object or an Array). You cannot write into a POD or function.

              var parentNamespaceTypeString = Object.prototype.toString.call(parentNamespace);

              switch (parentNamespaceTypeString) {
                case "[object Array]":
                case "[object Object]":
                  break;

                default:
                  errors.push("Unable to write to OCD namespace '".concat(fqPath, "' because the value currently stored in the parent namespace, '").concat(parentPath, "' is of type \"").concat(parentNamespaceTypeString, "\" instead of \"[object Object]\" or \"[object Array]\" as is required to complete this writeNamespace request."));
                  break;
              }

              if (!errors.length) {
                // the actual write & return the validated/normalized data written to the OCD store.
                parentNamespace[targetNamespace] = response.result = data_;
              }

              break;
            }

            if (errors.length) {
              response.error = errors.join(" ");
            }

            return response;
          }
        });

        if (filterResponse.error) {
          errors.push("Cannot write controller data store namespace path '".concat(fqPath, "' because it is not possible to construct a write filter for this namespace."));
          errors.push(filterResponse.error);
          return "break";
        } // if error
        // Cache the newly-created write filter.


        request_.ocdReference._private.accessFilters.write[fqPath] = filterResponse.result;
      } // if write filter doesn't exist


      var writeFilter = request_.ocdReference._private.accessFilters.write[fqPath];
      response = writeFilter.request(request_.data);
      request_.ocdReference._private.dirty = true;
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