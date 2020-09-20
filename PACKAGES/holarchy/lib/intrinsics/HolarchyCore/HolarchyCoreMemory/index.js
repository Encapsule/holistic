"use strict";

// This module exports an @encapsule/holarchy Cell Model definition object.
var CellModel = require("../../../../CellModel");

module.exports = new CellModel({
  id: "jQxlhOe-RDilxY0sNIierQ",
  name: "Holarchy Core Memory Actions & Operators",
  description: "A collection of TransitionOperator plug-ins that perform logical comparisons operatations on cell processs memory.",
  operators: [require("./TransitionOperator-ocd-array-length-equal-to-value"), require("./TransitionOperator-ocd-compare-values"), require("./TransitionOperator-ocd-is-boolean-flag-set"), require("./TransitionOperator-ocd-is-greater-than-value"), require("./TransitionOperator-ocd-is-identical-to-value"), require("./TransitionOperator-ocd-is-less-than-value"), require("./TransitionOperator-ocd-is-truthy"), require("./TransitionOperator-ocd-array-is-empty"), require("./TransitionOperator-ocd-map-is-keyless")],
  actions: [require("./ControllerAction-ocd-read-namespace-indirect"), require("./ControllerAction-ocd-set-boolean-flag"), require("./ControllerAction-ocd-clear-boolean-flag"), require("./ControllerAction-ocd-subaction-response-writer")]
});