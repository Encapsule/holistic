"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TransitionOperator.js
var arccore = require("@encapsule/arccore");

var constructorFilter = require("./lib/filters/top-method-constructor-filter");

module.exports = /*#__PURE__*/function () {
  function TransitionOperator(request_) {
    _classCallCheck(this, TransitionOperator);

    // #### sourceTag: FuMaLlqkSwW7przxe2XSdw
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      this._private = {
        constructorError: null
      };
      this.vdid = null;
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.getFilter = this.getFilter.bind(this);
      this.getID = this.getID.bind(this);
      this.getVDID = this.getVDID.bind(this);
      this.getName = this.getName.bind(this);
      this.getDescription = this.getDescription.bind(this);
      var filterResponse = constructorFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("TransitionOperator::constructor for [".concat(request_ && request_.id ? request_.id : "unspecified", "::").concat(request_ && request_.name ? request_.name : "unspecified", "] failed yielding a zombie instance."));
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(TransitionOperator, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      if (!this.isValid()) {
        return this._private.constructorError;
      }

      var response = {
        id: this.getID(),
        vdid: this.getVDID(),
        name: this.getName(),
        description: this.getDescription()
      };
      return response;
    }
  }, {
    key: "getFilter",
    value: function getFilter() {
      return this.isValid() ? this._private : this._private.constructorError;
    }
  }, {
    key: "getID",
    value: function getID() {
      return this.isValid() ? this._private.filterDescriptor.operationID : this._privateConstructorError;
    }
  }, {
    key: "getVDID",
    value: function getVDID() {
      if (!this.vdid) {
        this.vdid = arccore.identifier.irut.fromReference(this._private).result;
      }

      return this.vdid;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.isValid() ? this._private.filterDescriptor.operationName : this._privateConstructorError;
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.isValid() ? this._private.filterDescriptor.operationDescription : this._private.constructorError;
    }
  }]);

  return TransitionOperator;
}();