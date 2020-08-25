"use strict";

// cellmodel-cpm-test-operator-ancestorAnyInStep/index.js
var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm").cml;

var cellModel = new holarchy.CellModel({
  id: "4_rZ65rORrOEYJTCl5mOEQ",
  name: "CPM Ancestor Processes Any In Step Operator Test Model",
  description: "A model to test CPM ancestor processes any in step operator.",
  apm: {
    id: "we5IUb__Smqwkl4ghRl3Lw",
    name: "CPM Ancestor Processes Any In Step Operator Test Process",
    description: "A process to test CPM ancestor processes any in step operator."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;