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
      // ObservableValue Provider Cell Process Proxy
      // We wish to link to some type-specialized ObservableValue cell.
      // We presume that the target cell is not activated as a cell process.
      // But, that it is rather activated as a helper cell managed by some other
      // cell process. This may not be true because it's possible to activate an
      // a specialized ObservableValue via CellProcessor process activate action.
      // But, regardless we do not care much about that here in ObservableValueWorker.
      // Our job here is to ensure that whatever cell provides (i.e. manages the lifespan
      // and ultimately writes useful data of some value type) is activated in the
      // the cellplane. It's up to our ObservableValueHelper cell parent to take it
      // from there.
      ovcpProviderProxy: {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: "CPPU-UPgS8eWiMap3Ixovg"
        } // CPP

      }
    },
    steps: {
      "uninitialized": {
        description: "The ObservableValueWorker process is starting...",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "observable-value-worker-apply-configuration"
        }]
      },
      "observable-value-worker-apply-configuration": {
        description: "The ObservableValueWorker process is applying configuration data supplied at cell activation time...",
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
          nextStep: "observable-value-worker-ready"
        }]
      },
      "observable-value-worker-wait-configured": {
        description: "The ObservableValueWorker process is waiting for the applied configuration to be accepted.",
        transitions: [{
          transitionIf: {
            CellProcesor: {
              proxy: {
                proxyCoordinates: "#.ovcpProviderProxy",
                connect: {
                  statusIs: "connected"
                }
              }
            }
          },
          nextStep: "observable-value-worker-ready"
        }]
      },
      "observable-value-worker-ready": {
        description: "The ObservableValueWorker process has successfully connected its cell process proxy helper to the target ObservableValue's provider cell process."
      }
    }
  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();