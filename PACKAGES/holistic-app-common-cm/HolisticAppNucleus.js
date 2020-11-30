"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// HolisticAppNucleus.js
var constructorFilter = require("./lib/filters/HolisticAppNucleus-method-constructor-filter"); // This is a developer-facing API packaged as an ES6 class. The vast majority of the work is done by
// the constructor filter that is responsible for validating, normalizing, and processing the developer-
// specified constructor function inputs into what we call the "holistic cell nucleus".
//
// The "nucleus" is actually an immutable runtime database of usual-suspect artifacts (i.e. data,
// filter specs, filters, actions, operators, apm's, and cell models) that is required by both
// HolisticAppServer and HolisticAppClient ES6 class constructor functions.
//


var HolisticAppNucleus = /*#__PURE__*/function () {
  function HolisticAppNucleus(request_) {
    _classCallCheck(this, HolisticAppNucleus);

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

  _createClass(HolisticAppNucleus, [{
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

  return HolisticAppNucleus;
}();

module.exports = HolisticAppNucleus;