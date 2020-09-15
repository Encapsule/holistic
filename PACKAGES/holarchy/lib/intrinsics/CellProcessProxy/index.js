"use strict";

var _CellModel;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/index.js
var CellModel = require("../../../CellModel");

var cellModel = new CellModel((_CellModel = {
  id: "LG9CCSEmSYaU6Mp9J0wZ5g",
  name: "Holarchy Cell Process Proxy Helper Model",
  description: "Defines a helper model that functions as a proxy for action and operator calls to some (any) shared cell process."
}, _defineProperty(_CellModel, "description", ""), _defineProperty(_CellModel, "apm", require("./AbstractProcessModel-cpp")), _defineProperty(_CellModel, "actions", [require("./ControllerAction-cpp-proxy-action"), require("./ControllerAction-cpp-proxy-connect"), require("./ControllerAction-cpp-proxy-disconnect")]), _defineProperty(_CellModel, "operators", [require("./TransitionOperator-cpp-proxy-operator"), require("./TransitionOperator-cpp-proxy-logical-state-broken"), require("./TransitionOperator-cpp-proxy-logical-state-connected"), require("./TransitionOperator-cpp-proxy-logical-state-disconnected")]), _defineProperty(_CellModel, "subcells", []), _CellModel));

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;