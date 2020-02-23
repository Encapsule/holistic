"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// CellModel.js
var arccore = require("@encapsule/arccore");

var constructorFilter = require("./lib/filters/cm-method-constructor-filter");

module.exports =
/*#__PURE__*/
function () {
  function CellModel(request_) {
    _classCallCheck(this, CellModel);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      this._private = {
        constructorError: null
      };
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.getID = this.getID.bind(this);
      this.getVDID = this.getVDID.bind(this);
      this.getName = this.getName.bind(this);
      this.getDescription = this.getDescription.bind(this);
      this.vdid = null;
      var filterResponse = void 0; // If the caller didn't pass an object, just pass it through to the constructor filter which will fail w/correct error message.

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
  }

  _createClass(CellModel, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private : this._private.constructorError;
    }
  }, {
    key: "getID",
    value: function getID() {
      return this.isValid() ? this._private.id : this._private.constructorError;
    }
  }, {
    key: "getVDID",
    value: function getVDID() {
      if (!this.vdid) {
        this.vdid = arccore.identifier.irut.fromReference(this._private);
      }

      return this.vdid;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.isValid() ? this._private.name : this._private.constructorError;
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.isValid() ? this._private.description : this._private.constructorError;
    }
  }]);

  return CellModel;
}();