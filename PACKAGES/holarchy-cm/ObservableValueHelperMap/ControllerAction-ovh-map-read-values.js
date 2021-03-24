"use strict";

// ControllerAction-ovh-map-read-values.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var _require = require("./cell-metadata"),
      cmLabel = _require.cmLabel,
      cmDescription = _require.cmDescription;

  var actionLabel = "readValues";
  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: "".concat(cmLabel, "::").concat(actionLabel),
    description: "Read the value(s) of all or specific named ObservableValueHelper cell(s) contained in the ObservableValueHelperMap cell.",
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
              readValues: {
                ____types: "jsObject",
                // As w/ObservableValueHelper CellModel, we presume apmBindingPath is an OCD path
                // that was allocated by CellProcessManager (~) that is either an ObservableValueHelperMap
                // (path === "#"). Or, is a cell associated with some other APM that includes the
                // ObservableValueHelperMap of interest in its APM's ocdDataSpec via an ____appdsl.apm
                // annotation understood by the ObservableProcessController.
                path: {
                  ____types: "jsString",
                  ____defaultValue: "#"
                },
                names: {
                  ____types: ["jsString", // Read the current value of the named ObservableValueHelper cell and return the value via action response result.
                  "jsArray" // Read all (default) or specific named ObservableValueHelper cell(s) and return the value(s) as name:value pair map.
                  ],
                  ____defaultValue: [],
                  // Read the entire vector as a map.
                  element: {
                    ____accept: "jsString"
                  }
                }
              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      // This is a variant result output that follows these conventions:
      // It's always an object.
      // Iff readValue.names is a string (i.e. a single name was specified as string literal as opposed to a string member of an array) then the object is the current value read from the named ObservableValueHelper cell contained in the the ObservableValueHelperMap cell.
      // Iff readValue.names is an array of string(s), then the object is a map of name(s) to value(s).
      // In all cases the actual value data specification is determined solely by which member of the ObservableValue_T family of cells each ObservableValueHelper is linked to (i.e. the actual source of the value data).
      ____accept: "jsObject"
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