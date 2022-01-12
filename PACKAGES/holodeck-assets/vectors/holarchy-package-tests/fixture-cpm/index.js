"use strict";

// fixture-cpm-operators.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  // CellModel declaration
  id: "1jSxHMrqS6i9eDiRvDmfeg",
  name: "@encapsule/holarchy CellProcessor Test Model",
  description: "A wrapper for other CellModels defined to facilitate testing of the CellProcessor's intrinsic Cell Process Manager cell process operators and actions.",
  subcells: [require("./cellmodel-cpm-test-operator-ancestorProcessesActive"), require("./cellmodel-cpm-test-operator-ancestorProcessesAllInStep"), require("./cellmodel-cpm-test-operator-ancestorProcessesAnyInStep"), require("./cellmodel-cpm-test-operator-childProcessesActive"), require("./cellmodel-cpm-test-operator-childProcessesAllInStep"), require("./cellmodel-cpm-test-operator-childProcessesAnyInStep"), require("./cellmodel-cpm-test-operator-descendantProcessesActive"), require("./cellmodel-cpm-test-operator-descendantProcessesAllInStep"), require("./cellmodel-cpm-test-operator-descendantProcessesAnyInStep"), require("./cellmodel-cpm-test-operator-parentProcessActive"), require("./cellmodel-cpm-test-operator-parentProcessInStep"), require("./cellmodel-cpm-test-shared-processes")] // CPM Child Process Active Operator Test Model subcells

});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;