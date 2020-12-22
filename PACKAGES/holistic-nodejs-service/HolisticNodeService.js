"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// HolisticNodeService.js
var path = require("path");

var process = require("process");

console.log("> \"".concat(path.resolve(__filename), "\" module loading..."));

var constructorFilter = require("./lib/filters/HolisticNodeService-method-constructor-filter");

var HolisticNodeService = /*#__PURE__*/function () {
  function HolisticNodeService(request_) {
    _classCallCheck(this, HolisticNodeService);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      this._private = {
        constructorError: null
      };
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.listen = this.listen.bind(this);
      var filterResponse = constructorFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("HolisticAppServer::constructor failed yielding a zombie instance.");
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(HolisticNodeService, [{
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
    key: "listen",
    value: function listen(port_) {
      if (!this.isValid()) {
        console.log("App server service is not prepared to listen! Sorry. Here is why:");
        console.error(this.toJSON());
        process.exitCode = 1; // Exit process w/error indicator set
      }

      this._private.httpServerInstance.holismInstance.httpRequestProcessor.listen(port_);
    }
  }]);

  return HolisticNodeService;
}();

module.exports = HolisticNodeService;