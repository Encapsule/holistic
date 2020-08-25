"use strict";

// cellmodel-cpm-test-operator-ancestorProcessesAllInStep/index.js
var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm").cml;

var cellModel = new holarchy.CellModel({
  id: "wjUvGFxOQu6H3lZeII0cbA",
  name: "CPM Ancestor Processes All In Step Operator Test Model",
  description: "A model to test CPM ancestor processes all in step operator.",
  apm: {
    id: "c09ke74xRza4Q9u2Ly0NIA",
    name: "CPM Ancestor Processes All In Step Operator Test Process",
    description: "A process to test CPM ancestor all in step operator."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;