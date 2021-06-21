"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// holodeck-harness-filter-input-spec-generator.js
var holodeckHarnessFilterContextSpec = require("./holodeck-harness-filter-context-spec");

module.exports = function (programCommandSpec_) {
  return {
    ____label: "Holodeck Harness Request",
    ____description: "Defines the outer format of all holodeck harness plug-in filter requests.",
    ____types: "jsObject",
    context: _objectSpread({}, holodeckHarnessFilterContextSpec),
    programRequest: _objectSpread({
      ____label: "Holodeck Program Request",
      ____description: "A holodeck program request descriptor object to be evaluated via a holodeck harness plug-in filter call.",
      ____types: "jsObject",
      id: {
        ____label: "Program Request ID",
        ____description: "A unique IRUT ID used to identify this program request object.",
        ____accept: "jsString"
      },
      name: {
        ____label: "Program Request Name",
        ____description: "A short descriptive name to be used in log files.",
        ____accept: "jsString"
      },
      description: {
        ____label: "Program Request Description",
        ____description: "A short description of the program request (e.g. what it does in brief/why).",
        ____accept: "jsString"
      }
    }, programCommandSpec_)
  };
};