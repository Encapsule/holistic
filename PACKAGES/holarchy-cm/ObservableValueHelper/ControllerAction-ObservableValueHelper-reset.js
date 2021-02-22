"use strict";

// ControllerAction-ObservableValueHelper-reset.js
// This action resets the target ObservableValueHelper back to its uninitialized state.
// This action may be called on an ObservableValueHelper cell while it is in any process step.
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueHelper = require("./cmasObservableValueHelper");

  var cmLabel = require("./cell-label");

  var actionName = "".concat(cmLabel, " Reset Helper");

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasObservableValueHelper.mapLabels({
      ACT: "reset"
    }).result.ACTID,
    name: actionName,
    description: "Resets the ObservableValueHelper cell back to its uninitialized process step.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValueHelper: {
              ____types: "jsObject",
              reset: {
                ____types: "jsObject"
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
      }; // TODO
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();