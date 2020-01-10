"use strict";

// OPC core transition operators:
module.exports = {
  logical: [require("./TransitionOperator-logical-and"), require("./TransitionOperator-logical-not"), require("./TransitionOperator-logical-or"), require("./TransitionOperator-logical-true"), require("./TransitionOperator-opm-at-step"), require("./TransitionOperator-ocd-is-truthy"), require("./TransitionOperator-ocd-is-boolean-flag-set")]
};