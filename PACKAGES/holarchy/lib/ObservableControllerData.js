"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var arccore = require("@encapsule/arccore");

var getNamespaceInReferenceFromPathFilter = require("./filters/get-namespace-in-reference-from-path");

var dataPathResolveFilter = require("./filters/ocd-method-data-path-resolve-filter");

var ObservableControllerData =
/*#__PURE__*/
function () {
  // request = { spec: filter descriptor object, data: variant }
  function ObservableControllerData(request_) {
    _classCallCheck(this, ObservableControllerData);

    var factoryResponse = arccore.filter.create({
      operationID: "3aDV_cacQByO0tTzVrBxnA",
      operationName: "OCD Constructor Request Processor",
      operationDescription: "Validate/normalize data per input spec to deduce initial runtime value of the state data managed by an OPC class instance.",
      inputFilterSpec: request_.spec
    });

    if (factoryResponse.error) {
      throw new Error(factoryResponse.error);
    }

    var dataFilter = factoryResponse.result;
    var filterResponse = dataFilter.request(request_.data);

    if (filterResponse.error) {
      throw new Error(filterResponse.error);
    } // Private implementation state. Consumers of this class should not access the _private namespace; use class methods to interact with class instances instead.


    this._private = {
      storeData: filterResponse.result,
      storeDataSpec: dataFilter.filterDescriptor.inputFilterSpec,
      accessFilters: {
        read: {},
        write: {}
      }
    }; // API methods... Use these methods.

    this.toJSON = this.toJSON.bind(this);
    this.readNamespace = this.readNamespace.bind(this);
    this.writeNamespace = this.writeNamespace.bind(this);
    this.getNamespaceSpec = this.getNamespaceSpec.bind(this);
  } // end constructor


  _createClass(ObservableControllerData, [{
    key: "toJSON",
    value: function toJSON() {
      // Only return the data; no other runtime state maintained by this class instance should ever be serialized.
      return this._private.storeData;
    } // Returns an arccore.filter-style response descriptor object.

  }, {
    key: "readNamespace",
    value: function readNamespace(dataPath_) {
      var _this = this;

      var methodResponse = {
        error: null,
        result: undefined
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true; // Determine if we have already instantiated a read filter for this namespace.

        if (!this._private.accessFilters.read[dataPath_]) {
          // Cache miss. Create a new read filter for the requested namespace.
          var operationId = arccore.identifier.irut.fromReference("read-filter" + dataPath_).result;
          var filterResponse = getNamespaceInReferenceFromPathFilter.request({
            namespacePath: dataPath_,
            sourceRef: this._private.storeDataSpec,
            parseFilterSpec: true
          });

          if (filterResponse.error || !filterResponse.result) {
            errors.push("Cannot read controller data store namespace path '".concat(dataPath_, "' because it is not possible to construct a read filter for this namespace."));
            errors.push(filterResponse.error);
            break;
          } // if error


          var targetNamespaceSpec = filterResponse.result;
          filterResponse = arccore.filter.create({
            operationID: operationId,
            operationName: "Controller Data Read Filter ".concat(operationId),
            operationDescription: "Validated/normalized read operations from OCD namespace '".concat(dataPath_, "'."),
            bodyFunction: function bodyFunction() {
              return getNamespaceInReferenceFromPathFilter.request({
                namespacePath: dataPath_,
                sourceRef: _this._private.storeData
              });
            },
            outputFilterSpec: targetNamespaceSpec
          });

          if (filterResponse.error) {
            errors.push("Cannot read controller data store namespace path '".concat(dataPath_, "' because it is not possible to construct a read filter for this namespace."));
            errors.push(filterResponse.error);
            break;
          } // if error
          // Cache the newly-created read filter.


          this._private.accessFilters.read[dataPath_] = filterResponse.result;
        } // if read filter doesn't exist


        var readFilter = this._private.accessFilters.read[dataPath_];
        methodResponse = readFilter.request();
        break;
      } // end while


      if (errors.length) {
        methodResponse.error = errors.join(" ");
      }

      return methodResponse;
    } // readNamespace
    // Returns an arccore.filter-style response descriptor object.

  }, {
    key: "writeNamespace",
    value: function writeNamespace(dataPath_, value_) {
      var _this2 = this;

      var methodResponse = {
        error: null,
        result: undefined
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true; // Determine if we have already instantiated a read filter for this namespace.

        if (!this._private.accessFilters.write[dataPath_]) {
          var _ret = function () {
            // Cache miss. Create a new write filter for the requested namespace.
            var operationId = arccore.identifier.irut.fromReference("write-filter" + dataPath_).result;
            var pathTokens = dataPath_.split(".");

            if (pathTokens.length < 2) {
              errors.push("Cannot write to controller data store namespace '".concat(dataPath_, "'; invalid attempt to overwrite the entire store."));
              return "break";
            } // if invalid write attempt


            var parentPath = pathTokens.slice(0, pathTokens.length - 1).join(".");
            var targetNamespace = pathTokens[pathTokens.length - 1];
            var filterResponse = getNamespaceInReferenceFromPathFilter.request({
              namespacePath: dataPath_,
              sourceRef: _this2._private.storeDataSpec,
              parseFilterSpec: true
            });

            if (filterResponse.error || !filterResponse.result) {
              errors.push("Cannot write controller data store namespace path '".concat(dataPath_, "' because it is not possible to construct a write filter for this namespace."));
              errors.push(filterResponse.error);
              return "break";
            } // if error


            var targetNamespaceSpec = filterResponse.result;
            filterResponse = arccore.filter.create({
              operationID: operationId,
              operationName: "Controller Data Write Filter ".concat(operationId),
              operationDescription: "Validated/normalized write to OCD namespace '".concat(dataPath_, "'."),
              inputFilterSpec: targetNamespaceSpec,
              bodyFunction: function bodyFunction(request_) {
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
                    sourceRef: _this2._private.storeData
                  });

                  if (innerResponse.error) {
                    errors.push("Unable to write to OCD namespace '".concat(dataPath_, "' due to an error reading parent namespace '").concat(parentPath, "'."));
                    errors.push(innerResponse.error);
                    break;
                  }

                  var parentNamespace = innerResponse.result;
                  parentNamespace[targetNamespace] = request_; // the actual write

                  response.result = request_; // return the validated/normalized data written to the OCD

                  break;
                }

                if (errors.length) {
                  response.error = errors.join(" ");
                }

                return response;
              }
            });

            if (filterResponse.error) {
              errors.push("Cannot write controller data store namespace path '".concat(dataPath_, "' because it is not possible to construct a write filter for this namespace."));
              errors.push(filterResponse.error);
              return "break";
            } // if error
            // Cache the newly-created write filter.


            _this2._private.accessFilters.write[dataPath_] = filterResponse.result;
          }();

          if (_ret === "break") break;
        } // if write filter doesn't exist


        var writeFilter = this._private.accessFilters.write[dataPath_];
        methodResponse = writeFilter.request(value_);
        break;
      } // end while


      if (errors.length) {
        methodResponse.error = errors.join(" ");
      }

      return methodResponse;
    } // writeNamespace

  }, {
    key: "getNamespaceSpec",
    value: function getNamespaceSpec(dataPath_) {
      var methodResponse = {
        error: null,
        result: undefined
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var filterResponse = getNamespaceInReferenceFromPathFilter.request({
          namespacePath: dataPath_,
          sourceRef: this._private.storeDataSpec,
          parseFilterSpec: true
        });

        if (filterResponse.error) {
          errors.push("Cannot resolve a namespace descriptor in filter specification for path '".concat(dataPath_, "'."));
          errors.push(filterResponse.error);
          break;
        } // if error


        methodResponse.result = filterResponse.result;
        break;
      }

      if (errors.length) {
        methodResponse.error = errors.join(" ");
      }

      return methodResponse;
    } // getNamespaceSpec

  }], [{
    key: "dataPathResolve",
    value: function dataPathResolve(request_) {
      return dataPathResolveFilter.request(request_);
    }
  }]);

  return ObservableControllerData;
}(); // class ObservableControllerData


module.exports = ObservableControllerData;