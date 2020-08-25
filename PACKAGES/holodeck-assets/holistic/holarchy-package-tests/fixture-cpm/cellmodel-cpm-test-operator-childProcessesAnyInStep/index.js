"use strict";

// cellmodel-cpm-test-operator-childProcessesAnyInStep.js
var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm").cml;

var cellModel = new holarchy.CellModel({
  id: "C_wxJlAoTHW_7TWmpCXL2g",
  name: "CPM Child Processes Any In Step Operator Test Model",
  description: "A model to test the CPM child processes any in step operator.",
  apm: {
    id: "8LE0CnuHRMOKoGXn1kHdNA",
    name: "CPM Child Processes Any In Step Operator Test Process",
    description: "A model to test the CPM child processes any in step operator."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;