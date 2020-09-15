"use strict";

// cellmodel-cpp-test-process-with-worker-proxy.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "w6WWHevPQOKeGOe6QSL5Iw",
  name: "CPP Test Process With Worker Proxy Model",
  description: "A model that tests embedding of reusable generic local cell process proxy model in embedded worker role.",
  apm: {
    id: "J9RsPcp3RoS1QrZG-04XPg",
    name: "CPP Test Process With Worker Proxy Process",
    description: "A model that tests embedding of reusable generic local cell process proxy model in embedded worker role.",
    ocdDataSpec: {
      ____types: "jsObject",
      construction: {
        ____types: "jsObject",
        ____defaultValue: {},
        instanceName: {
          ____accept: ["jsNull", "jsString"],
          ____defaultValue: null
        }
      },
      proxyTest: {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: "CPPU-UPgS8eWiMap3Ixovg"
          /* cell process proxy (CPP) */

        }
      }
    },
    steps: {
      uninitialized: {
        description: "Default cell process step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "test_status_operators"
        }]
      },
      test_status_operators: {
        description: "Test the CPP status operators.",
        transitions: [{
          transitionIf: {
            holarchy: {
              CellProcessProxy: {
                isConnected: {
                  proxyPath: "#.proxyTest"
                }
              }
            }
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            holarchy: {
              CellProcessProxy: {
                isBroken: {
                  proxyPath: "#.proxyTest"
                }
              }
            }
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            holarchy: {
              CellProcessProxy: {
                isDisconnected: {
                  proxyPath: "#.proxyTest"
                }
              }
            }
          },
          nextStep: "connect_proxy"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "test_status_operators_unexpected_response"
        }]
      },
      test_status_operators_unexpected_response: {
        description: "If we reach this step then one of the status transition operators didn't work as we expected it to."
      },
      connect_proxy: {
        description: "Attempt to connect the proxy to something completely random.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "test_process_complete"
        }],
        actions: {
          enter: [{
            holarchy: {
              CellProcessProxy: {
                connect: {
                  proxyPath: "#.proxyTest",
                  localCellProcess: {
                    // apmID: "i6htE08TRzaWc9Hq00B3sg", // this is a total lie - nonesuch
                    apmID: "J9RsPcp3RoS1QrZG-04XPg",
                    // proxy back to the host process (should be okay although i am not sure why)
                    // instanceName -> default to singleton
                    instanceName: "Secondary Shared Test Process"
                  }
                }
              }
            }
          }]
        }
      },
      test_process_complete: {
        description: "The last step in the test process."
      }
    }
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;