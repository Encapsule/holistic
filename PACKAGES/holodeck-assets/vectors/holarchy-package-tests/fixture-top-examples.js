"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = [new holarchy.TransitionOperator({
  id: "AODn0L3GQLK_21Msl1W8-g",
  name: "Bad Transition Operator #1",
  description: "A TransitionOperator instance that is hard-wired to return a transport error (i.e. sets response.error).",
  operatorRequestSpec: {
    ____types: "jsObject",
    badTransitionOperatorResponseError: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: "This transition operator is hardwired to return an error."
    };
  }
}), new holarchy.TransitionOperator({
  id: "ZdpLuggZRVaMI6aPW1mmUw",
  name: "Bad Transition Operator #2",
  description: "A TransitionOperator instance that is hard-wired to throw an exception.",
  operatorRequestSpec: {
    ____types: "jsObject",
    badTransitionOperatorThrowError: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction(request_) {
    throw new Error("This is a forced exception thrown from a transition operator's body function.");
  }
})];