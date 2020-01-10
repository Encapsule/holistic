"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = [new holarchy.ControllerAction({
  id: "BO184bcvSzmr9oF4KJynSA",
  name: "Bogus Controller Test Action #1",
  description: "Do nothing nothing test controller action plug-in filter #2.",
  actionRequestSpec: {
    ____types: "jsObject",
    noop2: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  }
}), new holarchy.ControllerAction({
  id: "93_stDeORb-9W_0d69fswg",
  name: "NOOP Controller Test Action #2",
  description: "Do nothing test controller action plug-in filter #2.",
  actionRequestSpec: {
    ____types: "jsObject",
    noop1: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  }
}), new holarchy.ControllerAction({
  id: "BO184bcvSzmr9oF4KJynSA",
  name: "NOOP Controller Test Action #3",
  description: "Do nothing nothing test controller action plug-in filter #3.",
  actionRequestSpec: {
    ____types: "jsObject",
    noop2: {
      ____accept: "jsBoolean",
      ____inValueSet: [true]
    }
  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  }
})];