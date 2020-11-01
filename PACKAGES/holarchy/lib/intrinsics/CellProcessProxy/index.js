"use strict";

// SOURCES/LIB/holarchy/lib/intrinsics/CellProcessProxy/index.js
var CellModel = require("../../../CellModel");

var cellModel = new CellModel({
  id: "LG9CCSEmSYaU6Mp9J0wZ5g",
  name: "Holarchy Cell Process Proxy Helper Model",
  description: "A resuable helper cell model that allows developers to link namespace(s) defined in their own AbstractProcessModel(s) memory specifications to other cell processes.",
  apm: require("./AbstractProcessModel-cpp"),
  actions: [require("./ControllerAction-cpp-proxy-connect"), require("./ControllerAction-cpp-proxy-disconnect"), require("./ControllerAction-cpp-proxy-action") // TO BE REMOVED IN v0.0.48
  ],
  operators: [require("./TransitionOperator-cpp-proxy-status"), require("./TransitionOperator-cpp-proxy-operator") // TO BE REMNOVED IN v0.0.48
  ],
  subcells: []
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;