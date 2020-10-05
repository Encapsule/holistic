"use strict";

// transition-operator-always-filter.js
var TransitionOperator = require("../../../../TransitionOperator");

module.exports = new TransitionOperator({
  id: "e89cwnP4Qd6MocAhzdOJgw",
  name: "Logical TRUE",
  description: "Always returns Boolean true. Used typically to unilaterally transition a cell process from one step to another (e.g. always, or as a default after many other transition rules).",
  operatorRequestSpec: {
    ____types: "jsObject",
    always: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction() {
    return {
      error: null,
      result: true
    };
  }
});