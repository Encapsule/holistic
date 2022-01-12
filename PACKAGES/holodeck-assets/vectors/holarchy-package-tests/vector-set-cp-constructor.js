"use strict";

var cellProcessTestFixture1 = require("./fixture-cell-process-tests-1");

module.exports = [{
  id: "ILfH_hfQSM-ZOohMgpYU8A",
  name: "CellProcessor Constructor Test #1",
  description: "Default construct CellProcessor ES6 class. Should fail.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: undefined,
          // explicitly
          options: {
            failTestIf: {
              CellProcessor: {
                instanceValidity: "fail-if-instance-valid"
              }
            }
          }
        }
      }
    }
  }
}, {
  id: "NPN6z4aOTqOOO60wLVKOcg",
  name: "CellProcessor Constructor Test #2",
  description: "A minamally-configured CellProcessor instance. Should succeed to create and delete a trivial cell process.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "NPN6z4aOTqOOO60wLVKOcg",
            name: "CellProcessor Constructor #2",
            description: "A minamally-configured CellProcessor instance.",
            cellmodel: {
              id: "cJQGRL5sTSqk02JiEaM06g",
              name: "Test CM",
              description: "Test CellModel",
              apm: {
                id: "6OPnhgR9QWyEFaBpaZNb1A",
                name: "Test CM APM",
                description: "Test AbstractProcessModel",
                ocdDataSpec: {
                  ____label: "Test APM Root",
                  ____types: "jsObject",
                  ____defaultValue: {},
                  testProperty: {
                    ____label: "Test Property",
                    ____accept: ["jsNull", "jsString"],
                    ____defaultValue: null
                  }
                }
              }
            }
          },
          testActorRequests: [{
            actRequest: {
              actorName: "CP constructor test #2",
              actionRequest: {
                CellProcessor: {
                  process: {
                    activate: {
                      /* default processData */
                    },
                    processCoordinates: {
                      apmID: "6OPnhgR9QWyEFaBpaZNb1A",
                      instanceName: "test-process-1"
                    }
                  }
                }
              }
            }
          }, {
            // NOTE: Expected to return a response.error so override default behavior and accept it as a TEST PASS.
            options: {
              failTestIf: {
                CellProcessor: {
                  actionError: "fail-if-action-result"
                }
              }
            },
            actRequest: {
              actorName: "CP constructor test #2",
              actionRequest: {
                CellProcessor: {
                  process: {
                    activate: {
                      /* default processData */
                    },
                    processCoordinates: {
                      apmID: "6OPnhgR9QWyEFaBpaZNb1A",
                      instanceName: "test-process-1"
                    }
                  }
                }
              }
            }
          }, {
            actRequest: {
              actorName: "CP constructor test #2",
              actionRequest: {
                CellProcessor: {
                  process: {
                    deactivate: {},
                    processCoordinates: {
                      apmID: "6OPnhgR9QWyEFaBpaZNb1A",
                      instanceName: "test-process-1"
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
  id: "8U6dvxoHTyGY7usKsCZqXQ",
  name: "CellProcessor Constructur Test #3",
  description: "Uses the test fixture model to exercise a more complex process create and delete scenario involving deeper nesting of subprocesses.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          constructorRequest: {
            id: "8U6dvxoHTyGY7usKsCZqXQ",
            name: "CellProcessor Constructur Test #3",
            description: "Uses the test fixture model to exercise a more complex process create and delete scenario involving deeper nesting of subprocesses.",
            cellmodel: cellProcessTestFixture1
          },
          actRequests: [{
            actorName: "CP constructor test #4",
            actorTaskDescription: "Query the root cell process, the cell process manager.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  query: {
                    /*take defaults*/
                  },
                  cellCoordinates: "~"
                }
              }
            } // get all result sets on ~ namespace (Cell Process Manager)

          }, {
            actorName: "CP constructor test #3",
            actorTaskDescription: "Construct an instance of the Process Test Fixture Model that is declared to create three child processes via self-similar mechanism.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {
                    /* default processData */
                  },
                  processCoordinates: {
                    apmID: "itgXQ5RWS66fcdsuZim8AQ",
                    instanceName: "test3"
                  }
                }
              }
            }
          }, {
            actorName: "CP constructor test #4",
            actorTaskDescription: "Query the root cell process, the cell process manager.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  query: {},
                  cellCoordinates: "~"
                }
              }
            } // get all result sets on ~ namespace (Cell Process Manager)

          }, {
            actorName: "CP constructor test #4",
            actorTaskDescription: "Query the newly-activated cell process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  query: {},
                  cellCoordinates: {
                    apmID: "itgXQ5RWS66fcdsuZim8AQ",
                    instanceName: "test3"
                  }
                }
              }
            }
          }, {
            actorName: "CP constructor test #4",
            actorTaskDescription: "Query this cell by specifying relative path coordinates implicity via delegation.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        cell: {
                          query: {}
                        }
                      }
                    }
                  },
                  cellCoordinates: {
                    apmID: "itgXQ5RWS66fcdsuZim8AQ",
                    instanceName: "test3"
                  }
                }
              }
            }
          }, {
            actorName: "CP constructor test #3",
            actorTaskDescription: "Now let's delete the cell process we just created supposing that it will actually delete four cell processes and reset the CellProcessor to default state.",
            // This is an explicitly verbose call to delete a previously-created cell process that uses delegate to resolve the cell process coordinates before delegating to CPM process delete.
            // We could equivalently specify process.delete.coordinates to accomplish the same. Both forms should always work the same.
            actionRequest: {
              CellProcessor: {
                cell: {
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          deactivate: {}
                        }
                      }
                    }
                  },
                  cellCoordinates: {
                    apmID: "itgXQ5RWS66fcdsuZim8AQ",
                    instanceName: "test3"
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