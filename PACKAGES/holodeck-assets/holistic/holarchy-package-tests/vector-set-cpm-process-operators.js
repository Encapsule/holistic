"use strict";

// vector-set-cpm-process-operators.js
var testFixtureModel = require("./fixture-cpm");

module.exports = [{
  id: "DhIrP3aDRQGrnmV63573iA",
  name: "CPM Child Processes Active Test",
  description: "Tests the CPM child processes active transition operator implementation.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "DhIrP3aDRQGrnmV63573iA",
            name: "CPM Child Processes Active Test",
            description: "Tests the CPM child processes active transition operator implementation.",
            cellmodel: testFixtureModel
          },
          actRequests: [{
            actorName: "CPM Child Processes Active Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "LVjhjYUcQXOYcbI_xbepJQ",
                      cellProcessUniqueName: "Test Process A"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Child Processes Active Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      // Optionally override the default parent process specification.
                      parentCellProcess: {
                        cellProcessNamespace: {
                          apmID: "LVjhjYUcQXOYcbI_xbepJQ",
                          cellProcessUniqueName: "Test Process A"
                        }
                      },
                      apmID: "LVjhjYUcQXOYcbI_xbepJQ",
                      cellProcessUniqueName: "Test Process B"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Child Processes Active Test",
            actorTaskDescription: "Start an interval timer process for debugging purposes.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "vWteGvhLQZq5C_OXd4p7Ig",
                      cellProcessUniqueName: "Interval Timer #1",
                      cellProcessInitData: {
                        construction: {
                          timeoutMs: 5000
                        }
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