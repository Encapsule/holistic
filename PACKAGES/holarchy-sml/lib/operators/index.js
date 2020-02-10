"use strict";

// OPC core transition operators:
module.exports = {
  logical: [// Basic logical operators
  require("./TransitionOperator-logical-and"), require("./TransitionOperator-logical-or"), require("./TransitionOperator-logical-not"), require("./TransitionOperator-logical-true"), // OCD primitive transition operators
  require("./TransitionOperator-ocd-is-truthy"), require("./TransitionOperator-ocd-is-boolean-flag-set"), require("./TransitionOperator-ocd-is-less-than-value"), require("./TransitionOperator-ocd-is-greater-than-value"), require("./TransitionOperator-ocd-is-identical-to-value"), require("./TransitionOperator-ocd-array-length-equal-to-value"), // OPM primitive transition operators.
  require("./TransitionOperator-opm-at-step")]
};