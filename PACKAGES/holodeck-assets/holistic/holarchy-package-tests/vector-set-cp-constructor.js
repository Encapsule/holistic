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
          constructorRequest: undefined // explicitly

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
          actRequests: [{
            actorName: "CP constructor test #2",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "6OPnhgR9QWyEFaBpaZNb1A",
                      cellProcessUniqueName: "test-process-1"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CP constructor test #2",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "6OPnhgR9QWyEFaBpaZNb1A",
                      cellProcessUniqueName: "test-process-1"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CP constructor test #2",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "6OPnhgR9QWyEFaBpaZNb1A",
                      cellProcessUniqueName: "test-process-1"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CP constructor test #2",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    "delete": {
                      cellProcessNamespace: {
                        apmID: "6OPnhgR9QWyEFaBpaZNb1A",
                        cellProcessUniqueName: "test-process-1"
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
              holarchy: {
                CellProcessor: {
                  process: {
                    query: {}
                  }
                }
              } // get all result sets on ~ namespace (Cell Process Manager)

            }
          }, {
            actorName: "CP constructor test #3",
            actorTaskDescription: "Construct an instance of the Process Test Fixture Model that is declared to create three child processes via self-similar mechanism.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "itgXQ5RWS66fcdsuZim8AQ",
                      cellProcessUniqueName: "test3"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CP constructor test #4",
            actorTaskDescription: "Query the root cell process, the cell process manager.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    query: {}
                  }
                }
              } // default all result sets query - can you guess what apmBindingAddress cellProcessID derives from here?

            }
          }, {
            actorName: "CP constructor test #4",
            actorTaskDescription: "Query the root cell process, the cell process manager.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    query: {
                      queryCellProcess: {
                        cellProcessNamespace: {
                          apmID: "itgXQ5RWS66fcdsuZim8AQ",
                          cellProcessUniqueName: "test3"
                        }
                      }
                    }
                  }
                }
              } // get all result sets

            }
          }, {
            actorName: "CP constructor test #3",
            actorTaskDescription: "Now let's delete the cell process we just created supposing that it will actually delete four cell processes and reset the CellProcessor to default state.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    "delete": {
                      cellProcessNamespace: {
                        apmID: "itgXQ5RWS66fcdsuZim8AQ",
                        cellProcessUniqueName: "test3"
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