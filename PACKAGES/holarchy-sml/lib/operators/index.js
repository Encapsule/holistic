"use strict";

// OPC core transition operators:
module.exports = {
  logical: [// Basic logical operators
  require("./TransitionOperator-logical-and"), require("./TransitionOperator-logical-or"), require("./TransitionOperator-logical-not"), require("./TransitionOperator-logical-true"), // OCD value transition operators
  require("./TransitionOperator-ocd-compare-values"), // direct + indirect value comparison w/multiple operators support
  require("./TransitionOperator-ocd-is-truthy"), // convenience
  require("./TransitionOperator-ocd-is-boolean-flag-set"), // convenience
  require("./TransitionOperator-ocd-is-less-than-value"), // deprecated
  require("./TransitionOperator-ocd-is-greater-than-value"), // deprecated
  require("./TransitionOperator-ocd-is-identical-to-value"), // deprecated
  // OCD array transition operators
  require("./TransitionOperator-ocd-array-length-equal-to-value"), // OPM primitive transition operators.
  require("./TransitionOperator-opm-at-step")]
};