"use strict";

// AbstractProcessModel-value-observer.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var apm = new holarchy.AbstractProcessModel({
    id: cmasHolarchyCMPackage.mapLabels({
      APM: cmLabel
    }).result.APMID,
    name: cmLabel,
    description: "Provides a generic means of linking to and subsequently reading from an active ObservableValue family member cell owned by another cell process.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      // Data provided when the cell is activated. Or, via a config action request after it is activated.
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
        } // ~.ocdDataSpec.configuration.observableValue

      },
      // ~.ocdDataSpec.configuration
      // Value written by our step worker action when the configuration is applied.
      observableValueWorkerProcess: {
        ____types: ["jsNull", "jsObject"],
        ____defaultValue: null,
        apmBindingPath: {
          ____accept: "jsString"
        }
      }
    },
    // ~.apm.ocdDataSpec
    steps: {
      "uninitialized": {
        description: "Default starting process step",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "observable-value-helper-reset"
        }]
      },
      "observable-value-helper-reset": {
        description: "The ObservableValueHelper cell is in its reset process step waiting for configuration data to be written to this cell's memory via its configure action...",
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
        }]
      },
      "observable-value-helper-apply-configuration": {
        description: "The ObservableValueHelper cell is applying the supplied configuration data...",
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
          nextStep: "observable-value-helper-wait-worker-proxy-connected"
        }]
      },
      "observable-value-helper-wait-worker-proxy-connected": {
        description: "The ObservableValueHelper cell is waiting for its ObservableValueWorker cell process to complete its configuration and become ready.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  childProcessesAllInStep: {
                    apmStep: "observable-value-worker-proxy-connected"
                  }
                }
              }
            }
          },
          nextStep: "observable-value-helper-linked"
        }, {
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  childProcessesAllInStep: {
                    apmStep: "observable-value-worker-proxy-disconnected"
                  }
                }
              }
            }
          },
          nextStep: "observable-value-helper-link-error"
        }]
      },
      "observable-value-helper-linked": {
        description: "The ObervableValueHelper has applied its configuration and no error has occurred. This indicates that the proxy link to the provider cell process is has been established."
      },
      "observable-value-helper-link-error": {
        description: "The ObservableValueHelper has applied its configuration but an error occurred. This indicates that the proxy link to the provider cell process could not be established."
      }
    } // ~.apm.steps

  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();