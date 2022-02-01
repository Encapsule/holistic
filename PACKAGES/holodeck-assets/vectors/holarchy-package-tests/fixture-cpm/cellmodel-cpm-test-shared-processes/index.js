"use strict";

// cellmodel-cpp-test-process-with-worker-proxy.js
var holarchy = require("@encapsule/holarchy");

var cellspace = require("../cellspace");

var cmCPPTestMessenger = require("./cellmodel-messenger");

var connectProxyActionRequest = {
  CellProcessor: {
    proxy: {
      proxyCoordinates: "#.proxyTest",
      connect: {
        processCoordinates: {
          apmID: cellspace.apmID("CPP Test 1"),
          instanceName: "Test Process B"
        }
      }
    }
  }
}; // actionRequest (delegate action)

var cppTestModel1 = new holarchy.CellModel({
  id: cellspace.cmID("CPP Test 1"),
  name: "CPP Test 1",
  description: "A model that tests embedding of reusable generic local cell process proxy model in embedded worker role.",
  apm: {
    id: cellspace.apmID("CPP Test 1"),
    name: "CPP Test 1",
    description: "A process that tests embedding of reusable generic local cell process proxy model in embedded worker role.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      construction: {
        ____types: "jsObject",
        ____defaultValue: {},
        instanceName: {
          ____accept: ["jsUndefined", "jsString"]
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
            CellProcessor: {
              cell: {
                cellCoordinates: "#.proxyTest",
                delegate: {
                  operatorRequest: {
                    CellProcessor: {
                      proxy: {
                        connect: {
                          statusIs: "connected"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.proxyTest",
                connect: {
                  statusIs: "broken"
                }
              }
            }
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            CellProcessor: {
              cell: {
                cellCoordinates: "#.proxyTest",
                delegate: {
                  operatorRequest: {
                    CellProcessor: {
                      proxy: {
                        connect: {
                          statusIs: "disconnected"
                        }
                      }
                    }
                  }
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
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.proxyTest",
                connect: {
                  statusIs: "broken"
                }
              }
            }
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.proxyTest",
                connect: {
                  statusIs: "disconnected"
                }
              }
            }
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.proxyTest",
                connect: {
                  statusIs: "connected"
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
          nextStep: "test_action_through_proxy"
        }]
      },
      test_action_through_proxy: {
        description: "Attempt to call a ControllerAction through the proxy.",
        actions: {
          exit: [{
            CellProcessor: {
              cell: {
                cellCoordinates: "#.proxyTest",
                delegate: {
                  actionRequest: {
                    holarchy: {
                      CellProcessProxy: {
                        proxy: {
                          /* THIS ACTION WILL BE REMOVED IN v0.0.48 */
                          actionRequest: {
                            CPPTestProcess1: {
                              helloWorld: "Hello, other cell process that I have established a proxy connection to! How are are you doing?"
                            }
                          }
                        }
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
          nextStep: "disconnect_proxy"
        }]
      },
      disconnect_proxy: {
        description: "The proxy is connected. Now disconnect the proxy.",
        actions: {
          enter: [// Verbose form proxy disconnect.

          /*
          {
              CellProcessor: {
                  delegate: {
                      coordinates: "#.proxyTest",
                      actionRequest: {
                          CellProcessor: {
                              proxy: {
                                  disconnect: {}
                              }
                          }
                      }
                  }
              }
          }
          */
          {
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.proxyTest",
                disconnect: {}
              }
            }
          }]
        },
        transitions: [{
          transitionIf: {
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.proxyTest",
                connect: {
                  statusIs: "broken"
                }
              }
            }
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.proxyTest",
                connect: {
                  statusIs: "connected"
                }
              }
            }
          },
          nextStep: "test_status_operators_unexpected_response"
        }, {
          transitionIf: {
            CellProcessor: {
              proxy: {
                proxyCoordinates: "#.proxyTest",
                connect: {
                  statusIs: "disconnected"
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
          nextStep: "test_operator_through_proxy"
        }]
      },
      test_operator_through_proxy: {
        description: "The last step in the test process.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                cellCoordinates: "#.proxyTest",
                delegate: {
                  operatorRequest: {
                    // WE EXPECT THIS TO BE DEPRECATED IN v0.0.48 WHEN WE BRING OCD-LEVEL PROXY VIRTUALIZATION ONLINE
                    holarchy: {
                      CellProcessProxy: {
                        proxy: {
                          operatorRequest: {
                            /*Note this signature update*/
                            CellProcessor: {
                              cell: {
                                cellCoordinates: "#",
                                query: {
                                  inStep: {
                                    apmStep: "test_process_complete"
                                    /*could now also be array of step value strings*/

                                  }
                                }
                              }
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
          nextStep: "test_complete"
        }]
      },
      test_complete: {
        description: "Expected test sequence completed."
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
var cppTestModel2 = new holarchy.CellModel({
  id: cellspace.cmID("CPP Test 2"),
  name: "CPP Test Model 2",
  description: "A model that embeds a proxy. We use this model to ensure that a cell cannot tell if its role is helper (i.e. embedded in another model's ocdDataSpec via an object namesspace APM binding annotaton).",
  apm: {
    id: cellspace.apmID("CPP Test 2"),
    name: "CPP Test Model 2",
    description: "A process that tests a cell's ability to use a cell proxy equivalent regardless of it itself is a helper cell (owned by a cell process). Or, a cell process (either owned or shared).",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      construction: {
        ____types: "jsObject",
        ____defaultValue: {},
        instanceName: {
          ____types: ["jsNull", "jsString"],
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
        description: "Default process starting step.",
        actions: {
          exit: [{
            // Test verbose form of proxy connect that uses delegate
            CellProcessor: {
              cell: {
                cellCoordinates: "#.proxyTest",
                delegate: {
                  actionRequest: {
                    CellProcessor: {
                      proxy: {
                        connect: {
                          processCoordinates: {
                            apmID: cellspace.apmID("CPP Test Messenger")
                          }
                        }
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
          nextStep: "finished"
        }]
      },
      finished: {
        description: "The process has reached its terminal step."
      }
    }
  },
  subcells: [cmCPPTestMessenger]
});
var cppTestModel2A = new holarchy.CellModel({
  id: cellspace.cmID("CPP Test 2A"),
  name: "CPP Test 2A",
  description: "A model that attempts to create a child process. We use this model to ensure that a cell cannot tell if its role is helper. Or, is active as a cell process (either owned or shared).",
  apm: {
    id: cellspace.apmID("CPP Test 2A"),
    name: "CPP Test 2A",
    description: "A process that attempts to create a child process. We use this model to ensure that a cell cannot tell if its role is helper. Or, is active as a cell process (either owned or shared).",
    steps: {
      uninitialized: {
        description: "Default starting step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "finished"
        }],
        actions: {
          exit: [{
            CellProcessor: {
              process: {
                activate: {
                  /* default processData*/
                },
                processCoordinates: {
                  apmID: cellspace.apmID("CPP Test Messenger")
                }
              }
            }
          }]
        }
      },
      finished: {
        description: "Terminal step of CPP Test 2A process."
      }
    }
  },
  subcells: [cmCPPTestMessenger]
});
var cppTestModel2B = new holarchy.CellModel({
  id: cellspace.cmID("CPP Test 2B"),
  name: "CPP Test Model 2B",
  description: "A model that embeds helpers at various depths of its process memory space to test CPM's ability to track cell ownership correctly.",
  apm: {
    id: cellspace.apmID("CPP Test 2B"),
    name: "CPP Test Process 2B",
    description: "A process that embeds owned helper processes at various depths of its process memory space to test CPM's ability to track cell ownership correctly.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      construction: {
        ____types: "jsObject",
        ____defaultValue: {},
        instanceName: {
          ____accept: ["jsString", "jsNull"],
          ____defaultValue: null
        }
      },
      justADataObjectNamespace: {
        ____types: "jsObject",
        ____defaultValue: {},
        helperCellThatCallsProcessCreate: {
          ____types: "jsObject",
          ____defaultValue: {},
          ____appdsl: {
            apm: cellspace.apmID("CPP Test 2")
          }
        }
      }
    }
  }
});
var cppTestModel2C = new holarchy.CellModel({
  id: cellspace.cmID("CPP Test 2C"),
  name: "CPP Test Model 2C",
  description: "A model that embeds our other experiments to test yet more combinations of various cell and helper cell interconnect topologies.",
  apm: {
    id: cellspace.apmID("CPP Test 2C"),
    name: "CPP Test Process 2C",
    description: "A process that embeds our other experiments to test yet more combinations of various cell and helper cell interconnect topologies.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},

      /*
      testProcess2: {
          ____types: "jsObject",
          ____defaultValue: {},
          ____appdsl: { apm: "houKkWpYTX6hly7r79gD6g" }
      },
      testProcess2A: {
          ____types: "jsObject",
          ____defaultValue: {},
          ____appdsl: { apm: "RxRtYI77Sd6FMa1Iyv9dSg" }
      },
      */
      testProcess2B: {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: cellspace.apmID("CPP Test 2B")
        }
      }
    }
  },
  subcells: [cppTestModel2, cppTestModel2A, cppTestModel2B]
});
var cppTestModel3 = new holarchy.CellModel({
  id: cellspace.cmID("CPP Test 3"),
  name: "CPP Test Model 3",
  description: "Embeds CPP Test Model 2 as a helper cell to test if the CPM memory manager can correctly handle the helper cell's requests when it's functioning as a helper.",
  apm: {
    id: cellspace.apmID("CPP Test 3"),
    name: "CPP Test Process 3",
    description: "Declares that this cell uses and owns a copy of CPP Test Model 2 whose lifespan is tied to this cell's lifespan (whatever role it's functioning in).",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},

      /*
      // Here we splice in a "helper" insance of CPP Test Model 2 that contains a proxy that it tries to connect when its process starts.
      helper1A: {
          ____types: "jsObject",
          ____defaultValue: {},
          ____appdsl: { apm: "houKkWpYTX6hly7r79gD6g" } // cpp test 2 process
      },
      helper1B: {
          ____types: "jsObject",
          ____defaultValue: {},
          helper2A: {
              ____types: "jsObject",
              ____defaultValue: {},
              ____appdsl: { apm: "houKkWpYTX6hly7r79gD6g" } // cpp test 2 process
          },
          helper2B: {
              ____types: "jsObject",
              ____defaultValue: {},
              helper3A: {
                  ____types: "jsObject",
                  ____defaultValue: {},
                  ____appdsl: { apm: "houKkWpYTX6hly7r79gD6g" } // cpp test 2 process
              }
          }
      },
      helper1C: {
          ____types: "jsObject",
          ____defaultValue: {},
          ____appdsl: { apm: "Kh2lTQHGT9qG0j1omkJmAg" } // messenger process
      },
      helper1D: {
          ____types: "jsObject",
          ____defaultValue: {},
          ____appdsl: { apm: "RxRtYI77Sd6FMa1Iyv9dSg" } // CPP Test Process 2A
      },
      */
      helper1E: {
        ____types: "jsObject",
        ____defaultValue: {},
        ____appdsl: {
          apm: cellspace.apmID("CPP Test 2C")
        }
      }
    }
  },
  subcells: [cppTestModel2, cppTestModel2A, cppTestModel2B, cppTestModel2C, cmCPPTestMessenger]
});
module.exports = new holarchy.CellModel({
  id: cellspace.cmID("CPP Test Models Wrapper"),
  name: "CPP Test Models Wrapper",
  description: "A wrapper for CPP Test CellModels.",
  // TODO: Rename to 'usesCellModels' as the CellModels enumerated here do not actuall change anything about this CellModel's definition.
  // Rather, they define the other CellModels that must also be registered with a CellProcessor instance in order for this cell to function
  // correctly at runtime in the CellProcessor instance.
  subcells: [cmCPPTestMessenger, cppTestModel1, cppTestModel2, cppTestModel2A, cppTestModel2B, cppTestModel2C, cppTestModel3]
});