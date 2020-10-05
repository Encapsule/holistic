"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// CellT2Point.js
var arccore = require("@encapsule/arccore");

var constructorFilter = require("./lib/filters/cpp-method-constructor-filter");

module.exports = /*#__PURE__*/function () {
  function CellProcessPlane(request_) {
    _classCallCheck(this, CellProcessPlane);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      this._private = {
        constructorError: null
      };
      this.vdid = null;
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this); // this.getID = this.getID.bind(this);
      // this.getVDID = this.getVDID.bind(this);
      // this.getName = this.getName.bind(this);
      // this.getDescription = this.getDescription.bind(this);

      var filterResponse = constructorFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("CellT2Point::constructor failed yielding a zombie instance.");
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(CellProcessPlane, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return !this.isValid() ? this._private.constructorError : {
        weNeedSomethingHere: {}
      };
    }
  }]);

  return CellProcessPlane;
}();