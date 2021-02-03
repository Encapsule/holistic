"use strict";

// AbstractProcessModel-value-observer.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

(function () {
  var apmID = arccore.identifier.irut.fromReference("@encapsule/holarchy-cm.ValueObserver.AbstractProcessModel").result;
  var apm = new holarchy.AbstractProcessModel({
    id: apmID,
    name: "ValueObserver Process",
    description: "A strongly-typed runtime intra-cell communication signal input.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      configuration: {
        ____types: "jsObject",
        ____defaultValue: {},
        observableValue: {
          ____types: ["jsNull", "jsObject"],
          ____defaultValue: null,
          // initial reset value
          // TODO: Export this from @encapule/holarchy or make it easily available. This was copy/paste from CPM activate action request...
          processCoordinates: {
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
          } // ~.ocdDataSpec.configuration.valueObserver.processCoordinates
          // ? Do I also need a relative #.X.Y dataPath here?

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