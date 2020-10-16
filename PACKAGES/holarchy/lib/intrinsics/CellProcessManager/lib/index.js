"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// cpm-lib.js (index.js)
//
// These functions have request/response semantics like an arccore.filter.
// But, are just really the bodyFunction's - they're called from deeply filtered
// code so we just assume all the types are correct at this level.
module.exports = _objectSpread(_objectSpread({}, require("./cpm-resolve-cell-process-coordinates")), {}, {
  getProcessManagerData: require("./cpm-get-cell-process-manager-data"),
  getProcessAncestorDescriptors: require("./cpm-get-cell-process-ancestor-descriptors"),
  getProcessChildrenDescriptors: require("./cpm-get-cell-process-children-descriptors"),
  getProcessDescendantDescriptors: require("./cpm-get-cell-process-descendant-descriptors"),
  getProcessParentDescriptor: require("./cpm-get-cell-process-parent-descriptor"),
  getProcessDescriptor: require("./cpm-get-cell-process-descriptor"),
  getProcessOwnershipReportDescriptor: require("./cpm-get-cell-process-ownership-report-descriptor")
});