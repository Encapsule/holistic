"use strict";

// TransitionOperator-ovh-map-is-available.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var _require = require("./cell-metadata"),
      cmLabel = _require.cmLabel,
      cmDescription = _require.cmDescription;

  var operatorLabel = "mapIsAvailable";
  var operatorName = "".concat(cmLabel, "::").concat(operatorLabel);
  var operator = new holarchy.TransitionOperator({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      TOP: operatorLabel
    }).result.TOPID,
    name: operatorName,
    description: "Returns Boolean true if the ObservableValueHelperMap cell contains N > 0 ObservableValueHelper cell(s) (aka signals) AND ObservableValueHelper::valueIsAvailable === true for ALL N signals.",
    operatorRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          operators: {
            ____types: "jsObject",
            ObservableValueHelperMap: {
              ____types: "jsObject",
              mapIsAvailable: {
                ____types: "jsObject",
                path: {
                  ____accept: "jsString",
                  ____defaultValue: "#"
                }
              }
            }
          }
        }
      }
    },
    bodyFunction: function bodyFunction(request_) {
      return {
        error: null,
        result: false
      }; // TODO
    }
  });

  if (!operator.isValid()) {
    throw new Error(operator.toJSON());
  }

  module.exports = operator;
})();