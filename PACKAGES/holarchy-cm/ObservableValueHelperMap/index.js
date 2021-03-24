"use strict";

// ObservableValueHelperMap/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var _require = require("./cell-metadata"),
      cmLabel = _require.cmLabel,
      cmDescription = _require.cmDescription;

  var cellModel = new holarchy.CellModel({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel
    }).result.CMID,
    name: "".concat(cmLabel, " Model"),
    description: cmDescription,
    apm: require("./AbstractProcessModel-ovh-map"),
    actions: [require("./ControllerAction-ovh-map-add-values"), // Activate a single signal OVH cell within ovhMap and configure it to link. Or, add a collection of the same.
    require("./ControllerAction-ovh-map-query-updated-values"), // Obtain information about which signal OVH in ovhMap have been added/removed or have changed their signal state since last query.
    require("./ControllerAction-ovh-map-read-values"), // Read the the available values from all signal OVH in ovhMap. Return the result as an map of the values read from each signal OVH.
    require("./ControllerAction-ovh-map-remove-values") // Remove a single signal OVH cell within ovhMap. Or, remove a collection of the same. Supports, predicate filtering based on signal OVH state.
    ],
    operators: [require("./TransitionOperator-ovh-map-has-link-error"), // Boolean true iff ANY signal OVH cell in error state
    require("./TransitionOperator-ovh-map-has-updated"), // Boolean true if ANY available signal OVH is in updated state
    require("./TransitionOperator-ovh-map-is-active"), // Boolean true if ALL signal OVH are in active state
    require("./TransitionOperator-ovh-map-is-available"), // Boolean true if ALL signal OVH are in available state
    require("./TransitionOperator-ovh-map-is-empty"), // Boolean true if the ovhMap object has zero keys
    require("./TransitionOperator-ovh-map-is-linked"), // Boolean true iff ALL signal OVH cells are in link state
    require("./TransitionOperator-ovh-map-is-reset") // Boolean true if ALL signal OVH cells are in reset state
    ],
    subcells: [require("../ObservableValueHelper")]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();