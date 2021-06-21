"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ObservableValue_T/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmObservableValueBase = require("./ObservableValueBase");

  var cmObservableValueHelper = require("../ObservableValueHelper");

  var templateLabel = "ObservableValue";
  var cmtObservableValue = new holarchy.CellModelTemplate({
    templateLabel: templateLabel,
    cellModelGenerator: {
      specializationDataSpec: {
        ____label: "".concat(templateLabel, "<X> Specialization Request"),
        ____types: "jsObject",
        valueTypeDescription: {
          ____accept: "jsString"
        },
        valueTypeSpec: {
          ____label: "Value Data Specification",
          ____description: "An @encapsule/arccore.filter specification for the value type to be made observable.",
          ____accept: "jsObject" // This is an @encapsule/arccore.filter specification declaration.

        }
      },
      generatorFilterBodyFunction: function generatorFilterBodyFunction(request_) {
        var response = {
          error: null
        };
        var errors = [];
        var inBreakScope = false;

        while (!inBreakScope) {
          inBreakScope = true; // Synthesize the requested template specialization using our algorithm to produce a CellModel constructor request descriptor object.

          var cellMemorySpec = {
            ____types: "jsObject",
            ____defaultValue: {},
            mailbox: {
              ____types: ["jsUndefined", "jsObject"],
              // Because we want mailbox to be default constructable w/out any reliance whatsoever on valueTypeSpec.
              value: _objectSpread({}, request_.specializationData.valueTypeSpec)
            },
            revision: {
              ____types: "jsNumber",
              ____defaultValue: -1
            },
            dact: {
              ____accept: ["jsUndefined", "jsObject"]
            }
          };
          response.result = {
            id: request_.cmasScope.mapLabels({
              CM: request_.cellModelLabel
            }).result.CMID,
            name: "".concat(templateLabel, "<").concat(request_.cellModelLabel, ">"),
            description: "CellModelTemplate<".concat(templateLabel, "> specialization for CellModel label \"").concat(request_.cellModelLabel, "\"."),
            apm: {
              id: request_.cmasScope.mapLabels({
                APM: request_.cellModelLabel
              }).result.APMID,
              name: "".concat(templateLabel, "<").concat(request_.cellModelLabel, ">"),
              description: "CellModelTemplate<".concat(templateLabel, "> specialization for CellModel label \"").concat(request_.cellModelLabel, "\"."),
              ocdDataSpec: cellMemorySpec,
              steps: {
                "uninitialized": {
                  description: "Default starting process step.",
                  transitions: [{
                    // If the cell was activated with its memory initialized, skip to observable-value-ready process step.
                    transitionIf: {
                      holarchy: {
                        cm: {
                          operators: {
                            ocd: {
                              compare: {
                                values: {
                                  a: {
                                    path: "#.revision"
                                  },
                                  operator: ">",
                                  b: {
                                    value: -1
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    nextStep: "observable-value-ready"
                  }, {
                    transitionIf: {
                      always: true
                    },
                    nextStep: "observable-value-reset"
                  }]
                },
                "observable-value-reset": {
                  description: "ObservableValue has not yet been written and is in reset process step."
                },
                "observable-value-ready": {
                  description: "ObservableValue has been written and can be read and/or observed for subsequent update(s) by a value producing cell process."
                }
              } // ~.apm.steps

            },
            // ~.apm
            subcells: [cmObservableValueBase, // Generic behaviors of ObservableValue_T
            cmObservableValueHelper // Generic helper for reading a value from any ObservableValue family member (an active cell whose definition was synthesized here).
            ]
          }; // result (CellModel declaration)

          break;
        }

        if (errors.length) {
          response.error = errors.join(" ");
        }

        return response;
      } // ~.cellModelGenerator.generatorFilterBodyFunction

    } // ~.cellModelGenerator

  });

  if (!cmtObservableValue.isValid()) {
    console.error("".concat(__dirname, " ").concat(__filename));
    throw new Error(cmtObservableValue.toJSON());
  }

  module.exports = cmtObservableValue;
})();