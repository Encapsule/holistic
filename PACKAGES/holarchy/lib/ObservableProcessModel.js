"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// ObservableProcessModel.js
var constructorRequestFilter = require("./filters/opm-method-constructor-filter");

var ObservableProcessModel =
/*#__PURE__*/
function () {
  function ObservableProcessModel(request_) {
    _classCallCheck(this, ObservableProcessModel);

    // #### sourceTag: If9EVP5OSPqQZz07Dg_05Q
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
      this.getName = this.getName.bind(this);
      this.getDescription = this.getDescription.bind(this);
      this.getStepDescriptor = this.getStepDescriptor.bind(this);
      this.getDataSpec = this.getDataSpec.bind(this);
      this.getDigraph = this.getDigraph.bind(this);
      var filterResponse = constructorRequestFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("ObservableProcessModel::constructor for [".concat(request_ && request_.id ? request_.id : "unspecified", "::").concat(request_ && request_.name ? request_.name : "unspecified", "] failed yielding a zombie instance."));
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(ObservableProcessModel, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private.declaration : this._private.constructorError;
    }
  }, {
    key: "getID",
    value: function getID() {
      return this.isValid() ? this._private.declaration.id : this._private.constructorError;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.isValid() ? this._private.declaration.name : this._private.constructorError;
    }
  }, {
    key: "getDescription",
    value: function getDescription() {
      return this.isValid() ? this._private.declaration.description : this._private.constructorError;
    }
  }, {
    key: "getStepDescriptor",
    value: function getStepDescriptor(stepLabel_) {
      return this.isValid() ? this._private.declaration.steps[stepLabel_] : this._private.constructorError;
    }
  }, {
    key: "getDataSpec",
    value: function getDataSpec() {
      return this.isValid() ? this._private.declaration.opmDataSpec : this._private.constructorError;
    }
  }, {
    key: "getDigraph",
    value: function getDigraph() {
      return this.isValid() ? this._private.digraph : this._private.constructorError;
    }
  }]);

  return ObservableProcessModel;
}();

module.exports = ObservableProcessModel;