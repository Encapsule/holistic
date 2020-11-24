"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// HolisticAppCommonService.js
var constructorFilter = require("./lib/filters/HolisticAppCommonService-method-constructor-filter");

var HolisticAppCommonService = /*#__PURE__*/function () {
  function HolisticAppCommonService(request_) {
    _classCallCheck(this, HolisticAppCommonService);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      this._private = {
        constructorError: null
      };
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      var filterResponse = constructorFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("HolisticAppCommonService::constructor failed yielding a zombie instance.");
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(HolisticAppCommonService, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private : this._private.constructorError;
    }
  }]);

  return HolisticAppCommonService;
}();

module.exports = HolisticAppCommonService;