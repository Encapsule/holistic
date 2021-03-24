"use strict";

// ControllerAction-ovh-map-query-updated-values.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var _require = require("./cell-metadata"),
      cmLabel = _require.cmLabel,
      cmDescription = _require.cmDescription;

  var actionLabel = "queryUpdatedValues";
  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: "".concat(cmLabel, "::").concat(actionLabel),
    description: "Query which ObservableValueHelper cell(s) contained in the ObservableValueHelper cell have been updated since last read.",
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
              queryUpdatedValues: {
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