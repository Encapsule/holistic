"use strict";

// HolarchyCoreUtil/index.js
var CellModel = require("../../../../CellModel");

var cellModel = new CellModel({
  id: "YtwGXxryRyaNnxwc9NGJiQ",
  name: "Holarchy Core Utility Actions & Operators",
  description: "A collection of ControllerAction & TransitionOperator plug-ins that are of general use when building custom APM's in particular.",
  actions: [require("./ControllerAction-util-action-result-writer")],
  operators: []
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;