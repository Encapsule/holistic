"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

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
  } // RUNTIME API FOR CellProcessor class instance.


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
    } // DEVELOPER API FOR ad-hoc inspection of CellProcessor class instance.
    // WARNING: DO NOT WRITE CODE THAT CALLS DEVELOPER API!
    // This is especially true for any tests. I reserve the right to change these
    // for whatever purpose at any time the change is required to unblock.
    // IF YOU NEED THIS INFO INSIDE CELLPROCESSOR: No you don't. Or, at least
    // not like this and not this way. Talk to me before you attempt self
    // introspection; there are serious system stability concerns as well as a
    // number of unresolved issues regarding CellProcessor instance serialization/
    // deserialization that must be handled w/utmost care in order to safely
    // build a single generic solution for CellProcessor instance self-introspection
    // that is useful for developers. And, that we can register and
    // activate conditionally only in development builds (and otherwise not due to
    // performance and runtime cellplane stability concerns; customers never see it).

  }, {
    key: "devInfo",
    get: function get() {
      // Dump CellProcessor instance information to console.log
      if (!this.isValid()) {
        return this.toJSON();
      }

      console.log("CellProcessor<[".concat(this._private.cm.getID(), "::").concat(this._private.cm.getVDID(), "::").concat(this._private.cm.getName(), "]> CellProcessor instance metadata:"));
      return {
        id: this._private.opc._private.id,
        iid: this._private.opc._private.iid,
        name: this._private.opc._private.name,
        description: this._private.opc._private.description,
        evalCount: this._private.opc._private.evalCount,
        options: this._private.opc._private.options,
        actorStack: this._private.opc._private.opcActorStack
      };
    }
  }, {
    key: "devArtifacts",
    get: function get() {
      // Dump CellProcessManager's CellModel artifact config report to console.log
      if (!this.isValid()) {
        return this.toJSON();
      }

      console.log("CellProcessor<[".concat(this._private.cm.getID(), "::").concat(this._private.cm.getVDID(), "::").concat(this._private.cm.getName(), "]> instance CellModel artifact digraph:"));
      return this._private.cm.getCMConfig();
    }
  }, {
    key: "devData",
    get: function get() {
      // Dump CellProcessor instance cellplane data to console.log
      if (!this.isValid()) {
        return this.toJSON();
      }

      console.log("CellProcessor<[".concat(this._private.cm.getID(), "::").concat(this._private.cm.getVDID(), "::").concat(this._private.cm.getName(), "]> instance cellplane memory data:"));
      return this._private.opc._private.ocdi._private.storeData;
    }
  }, {
    key: "devSpec",
    get: function get() {
      // Dump CellProcessor instance cellplane data filter specification to console.log
      if (!this.isValid()) {
        return this.toJSON();
      }

      console.log("CellProcessor<[".concat(this._private.cm.getID(), "::").concat(this._private.cm.getVDID(), "::").concat(this._private.cm.getName(), "]> instance cellplane memory specification:"));
      return this._private.opc._private.ocdi._private.storeDataSpec;
    }
  }, {
    key: "devCells",
    get: function get() {
      // Dump CellProcessor instance mapping between registered AbstractProcessModel (APM) instances and cellplane binding paths to console.log
      if (!this.isValid()) {
        return this.toJSON();
      }

      console.log("CellProcessor<[".concat(this._private.cm.getID(), "::").concat(this._private.cm.getVDID(), "::").concat(this._private.cm.getName(), "]> instance cellplane cell map:"));
      return this._private.opc._private.opmiSpecPaths.reduce(function (cellMap_, opciCellBinding_) {
        cellMap_[opciCellBinding_.specPath] = opciCellBinding_.opmiRef;
        return cellMap_;
      }, {});
    }
  }, {
    key: "devLastEval",
    get: function get() {
      if (!this.isValid()) {
        return this.toJSON();
      }

      console.log("CellProcessor<[".concat(this._private.cm.getID(), "::").concat(this._private.cm.getVDID(), "::").concat(this._private.cm.getName(), "]> instance last cellplane evaluation telemetry data:"));
      return this._private.opc._private.lastEvalResponse;
    }
  }, {
    key: "devProcesses",
    get: function get() {
      // Dump CellProcessor instance CellProcessManager (apmBindingPath === "~") owned (activated via CellProcessor.process.activate) and shared (activated via CellProcessor.proxy.connect) cell process digraphs (advanced).
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