"use strict";

// ControllerAction-value-observer-step-worker.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

(function () {
  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: arccore.identifier.irut.fromReference("@encapsule/holarchy-cm.ValueObserver.ControllerAction.stepWorker").result,
    name: "ValueObserver Step Worker",
    description: "ValueObserver Step Worker action.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        cm: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ValueObserver: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                stepWorker: {
                  ____types: "jsObject",
                  action: {
                    ____accept: "jsString",
                    ____inValueSet: ["noop"]
                  }
                }
              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____accept: "jsString",
      ____defaultValue: "okay"
    },
    bodyFunction: function bodyFunction(actionRequest_) {
      return {
        error: null
      };
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();