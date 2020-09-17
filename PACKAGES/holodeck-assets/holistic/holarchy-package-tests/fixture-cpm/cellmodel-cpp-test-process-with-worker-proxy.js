"use strict";

// cellmodel-cpp-test-process-with-worker-proxy.js
var holarchy = require("@encapsule/holarchy");

var connectProxyActionRequest = {
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
};
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
        actions: {
          enter: [connectProxyActionRequest]
        },
        transitions: [{
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
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            holarchy: {
              CellProcessProxy: {
                isConnected: {
                  proxyPath: "#.proxyTest"
                }
              }
            }
          },
          nextStep: "proxy_connected"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "test_status_operators_unexpected_response"
        }]
      },
      proxy_connected: {
        description: "The cell process proxy helper is now connected to a local cell process instance.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "disconnect_proxy"
        }],
        actions: {
          exit: [{
            holarchy: {
              CellProcessProxy: {
                proxy: {
                  proxyPath: "#.proxyTest",
                  actionRequest: {
                    CPPTestProcess1: {
                      helloWorld: "Hello, other cell process that I have established a proxy connection to! How are are you doing?"
                    }
                  }
                }
              }
            }
          }]
        }
      },
      disconnect_proxy: {
        description: "The proxy is connected. Now disconnect the proxy.",
        actions: {
          enter: [{
            holarchy: {
              CellProcessProxy: {
                disconnect: {
                  proxyPath: "#.proxyTest"
                }
              }
            }
          }]
        },
        transitions: [{
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
                isDisconnected: {
                  proxyPath: "#.proxyTest"
                }
              }
            }
          },
          nextStep: "proxy_disconnected"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "test_process_complete"
        }]
      },
      proxy_disconnected: {
        description: "The proxy has been disconnected.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "reconnect_proxy"
        }]
      },
      reconnect_proxy: {
        description: "The proxy has been disconnected. Now let's reconnect it.",
        actions: {
          enter: [connectProxyActionRequest]
        },
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "test_process_complete"
        }]
      },
      test_process_complete: {
        description: "The last step in the test process.",
        transitions: [{
          transitionIf: {
            holarchy: {
              CellProcessProxy: {
                proxy: {
                  proxyPath: "#.proxyTest",
                  operatorRequest: {
                    holarchy: {
                      cm: {
                        operators: {
                          cell: {
                            atStep: {
                              path: "#",
                              step: "test_process_complete"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          nextStep: "whatever"
        }]
      },
      whatever: {
        description: "Whatever"
      }
    } // APM process model steps

  },
  // APM
  actions: [{
    id: "0MRiyw8rSnmdcN7uL2WWrQ",
    name: "CPPTestProcess1: Test Action",
    description: "Whatever.",
    actionRequestSpec: {
      ____types: "jsObject",
      CPPTestProcess1: {
        ____types: "jsObject",
        helloWorld: {
          ____accept: "jsString"
        }
      }
    },
    actionResultSpec: {
      ____accept: "jsObject"
    },
    bodyFunction: function bodyFunction(request_) {
      return {
        error: null,
        result: {
          backAtYou: "Hello. Message was received.",
          yourMessage: request_.actionRequest.CPPTestProcess1.helloWorld
        }
      };
    }
  }],
  operators: []
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;