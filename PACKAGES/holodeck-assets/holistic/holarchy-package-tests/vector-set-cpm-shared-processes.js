"use strict";

var testFixtureModel = require("./fixture-cpm");

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
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "w6WWHevPQOKeGOe6QSL5Iw"
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
                      apmID: "J9RsPcp3RoS1QrZG-04XPg",
                      // "CPP Test Process With Worker Proxy Process",
                      cellProcessUniqueName: "Initial Owned Test Process"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Cell Process Proxy Test #1",
            actorTaskDescription: "Attempt to delete the newly created shared process (should fail).",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    "delete": {
                      cellProcessNamespace: {
                        apmID: "J9RsPcp3RoS1QrZG-04XPg",
                        // "CPP Test Process With Worker Proxy Process"
                        cellProcessUniqueName: "Secondary Shared Test Process"
                      }
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Cell Process Proxy Test #1",
            actorTaskDescription: "Attempt to delete the original test process (should succeed).",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    "delete": {
                      cellProcessNamespace: {
                        apmID: "J9RsPcp3RoS1QrZG-04XPg",
                        // "CPP Test Process With Worker Proxy Process"
                        cellProcessUniqueName: "Initial Owned Test Process"
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
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "CIyx6qSlSCyeBKMAQbGMPA"
              /* "CPP Test Model 2" */

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
                      apmID: "houKkWpYTX6hly7r79gD6g"
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
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "QdTHgiTaR6CDG7mdBEfZng"
              /* "CPP Test Model 2" */

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
                      apmID: "ZU4XFMxxT4-43mKsAp0dwA"
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