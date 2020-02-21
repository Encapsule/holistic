"use strict";

// This module exports an @encapsule/holarchy Cell Model definition object.
module.exports = {
  id: "NPVQUV6gRZqVbyA9u8ljSg",
  name: "Holarchy Core Logic Operators",
  description: "A collection of TranitionOperator plug-ins that implement generic logic functions AND, OR, NOT, TRUE.",
  operators: [require("./TransitionOperator-logical-and"), require("./TransitionOperator-logical-or"), require("./TransitionOperator-logical-not"), require("./TransitionOperator-logical-true")]
};