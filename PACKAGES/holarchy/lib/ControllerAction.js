"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var constructorFilter = require("./filters/cac-method-constructor-filter");

module.exports =
/*#__PURE__*/
function () {
  function ControllerAction(request_) {
    _classCallCheck(this, ControllerAction);

    // #### sourceTag: ufoEHFc9RKOiy4gPXLT1lA
    var errors = [];
    var inBreakScope = false; // Allocate private per-class-instance state.

    this._private = {
      constructorError: null
    };
    this.isValid = this.isValid.bind(this);
    this.toJSON = this.toJSON.bind(this);
    this.getFilter = this.getFilter.bind(this);

    while (!inBreakScope) {
      inBreakScope = true;
      var filterResponse = constructorFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("ControllerAction::constructor for [".concat(request_ && request_.id ? request_.id : "unspecified", "::").concat(request_ && request_.name ? request_.name : "unspecified", "] failed yielding a zombie instance."));
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(ControllerAction, [{
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

      return this._private.filterDescriptor;
    }
  }, {
    key: "getFilter",
    value: function getFilter() {
      if (!this.isValid()) {
        return this._private.constructorError;
      }

      return this._private;
    }
  }]);

  return ControllerAction;
}();