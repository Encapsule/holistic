"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var constructorFilter = require("./filters/top-method-constructor-filter");

module.exports =
/*#__PURE__*/
function () {
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
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.getFilter = this.getFilter.bind(this);
      this.getID = this.getID.bind(this);
      this.getName = this.getName.bind(this);
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
      return this.getFilter();
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
    key: "getName",
    value: function getName() {
      return this.isValid() ? this._private.filter.filterDescriptor.operationName : this._privateConstructorError;
    }
  }]);

  return TransitionOperator;
}();