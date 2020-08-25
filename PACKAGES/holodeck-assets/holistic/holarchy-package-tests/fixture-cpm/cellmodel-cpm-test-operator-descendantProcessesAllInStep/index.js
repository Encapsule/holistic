"use strict";

// cellmodel-cpm-test-operator-descendantProcessesAllInStep/index.js
var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm").cml;

var cellModel = new holarchy.CellModel({
  id: "DXfqoTLmRzi-IloxkIFbRQ",
  name: "CPM Descendant Processes All In Step Operator Test Model",
  description: "A model to test the CPM descendant processes all in step operator.",
  apm: {
    id: "XzNJP6LyTCOnhGPKpJIjzg",
    name: "CPM Descendant Processes ALl In Step Operator Test Process",
    description: "A process to test the CPM descendant processes in step operator."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;