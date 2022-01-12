"use strict";

// fixture-act-evaluate-p2-exit-actions.js
var holarchy = require("@encapsule/holarchy");

module.exports = [new holarchy.ControllerAction({
  id: "NpfrgiF1QTS6qp9vAMv4Dw",
  name: "Bad Controller Action #1",
  description: "A ControllerAction instance that is hard-wired to return a transport error (i.e. sets response.error).",
  actionRequestSpec: {
    ____types: "jsObject",
    badControllerActionResponseError: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: "This controller action is hard-wired to return an error."
    };
  }
}), new holarchy.ControllerAction({
  id: "V4-doRzDTVyYFtHMM8Z2jQ",
  name: "Bad Controller Action #2",
  description: "A ControllerAction instance that is hard-wired to throw an exception.",
  actionRequestSpec: {
    ____types: "jsObject",
    badControllerActionThrowError: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction(request_) {
    throw new Error("This is a forced exception thrown from a controller action body function.");
  }
})];