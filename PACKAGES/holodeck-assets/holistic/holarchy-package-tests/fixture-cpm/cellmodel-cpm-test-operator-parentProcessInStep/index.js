"use strict";

// cellmodel-cpm-test-operator-parentProcessInStep/index.js
var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm").cml;

var cellModel = new holarchy.CellModel({
  id: "YasRidtOS-qeNNXio5CbVQ",
  name: "CPM Parent Process In Step Operator Test Model",
  description: "A model to test CPM parent process in step operator.",
  apm: {
    id: "UMlS451nSWq6yDZNwcUTaw",
    name: "CPM Parent Process In Step Operator Test Process",
    description: "A process to test CPM parent process in step operator."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;