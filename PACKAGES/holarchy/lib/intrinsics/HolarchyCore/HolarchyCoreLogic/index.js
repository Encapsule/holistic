"use strict";

// This module exports an @encapsule/holarchy Cell Model definition object.
var CellModel = require("../../../../CellModel");

module.exports = new CellModel({
  id: "RW8Y2O-kRNSv87yXT962wQ",
  name: "Holarchy Core Logic Actions & Operators",
  description: "A collection of TranitionOperator plug-ins that implement generic logic functions AND, OR, NOT, TRUE.",
  operators: [require("./TransitionOperator-logical-and"), require("./TransitionOperator-logical-or"), require("./TransitionOperator-logical-not"), require("./TransitionOperator-logical-true")]
});