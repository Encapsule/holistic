"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// HolodeckHarness.js (v2)
var constructorFilter = require("./filters/holodeck-harness-method-constructor-filter");

module.exports = /*#__PURE__*/function () {
  function HolodeckHarness(constructorRequest_) {
    _classCallCheck(this, HolodeckHarness);

    this._private = {};
    this.isValid = this.isValid.bind(this);
    this.toJSON = this.toJSON.bind(this);
    this.getID = this.getID.bind(this);
    this.getName = this.getName.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getHarnessType = this.getHarnessType.bind(this);
    this.getHarnessFilter = this.getHarnessFilter.bind(this);
    var constructorResponse = constructorFilter.request(constructorRequest_);

    if (constructorResponse.error) {
      this._private.constructorError = constructorResponse.error;
      return;
    }

    this._private = constructorResponse.result;
  } // Returns Boolean true if constructor yields a valid object. Otherwise, false.


  _createClass(HolodeckHarness, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    } // Returns private instance state if valid. Otherwise, constructor error string.

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private : this._private.constructorError;
    } // Returns holodeck harness filter ID if valid. Otherwise, constructor error string.

  }, {
    key: "getID",
    value: function getID() {
      return this.isValid() ? this._private.harnessFilter.filterDescriptor.operationID : this.toJSON();
    } // Returns holodeck harness filter name if valid. Otherwise, constructor error string.

  }, {
    key: "getName",
    value: function getName() {
      return this.isValid() ? this._private.harnessFilter.filterDescriptor.operationName : this.toJSON();
    } // Returns holodeck harness filter description if valid. Otherwise, constructor error string.

  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.isValid() ? this._private.harnessFilter.filterDescriptor.operationDescription : this.toJSON();
    } // Returns holodeck harness filter type if valid. Otherwise, constructor error string.

  }, {
    key: "getHarnessType",
    value: function getHarnessType() {
      return this.isValid() ? this._private.harnessType : this.toJSON();
    } // Returns the holodeck harness filter if valid. Otherwise, constructor error string.

  }, {
    key: "getHarnessFilter",
    value: function getHarnessFilter() {
      return this.isValid() ? this._private.harnessFilter : this.toJSON();
    }
  }]);

  return HolodeckHarness;
}();