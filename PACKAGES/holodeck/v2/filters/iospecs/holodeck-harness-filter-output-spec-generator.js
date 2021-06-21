"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// holodeck-harness-filter-base-output-spec.js
var holodeckHarnessFilterContextSpec = require("./holodeck-harness-filter-context-spec");

module.exports = function (pluginResultSpec_) {
  return {
    ____label: "Holodeck Harness Result",
    ____description: "Structure returned to Holodeck.runProgram method for further processing.",
    ____types: "jsObject",
    context: _objectSpread({}, holodeckHarnessFilterContextSpec),
    pluginResult: _objectSpread({}, pluginResultSpec_),
    programRequest: {
      ____label: "Holodeck Subprogram Request",
      ____description: "Evaluation of a holodeck plug-in harness filter may produce a subprogram to be evaluated by holodeck environment using the environment context specified by //.context.",
      ____accept: ["jsArray", "jsObject", "jsNull"],
      // Holodeck will auto-flatten arrays into N harness requests w/shared context. And, then send the request(s) through RDMR to some specific tree of harness filter plug-ins for evaluation. So, no detailed spec needed here.
      ____defaultValue: null
    }
  };
};