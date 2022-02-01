"use strict";

var cppTestFixtureCellModel = require("./fixture-cpm");

var cppTestModelSpace = require("./fixture-cpm/cellspace");

var holarchy = require("@encapsule/holarchy");

module.exports = [{
  id: "kZ5M4SOwRdOWp_zWumRtYg",
  name: "CPM Shared Process Test #1",
  description: "A Cell Process Proxy unit test.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "kZ5M4SOwRdOWp_zWumRtYg",
            name: "CPM Cell Process Proxy Test #1",
            description: "A Cell Process Proxy unit test.",
            cellmodel: cppTestFixtureCellModel.getArtifact({
              type: "CM",
              id: cppTestModelSpace.cmID("CPP Test 1")
            }).result
          },
          testActorRequests: [// ================================================================
          {
            actRequest: {
              actorName: "CPM Cell Process Proxy Test #1",
              actorTaskDescription: "Instantiate test process that embeds a process proxy worker process.",
              actionRequest: {
                CellProcessor: {
                  process: {
                    activate: {
                      /*default processData*/
                    },
                    processCoordinates: {
                      apmID: cppTestModelSpace.apmID("CPP Test 1"),
                      instanceName: "Test Process A"
                    }
                  }
                }
              }
            }
          }, // ================================================================
          {
            options: {
              failTestIf: {
                CellProcessor: {
                  actionError: "fail-if-action-result"
                }
              }
            },
            actRequest: {
              actorName: "CPM Cell Process Proxy Test #1",
              actorTaskDescription: "Attempt to delete the newly created shared process (should fail).",
              actionRequest: {
                CellProcessor: {
                  process: {
                    deactivate: {},
                    processCoordinates: {
                      apmID: cppTestModelSpace.apmID("CPP Test 1"),
                      instanceName: "Test Process B"
                    }
                  }
                }
              }
            }
          }, // ================================================================
          {
            actRequest: {
              actorName: "CPM Cell Process Proxy Test #1",
              actorTaskDescription: "Attempt to delete the original test process (should succeed).",
              actionRequest: {
                CellProcessor: {
                  process: {
                    deactivate: {},
                    processCoordinates: {
                      apmID: cppTestModelSpace.apmID("CPP Test 1"),
                      instanceName: "Test Process A"
                    }
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, {
  id: "FSTf8ckWTFmm-qGt6lvIsA",
  name: "CPM Shared Process Test #2",
  description: "Start verifying that some simple CellModels that include CellProxy helpers work correctly when used as helpers, owned, and shared processes alike.",
  vectorRequest: {
    description: "Verify that CPP Test 2 APM is able to connect it's top-level proxy helper to shared test messenger shared cell process.",
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "FSTf8ckWTFmm-qGt6lvIsA",
            name: "CPM Shared Process Test #2",
            description: "Start verifying that some simple CellModels that include CellProxy helpers work correctly when used as helpers, owned, and shared processes alike.",
            cellmodel: cppTestFixtureCellModel.getArtifact({
              type: "CM",
              id: cppTestModelSpace.cmID("CPP Test 2")
            }).result
          },
          actRequests: [{
            actorName: "CPM Shared Process Test #2",
            actorTaskDescription: "Start a test process.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {
                    /* default processData */
                  },
                  processCoordinates: {
                    apmID: cppTestModelSpace.apmID("CPP Test 2")
                  }
                }
              }
            }
          }, {
            actorName: "CPM Shared Process Test #2",
            actorTaskDescription: "Delete the test process.",
            actionRequest: {
              CellProcessor: {
                process: {
                  deactivate: {},
                  processCoordinates: {
                    apmID: cppTestModelSpace.apmID("CPP Test 2")
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, {
  id: "QiSQnxzURSa4aVk_0PZGnQ",
  name: "CPM Shared Process Test #3",
  description: "Can we use a cell that uses a proxy as a helper? NO! WE CANNOT DO THIS YET. THIS IS PLANNED FOR v0.0.49.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "QiSQnxzURSa4aVk_0PZGnQ",
            name: "CPM Shared Process Test #3",
            description: "Can we use a cell that uses a proxy as a helper?",
            cellmodel: cppTestFixtureCellModel.getArtifact({
              type: "CM",
              id: cppTestModelSpace.cmID("CPP Test 3")
            }).result
          },
          testActorRequests: [{
            // THERE IS WHERE I LEFT OFF WHEN I WENT TO LOCK DOWN CELLPROCESS TEST HARNESS
            // v0.2.9-firestorm restriction on cell process proxy helper cell depth has been lifted.
            // options: { failTestIf: { CellProcessor: { evaluateError: "fail-if-opc-no-errors" } } },
            actRequest: {
              actorName: "CPM Shared Process Test #3",
              actorTaskDescription: "Start a test process.",
              actionRequest: {
                CellProcessor: {
                  process: {
                    activate: {
                      /* default processData */
                    },
                    processCoordinates: {
                      apmID: cppTestModelSpace.apmID("CPP Test 3")
                    }
                  }
                }
              }
            }
          }, {
            actRequest: {
              actorName: "CPM Shared Process Test #3",
              actorTaskDescription: "Delete a test process.",
              actionRequest: {
                CellProcessor: {
                  process: {
                    deactivate: {},
                    processCoordinates: {
                      apmID: cppTestModelSpace.apmID("CPP Test 3")
                    }
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}];