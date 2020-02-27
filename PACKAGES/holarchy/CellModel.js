"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// CellModel.js
var arccore = require("@encapsule/arccore");

var constructorFilter = require("./lib/filters/cm-method-constructor-filter");

var getArtifactFilter = require("./lib/filters/cm-method-get-artifact-filter");

var getConfigFilter = require("./lib/filters/cm-method-get-config-filter");

module.exports =
/*#__PURE__*/
function () {
  function CellModel(request_) {
    _classCallCheck(this, CellModel);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true; // Allocate private per-class-instance state.

      this._private = {
        constructorError: null
      };
      this.vdid = null;
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.getID = this.getID.bind(this);
      this.getVDID = this.getVDID.bind(this);
      this.getName = this.getName.bind(this);
      this.getDescription = this.getDescription.bind(this); // These are primarily for support of CellProcessor ES6 class.
      // But, are also leveraged by the @encapsule/holodeck-assets CellModel harness.

      this.getArtifact = this.getArtifact.bind(this);
      this.getCMConfig = this.getCMConfig.bind(this); // If the caller didn't pass an object, just pass it through to the constructor filter which will fail w/correct error message.

      var filterResponse = void 0;

      if (!request_ || Object.prototype.toString.call(request_) !== "[object Object]") {
        filterResponse = constructorFilter.request(request_);
      } else {
        filterResponse = constructorFilter.request(_objectSpread({
          CellModel: CellModel,
          CellModelInstance: this
        }, request_));
      }

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("CellModel::constructor for [".concat(request_ && request_.id ? request_.id : "unspecified", "::").concat(request_ && request_.name ? request_.name : "unspecified", "] failed yielding a zombie instance."));
      this._private.constructorError = errors.join(" ");
    }
  } // Returns a Boolean


  _createClass(CellModel, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    } // If isValid then serializable object. Otherwise, constructor error string.

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private : this._private.constructorError;
    } // If isValid() then IRUT string. Otherwise, constructor error string.

  }, {
    key: "getID",
    value: function getID() {
      return this.isValid() ? this._private.id : this.toJSON();
    } // Always returns an IRUT string. Should not be used if !isValid().

  }, {
    key: "getVDID",
    value: function getVDID() {
      if (!this.vdid) {
        this.vdid = arccore.identifier.irut.fromReference(this._private).result;
      }

      return this.vdid;
    } // If isValid() then name string returned. Otherwise, constructor error string.

  }, {
    key: "getName",
    value: function getName() {
      return this.isValid() ? this._private.name : this.toJSON();
    } // If isValid() then descriptor string returned. Otherwise, constructor error string.

  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.isValid() ? this._private.description : this.toJSON();
    } // Returns a filter response object.

  }, {
    key: "getArtifact",
    value: function getArtifact(request_) {
      // request = { id: optional, type: optional }
      var response = getArtifactFilter.request(_objectSpread({}, request_, {
        CellModelInstance: this
      }));

      if (response.error) {
        response.error = "CellModel::getArtifact failed: ".concat(response.error);
      }

      return response;
    } // getArtifact
    // Returns a filter response object.

  }, {
    key: "getCMConfig",
    value: function getCMConfig(request_) {
      // request = { id: optional CM ID, type: optional }
      var response = getConfigFilter.request(_objectSpread({}, request_, {
        CellModelInstance: this
      }));

      if (response.error) {
        response.error = "CellModel::getCMConfig failed: ".concat(response.error);
      }

      return response;
    } // getCMConfig (TODO: getConfig)

  }]);

  return CellModel;
}();