"use strict";

// AbstractProcessModel-ObservableValueWorker.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var apm = new holarchy.AbstractProcessModel({
    id: cmasHolarchyCMPackage.mapLabels({
      APM: cmLabel
    }).result.APMID,
    name: "".concat(cmLabel, " Process"),
    description: "Performs work on behalf of a single ObservableValueHelper cell.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      configuration: {
        ____types: "jsObject",
        observableValueHelper: {
          ____label: "ObservableValueHelper Instance",
          ____description: "Data used to track which ObservableValueHelper cell instance this cell is working on behalf of.",
          ____types: "jsObject",
          apmBindingPath: {
            ____label: "ObservableValueHelper Cell Path",
            ____accept: "jsString"
          }
        }
      },
      // This is a proxy helper cell that is connected to a specific ObservableValue cell instance.
      // Current thinking is that ObservableValueHelper's step worker action can control this proxy directly w/out the need for custom logic in the worker.
      observableValueProxy: {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: "CPPU-UPgS8eWiMap3Ixovg"
        } // CPP

      }
    },
    steps: {
      "uninitialized": {
        description: "Default starting step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "observable-value-worker-apply-configuration"
        }]
      },
      "observable-value-worker-apply-configuration": {
        description: "The ValueObserverWorker process is applying configuration data supplied at cell activation time...",
        actions: {
          exit: [{
            holarchy: {
              common: {
                actions: {
                  ObservableValueWorker: {
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
          nextStep: "observable-value-worker-wait-linked"
        }]
      },
      "observable-value-worker-wait-linked": {
        description: "TODO"
      }
    }
  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();