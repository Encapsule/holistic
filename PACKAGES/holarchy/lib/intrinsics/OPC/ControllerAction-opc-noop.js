"use strict";

var ControllerAction = require("../../../ControllerAction");

module.exports = new ControllerAction({
  id: "KX0V_aQ3RzG01tzBS24MGw",
  name: "OPC Intrinsic NOOP Action",
  description: "OPC-intrinsic performs no operation (noop). When invoked via OPC.act, the effect is to perform no read/write operations on OPC-instanced shared memory. And, then perform an evaluation.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      opc: {
        ____types: "jsObject",
        noop: {
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
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  } // no operation and no error

});