"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// HolisticHTML5Service.js
var constructorFilter = require("./lib/filters/HolisticHTML5Service-method-constructor-filter");

var HolisticHTML5Service = /*#__PURE__*/function () {
  function HolisticHTML5Service(request_) {
    _classCallCheck(this, HolisticHTML5Service);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      this._private = {
        constructorError: null
      };
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.boot = this.boot.bind(this);
      var filterResponse = constructorFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("HolisticAppClientService::constructor failed yielding a zombie instance.");
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(HolisticHTML5Service, [{
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
    key: "boot",
    value: function boot() {
      if (!this.isValid()) {
        return this.toJSON();
      }

      return this._private.serviceRuntime.act({
        actorName: "HolisticHTML5Service::boot Method",
        actorTaskDescription: "Attempting to boot and deserialize the HolisticHTML5Service process from HolisticNodeService-rendered HTML5 document.",
        actionRequest: {
          holistic: {
            app: {
              client: {
                boot: {}
              }
            }
          }
        }
      });
    }
  }]);

  return HolisticHTML5Service;
}();

module.exports = HolisticHTML5Service;