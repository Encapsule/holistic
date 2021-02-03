"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
// @encapsule/holarchy Copyright (C) 2021 Christopher D. Russell for Encapsule Project
// CellProcessor.js
var constructorFilter = require("./lib/filters/cp-method-constructor-filter");

var actFilter = require("./lib/filters/cp-method-act-filter"); // TODO: use this or remove this (likely the later soon)
// const logger = require("./lib/util/holarchy-logger-filter");


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
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.isValid() ? this._private : this._private.constructorError;
    }
  }, {
    key: "act",
    value: function act(request_) {
      return this.isValid() ? actFilter.request(_objectSpread(_objectSpread({}, request_), {}, {
        opcRef: this._private.opc
      })) : {
        error: this.toJSON()
      };
    }
  }, {
    key: "memory",
    get: function get() {
      return !this.isValid() ? this.toJSON() : this.toJSON().opc.toJSON().ocdi.toJSON();
    }
  }, {
    key: "processes",
    get: function get() {
      if (!this.isValid()) {
        return this.toJSON();
      }

      var cpmMemory = this._private.opc._private.ocdi._private.storeData["x7pM9bwcReupSRh0fcYTgw_CellProcessor"];
      return {
        ownedCellProcessesDigraph: cpmMemory.ownedCellProcesses.digraph.toJSON(),
        sharedCellProcessesDigraph: cpmMemory.sharedCellProcesses.digraph.toJSON()
      };
    }
  }]);

  return CellProcessor;
}(); // class CellProcessor