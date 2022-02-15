"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// cp-method-act-filter.js
var arccore = require("@encapsule/arccore");

var opcMethodActInputSpec = require("./iospecs/opc-method-act-input-spec");

var opcMethodActOutputSpec = require("./iospecs/opc-method-act-output-spec");

(function () {
  var filterDeclaration = {
    operationID: "izxx6c96QCu0g8jl6TjAlw",
    operationName: "CellProcessor::act Filter",
    operationDescription: "Executes a synchronous action request made by an external actor (some function/subsystem outside of CellProcessor).",
    inputFilterSpec: _objectSpread(_objectSpread({}, opcMethodActInputSpec), {}, {
      ____label: "CellProcessor.act Method Request",
      ____description: "Defines the request format accepted by CellProcessor.act method."
    }),
    outputFilterSpec: _objectSpread(_objectSpread({}, opcMethodActOutputSpec), {}, {
      ____label: "CellProcessor.act Method Result",
      ____description: "Defines the result format returned by the CellProcessor.act method."
    }),
    bodyFunction: function bodyFunction(externalActorRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var actorName = "[".concat(this.filterDescriptor.operationID, "::").concat(this.filterDescriptor.operationName, "]");
        var opcActResponse = externalActorRequest_.opcRef.act(externalActorRequest_);
        var opcActResponse2 = null;
        response = opcActResponse; // Change no external API behavior.

        break;
      } // while


      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    } // bodyFunction

  }; // filterDeclaration

  var factoryResponse = arccore.filter.create(filterDeclaration);

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();