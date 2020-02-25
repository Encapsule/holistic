"use strict";

// This module exports an @encapsule/holarchy Cell Model definition object.
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.CellModel({
  id: "EIZzpXTrSbqAQ32SF66aeA",
  name: "Holarchy Core Cell Operators",
  description: "A collection of TransitionOperator plug-ins that implement logical comparison operations on CellModel processes.",
  operators: [require("./TransitionOperator-opm-at-step")]
});