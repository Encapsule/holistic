"use strict";

var cppTestFixtureCellModel = require("./fixture-cpm");

var cppTestModelSpace = require("./fixture-cpm/cellspace");

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
          actRequests: [// ================================================================
          {
            actorName: "CPM Cell Process Proxy Test #1",
            actorTaskDescription: "Instantiate test process that embeds a process proxy worker process.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: cppTestModelSpace.apmID("CPP Test 1"),
                      cellProcessUniqueName: "Test Process A"
                    }
                  }
                }
              }
            }
          }, // ================================================================
          {
            actorName: "CPM Cell Process Proxy Test #1",
            actorTaskDescription: "Attempt to delete the newly created shared process (should fail).",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    "delete": {
                      cellProcessNamespace: {
                        apmID: cppTestModelSpace.apmID("CPP Test 1"),
                        cellProcessUniqueName: "Test Process B"
                      }
                    }
                  }
                }
              }
            }
          }, // ================================================================
          {
            actorName: "CPM Cell Process Proxy Test #1",
            actorTaskDescription: "Attempt to delete the original test process (should succeed).",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    "delete": {
                      cellProcessNamespace: {
                        apmID: cppTestModelSpace.apmID("CPP Test 1"),
                        cellProcessUniqueName: "Test Process A"
                      }
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: cppTestModelSpace.apmID("CPP Test 2")
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
  id: "QiSQnxzURSa4aVk_0PZGnQ",
  name: "CPM Shared Process Test #3",
  description: "Can we use a cell that uses a proxy as a helper?",
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
          actRequests: [{
            actorName: "CPM Shared Process Test #3",
            actorTaskDescription: "Start a test process.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: cppTestModelSpace.apmID("CPP Test 3")
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Shared Process Test #3",
            actorTaskDescription: "Delete a test process.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    "delete": {
                      cellProcessNamespace: {
                        apmID: cppTestModelSpace.apmID("CPP Test 3")
                      }
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