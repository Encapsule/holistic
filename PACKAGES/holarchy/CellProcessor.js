"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
  O       o O       o O       o
  | O   o | | O   o | | O   o |
  | | O | | | | O | | | | O | |
  | o   O | | o   O | | o   O |
  o       O o       O o       O
*/
// @encapsule/holarchy Copyright (C) 2020 Christopher D. Russell for Encapsule Project
// CellProcessor.js
var constructorFilter = require("./lib/filters/cp-method-constructor-filter");

var logger = require("./lib/util/holarchy-logger-filter");

module.exports = /*#__PURE__*/function () {
  function CellProcessor(request_) {
    _classCallCheck(this, CellProcessor);

    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      this._private = {
        constructorError: null
      };
      this.isValid = this.isValid.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.act = this.act.bind(this);
      var filterResponse = constructorFilter.request(request_);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      this._private = filterResponse.result;
      break;
    }

    if (errors.length) {
      errors.unshift("CellProcessor::constructor for [".concat(request_ && request_.id ? request_.id : "unspecified", "::").concat(request_ && request_.name ? request_.name : "unspecified", "] failed yielding a zombie instance."));
      this._private.constructorError = errors.join(" ");
    }
  }

  _createClass(CellProcessor, [{
    key: "isValid",
    value: function isValid() {
      return !this._private.constructorError;
    } // This method will undergo some considerable transformation in the future.
    // It's not nearly done yet. But, done enough to use CellProcessor for many
    // jobs...Just not yet jobs that require that we save/restore the contents
    // of a CellProcessor and or specific subgraphs of the process digraph.

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private : this._private.constructorError;
    }
  }, {
    key: "act",
    value: function act(request_) {
      return this.isValid() ? this._private.opc.act(request_) : {
        error: this.toJSON()
      };
    }
  }]);

  return CellProcessor;
}(); // class CellProcessor