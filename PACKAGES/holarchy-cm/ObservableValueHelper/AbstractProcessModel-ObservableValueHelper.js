"use strict";

// AbstractProcessModel-value-observer.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cm-label-string");

  var apm = new holarchy.AbstractProcessModel({
    id: cmasHolarchyCMPackage.mapLabels({
      APM: cmLabel
    }).result.APMID,
    name: cmLabel,
    description: "Provides a generic means of linking to and subsequently reading from an active ObservableValue family member cell owned by another cell process.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      configuration: {
        ____types: "jsObject",
        ____defaultValue: {},
        observableValue: {
          ____label: "".concat(cmLabel, " ObservableValue Configuration"),
          ____types: ["jsNull", "jsObject"],
          ____defaultValue: null,
          // initial reset value
          // This derives from CPM activate action request.
          processCoordinates: {
            ____label: "".concat(cmLabel, " ObservableValue Cell Owner Process"),
            ____description: "The cell process coordinates of the cell that is or contains the ObservableValue family cell you wish to connect this ObservableValueWorker cell to.",
            ____types: ["jsString", // because it might be a cellProcessPath or cellProcessID
            "jsObject" // because it might be a raw coordinates apmID, instanceName descriptor
            ],
            apmID: {
              ____accept: "jsString"
            },
            instanceName: {
              ____accept: "jsString" // WE REQUIRE YOU TO PASS THROUGH AN INSTANCE NAME HERE. HOW YOU FIGURE OUT WHAT IT SHOULD BE IS ANOTHER MATTER (under consideration currently).

            }
          },
          // ~.ocdDataSpec.configuration.observableValue.processCoordinates
          path: {
            ____label: "".concat(cmLabel, " ObservableValue Cell Path"),
            ____description: "The the OCD path of the target ObservableValue cell relative to ~.configuration.observableValue.processCoordinates.",
            ____accept: "jsString",
            ____defaultValue: "#" // Almost never correct as ObservableValue CellModel family members are typically used as helper cells and rarely as cell processes.

          }
        } // ~.ocdDataSpec.configuration.valueObserver

      },
      // ~.ocdDataSpec.configuration
      _private: {
        ____types: "jsObject",
        ____defaultValue: {},
        valueObserverProcess: {
          ____accept: ["jsNull", "jsObject"],
          // TODO
          ____defaultValue: null
        }
      }
    },
    // ~.apm.ocdDataSpec
    steps: {
      "uninitialized": {
        description: "Default starting process step",
        transitions: [{
          transitionIf: {
            holarchy: {
              cm: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.configuration.observableValue"
                    }
                  }
                }
              }
            }
          },
          nextStep: "observable-value-helper-apply-configuration"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "observable-value-helper-wait-configuration"
        }]
      },
      "observable-value-helper-wait-configuration": {
        description: "The ObservableValueHelper cell is waiting for link configuration data to be written to this cell's memory via its configure action..."
      },
      "observable-value-helper-apply-configuration": {
        description: "The ValueObserver cell is waiting for configuration data...",
        actions: {
          exit: [{
            holarchy: {
              common: {
                actions: {
                  ObservableValueHelper: {
                    _private: {
                      stepWorker: {
                        action: "apply-configuration"
                      }
                    }
                  }
                }
              }
            }
          }]
        },
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "observable-value-helper-wait-linked"
        }]
      },
      "observable-value-helper-wait-linked": {
        description: "The ValueObserver cell is waiting for the configuration process to complete and the link to the configured ObservableValue cell has been activated and is ready for service..."
      }
    } // ~.apm.steps

  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();