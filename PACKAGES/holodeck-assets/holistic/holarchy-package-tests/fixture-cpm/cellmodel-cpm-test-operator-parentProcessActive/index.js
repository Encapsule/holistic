"use strict";

// cellmodel-cpm-test-operator-parentProcessActive.js
var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm").cml;

var cellModel = new holarchy.CellModel({
  id: "mLTbOO97TtixSbKl8VB7gQ",
  name: "CPM Parent Process Active Operator Test Model",
  description: "A model to test CPM parent process active operator.",
  apm: {
    id: "kAuEmZA9Qn24PEZLBygGyA",
    name: "CPM Parent Process Active Operator Test Process",
    description: "A process to test CPM parent proces active operator."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;