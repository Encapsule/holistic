"use strict";

// ObservableValue_T/ObservableValueBase/ControllerAction-ObservableValueBase-write-value.js
var holarchy = require("@encapsule/holarchy");

var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

var cellModelLabel = require("./cell-label");

var actionName = "".concat(cellModelLabel, ".action.writeValue");
var action = new holarchy.ControllerAction({
  id: cmasHolarchyCMPackage.mapLabels({
    ACT: actionName
  }).result.ACTID,
  name: actionName,
  description: "Writes a new value to any active cell of the family ObservableValue_T replacing the cell's current value and incrementing its revision count.",
  actionRequestSpec: {
    ____label: "ObservableValue Write Value Action Request",
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      common: {
        ____types: "jsObject",
        ObservableValue: {
          ____types: "jsObject",
          writeValue: {
            // <- non-optional spec down to this point for arccore.discriminator
            ____types: "jsObject",
            value: {
              ____label: "New Value",
              ____description: "The new value to be written to the ObservableValue_T cell's #.value namespace.",
              ____opaque: true // <- We allow you to pass _anything_ through here. However... #.value is type-specialized in the OCD. So, if you pass a bad value through here then the action will fail as OCD will reject the write.

            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____label: "ObservableValue Write Value Action Result",
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