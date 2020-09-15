"use strict";

var testFixtureModel = require("./fixture-cpm");

module.exports = [{
  id: "kZ5M4SOwRdOWp_zWumRtYg",
  name: "CPM Cell Process Proxy Test #1",
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
}];