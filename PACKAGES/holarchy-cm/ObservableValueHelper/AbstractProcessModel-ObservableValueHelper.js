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
          // TODO: Export this from @encapule/holarchy or make it easily available. This was copy/paste from CPM activate action request...
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
              ____accept: "jsString",
              ____defaultValue: "singleton"
            }
          },
          // ~.ocdDataSpec.configuration.observableValue.processCoordinates
          path: {
            ____label: "".concat(cmLabel, " ObservableValue Cell Path"),
            ____description: "The the OCD path of the target ObservableValue cell relative to owner process coordinates.",
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
          nextStep: "value-observer-configure"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "value-observer-wait-configuration"
        }]
      },
      "value-observer-wait-configuration": {
        description: "The ValueObserver cell is waiting for configuration data..."
      },
      "value-observer-configure": {
        description: "The ValueObserver cell is waiting for configuration data...",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "value-observer-wait-configured"
        }],
        actions: {
          exit: [{
            holarchy: {
              cm: {
                actions: {
                  ValueObserver: {
                    _private: {
                      stepWorker: {
                        action: "noop"
                      }
                    }
                  }
                }
              }
            }
          }]
        }
      },
      "value-observer-wait-configured": {
        description: "The ValueObserver cell is waiting for the configuration process to complete..."
      }
    } // ~.apm.steps

  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();