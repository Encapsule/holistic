"use strict";

// ControllerAction-ovh-map-remove-values.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var _require = require("./cell-metadata"),
      cmLabel = _require.cmLabel,
      cmDescription = _require.cmDescription;

  var actionLabel = "removeValues";
  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: "".concat(cmLabel, "::").concat(actionLabel),
    description: "Remove all or specific nameed ObservableValueHelper cells from the ObservableValueHelperMap cell.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValueHelperMap: {
              ____types: "jsObject",
              removeSignals: {
                ____accept: "jsObject" // TODO

              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____types: "jsObject" // TODO

    },
    bodyFunction: function bodyFunction(request_) {
      return {
        error: null,
        result: {}
      };
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();