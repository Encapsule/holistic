"use strict";

// ObservableValueHelperMap/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var cmDescription = "Provides an extensible map (object used as a dictionary) of ObservableValueHelper cell activations, actions for adding/removing connections and reading value(s), and operations for monitoring the status of contained ObservableValueHelper cell activations.";

  var ovhCellModel = require("../ObservableValueHelper");

  var cellModel = new holarchy.CellModel({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel
    }).result.CMID,
    name: "".concat(cmLabel, " Model"),
    description: cmDescription,
    apm: {
      id: cmasHolarchyCMPackage.mapLabels({
        APM: cmLabel
      }).result.APMID,
      name: "".concat(cmLabel, " Process"),
      description: cmDescription,
      ocdDataSpec: {
        ____label: "".concat(cmLabel, " Cell Memory"),
        ____description: "Backing cell instance data for ".concat(cmLabel, " cell process."),
        ____types: "jsObject",
        ____defaultValue: {},
        ovhMap: {
          ____label: "ObservableValueHelper Map",
          ____description: "An extensible map (object used as a dictionary) of ObservableValueHelper cell activations.",
          ____types: "jsObject",
          ____asMap: true,
          ____defaultValue: {},
          signalName: {
            ____types: "jsObject",
            ____appdsl: {
              apm: ovhCellModel.getAPM().getID()
            }
          }
        }
      }
    },
    actions: [
      /* gist TODO
      require("./ControllerAction-ovh-map-add-signals"), // Activate a single signal OVH cell within ovhMap and configure it to link. Or, add a collection of the same.
      require("./ControllerAction-ovh-map-query-updated-signals"), // Obtain information about which signal OVH in ovhMap have been added/removed or have changed their signal state since last query.
      require("./ControllerAction-ovh-map-read-values"), // Read the the available values from all signal OVH in ovhMap. Return the result as an map of the values read from each signal OVH.
      require("./ControllerAction-ovh-map-remove-signals"), // Remove a single signal OVH cell within ovhMap. Or, remove a collection of the same. Supports, predicate filtering based on signal OVH state.
      require("./ControllerAction-ovh-map-reset"),
      */
    ],
    operators: [
      /* gist TODO
      require("./TransitionOperator-ovh-map-has-link-error"), // Boolean true iff any signal OVH cell in error state
      require("./TransitionOperator-ovh-map-is-linked"), // Boolean true iff all signal OVH cells are in link state
      require("./TransitionOperator-ovh-map-is-reset"), // Boolean true if all signal OVH cells are in reset state
      require("./TransitionOperator-ovh-map-has-updated"), // Boolean true if any available signal OVH is in updated state
      require("./TransitionOperator-ovh-map-is-active"), // Boolean true if all signal OVH are in active state
      require("./TransitionOperator-ovh-map-is-available") // Boolean true if all signal OVH are in available state
      */
    ],
    subcells: [ovhCellModel]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();