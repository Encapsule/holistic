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
      ____label: "".concat(cmLabel, " Cell Memory"),
      ____types: "jsObject",
      ____defaultValue: {},
      configuration: {
        ____label: "".concat(cmLabel, " Config Data"),
        ____description: "Configuration data must be provided by ObservableValueHelper cell instance when it activates an ObservableValueWorker cell process instance.",
        ____types: "jsObject",
        observableValueHelper: {
          ____label: "ObservableValueHelper Instance",
          ____description: "Data used to track which ObservableValueHelper cell instance this cell is working on behalf of.",
          ____types: "jsObject",
          apmBindingPath: {
            ____label: "ObservableValueHelper Cell Binding Path",
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
        ____label: "ObservableValue Provider Cell Process Provider Proxy",
        ____description: "An embedded @encapsule/holarchy CellProcessProxy process that leverages CellProcessManager's shared cell process facilities.",
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: "CPPU-UPgS8eWiMap3Ixovg"
        } // @encapsule/holarchy CellProcessProxy TODO: put this in a CMAS! No more magic IRUTs (except at runtime).

      },
      // If we fail to connect the ocvpProviderProxy this is likely because we got handed bogus provider cell process coordinates.
      // Rather than report a transport error in the context of applying the configuration, we instead write any failure that occurs
      // to ovcpProviderProxyError namespace.
      ovcpProviderProxyError: {
        ____label: "ObservableValue Provider Cell Process Prover Proxy Error",
        ____description: "Set during cell process config iff the ovcpProviderProxy cannot be connected to the specified provider cell process.",
        ____accept: ["jsNull", "jsString"],
        ____defaultValue: null
      },
      // If the proxy is connected (i.e. ovcpProviderProxy is connected and ovcpProviderProxyError === null)
      // then our step worker action will continue on to initialize ovCell that is used to determine the existence,
      // status, and ultimately the value of the target value-type-specialized ObservableValue cell.
      // So, initialization of ovCell does not in and of itself infer these things; it's just the info
      // that is later required to answer these questions (via actions and operators).
      ovCell: {
        ____label: "ObservableValue Cell Coordinates",
        ____description: "Where the actual type-specialized ObservableValue cell that we want to link to is located in the cellplane.",
        ____types: ["jsNull", "jsObject"],
        ____defaultValue: null,
        path: {
          ____label: "ObservableValue Cell Path",
          ____description: "A relative OCD path (starts w/#) that indicates the cellplane coordinate of the ObservableValue cell relative to the provider cell process coordinates.",
          ____accept: "jsString"
        },
        apmBindingPath: {
          ____label: "ObservableValue Cell Binding Path",
          ____description: "The full OCD path (starts w/~) that indicates the absolute cellplane coordinates of the ObservableValue cell.",
          ____accept: "jsString"
        },
        lastReadRevision: {
          ____label: "ObservableValue Cell Revision Reference",
          ____description: "When asked the question valueHasUpdated our answer is always based on a comparison of our reference revision number, and the ObservableValue cell's actual current revision number. If they're equal, then the answer is false (generally).",
          ____accept: "jsNumber",
          ____defaultValue: -2 // Indicates we do not know if ovCell exists or not (because we haven't checked). Or we have, and it doesn't.

        }
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
          nextStep: "observable-value-worker-wait-proxy-connected"
        }]
      },
      "observable-value-worker-wait-proxy-connected": {
        description: "The ObservableValueWorker process is waiting for the applied configuration to be accepted.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.ovcpProviderProxy",
                connect: {
                  statusIs: "connected"
                }
              }
            }
          },
          nextStep: "observable-value-worker-proxy-connected"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "observable-value-worker-proxy-disconnected"
        } // We know this because we know we asked to connect and it is not connected.
        ]
      },
      "observable-value-worker-proxy-connected": {
        description: "The ObservableValueWorker process has successfully connected its cell process proxy helper cell to the target ObservableValue's provider cell process."
      },
      "observable-value-worker-proxy-disconnected": {
        description: "The ObservableValueWorker process could not connect its cell process proxy to the cell process that is supposed to be providing the target ObservableValue cell."
      }
    }
  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();