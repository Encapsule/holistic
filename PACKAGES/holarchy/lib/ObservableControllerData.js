"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// ObserverableControllerData.js
var methodFilterConstructor = require("./filters/ocd-method-constructor-filter");

var methodFilterDataPathResolve = require("./filters/ocd-method-data-path-resolve-filter");

var methodFilterReadNamespace = require("./filters/ocd-method-read-namespace-filter");

var methodFilterWriteNamespace = require("./filters/ocd-method-write-namespace-filter");

var methodFilterGetNamespaceSpec = require("./filters/ocd-method-get-namespace-spec-filter");

module.exports = /*#__PURE__*/function () {
  function ObservableControllerData(request_) {
    _classCallCheck(this, ObservableControllerData);

    // request = { spec: filter descriptor object, data: variant }
    this.isValid = this.isValid.bind(this);
    this.toJSON = this.toJSON.bind(this);
    this.readNamespace = this.readNamespace.bind(this);
    this.writeNamespace = this.writeNamespace.bind(this);
    this.getNamespaceSpec = this.getNamespaceSpec.bind(this);
    var methodFilterResponse = methodFilterConstructor.request(request_);
    this._private = !methodFilterResponse.error ? methodFilterResponse.result : {
      constructorError: methodFilterResponse.error
    };
  } // end constructor


  _createClass(ObservableControllerData, [{
    key: "isValid",
    value: function isValid() {
      return this._private.constructorError ? false : true;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private.storeData : this._private.constructorError;
    }
  }, {
    key: "readNamespace",
    value: function readNamespace(path_) {
      return this.isValid() ? methodFilterReadNamespace.request({
        ocdClass: ObservableControllerData,
        ocdReference: this,
        path: path_
      }) : {
        error: this.toJSON()
      };
    }
  }, {
    key: "writeNamespace",
    value: function writeNamespace(path_, data_) {
      return this.isValid() ? methodFilterWriteNamespace.request({
        ocdClass: ObservableControllerData,
        ocdReference: this,
        path: path_,
        data: data_
      }) : {
        error: this.toJSON()
      };
    }
  }, {
    key: "getNamespaceSpec",
    value: function getNamespaceSpec(path_) {
      return this.isValid() ? methodFilterGetNamespaceSpec.request({
        ocdClass: ObservableControllerData,
        ocdReference: this,
        path: path_
      }) : {
        error: this.toJSON()
      };
    }
  }], [{
    key: "dataPathResolve",
    value: function dataPathResolve(request_) {
      return methodFilterDataPathResolve.request(request_);
    }
  }]);

  return ObservableControllerData;
}(); // class ObservableControllerData