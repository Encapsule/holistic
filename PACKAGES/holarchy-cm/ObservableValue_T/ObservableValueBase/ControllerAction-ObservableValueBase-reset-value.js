"use strict";

// ObservableValue_T/ObservableValueBase/ControllerAction-ObservableValueBase-reset.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cellModelLabel = require("./cell-label");

  var actionName = "".concat(cellModelLabel, ".action.resetValue");
  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      ACT: actionName
    }).result.ACTID,
    name: actionName,
    description: "Resets any active ObervableValue cell deleting its value and reseting its revision back to -1 (reset).",
    actionRequestSpec: {
      ____label: "ObservableValue Read Action Request",
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          ObservableValue: {
            ____types: "jsObject",
            resetValue: {
              ____types: "jsObject"
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____label: "ObservableValue Read Action Result",
      ____types: "jsObject",
      value: {
        ____opaque: true
      },
      revision: {
        ____accept: "jsNumber"
      }
    },
    bodyFunction: function bodyFunction(actionRequest_) {
      return {
        error: null,
        result: {
          value: "whatever",
          revision: 0
        }
      }; // TODO
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();