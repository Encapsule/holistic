"use strict";

// ControllerAction-cpm-shared-process-close.js
var arccore = require("@encapsule/arccore");

var ControllerAction = require("../../ControllerAction");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var action = new ControllerAction({
  id: "1Puwq4UEQZuJy6pOrkvZSg",
  name: "Cell Process Manager: Close Cell Process",
  description: "Instruct CellProcessor to unlink the indicated worker proxy subcell from the shared cell process instance.",
  actionRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        process: {
          ____types: "jsObject",
          close: {
            ____types: "jsObject",
            proxyPath: {
              ____accept: "jsString",
              ____defaultValue: "#"
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____accept: "jsUndefined"
  },
  bodyFunction: function bodyFunction(request_) {
    return {
      error: null
    };
  }
});

if (!action.isValid()) {
  throw new Error(action.toJSON());
}

module.exports = action;