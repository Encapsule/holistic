"use strict";

// This module exports an @encapsule/holarchy Cell Model definition object.
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.CellModel({
  id: "XzXOaQFnRRG6UFElKUNIeQ",
  name: "Holarchy Core Memory Operators",
  description: "A collection of TransitionOperator plug-ins that perform logical comparisons operatations on cell processs memory.",
  operators: [require("./TransitionOperator-ocd-array-length-equal-to-value"), require("./TransitionOperator-ocd-compare-values"), require("./TransitionOperator-ocd-is-boolean-flag-set"), require("./TransitionOperator-ocd-is-greater-than-value"), require("./TransitionOperator-ocd-is-identical-to-value"), require("./TransitionOperator-ocd-is-less-than-value"), require("./TransitionOperator-ocd-is-truthy")]
});