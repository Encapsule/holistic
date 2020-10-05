"use strict";

var ControllerAction = require("../../../ControllerAction");

module.exports = new ControllerAction({
  id: "S1GqYjTtSQazSxkIL9vtpA",
  name: "OPC Intrinsic Status Action",
  description: "OPC-intrinsic performs a retrieval of transitive OPC instance status.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      opc: {
        ____types: "jsObject",
        status: {
          ____accept: "jsBoolean",
          ____inValueSet: [true]
        }
      }
    }
  },
  actionResultSpec: {
    ____opaque: true
  },
  // always returns response.result === undefined
  // TODO: Implement this.
  // The real reason why I've added this is that I need a minimum of two intrinsic actions.
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  } // no operation and no error

});