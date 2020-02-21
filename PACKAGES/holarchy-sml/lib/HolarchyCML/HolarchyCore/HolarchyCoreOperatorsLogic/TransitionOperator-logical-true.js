"use strict"; // transition-operator-always-filter.js

var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.TransitionOperator({
  id: "e89cwnP4Qd6MocAhzdOJgw",
  name: "Always returns Boolean true unconditionally.",
  description: "Always returns true.",
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