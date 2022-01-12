"use strict";

// vector-set-cpm-process-operators.js

/*
  TODO: I have made a little table for each of CPM operators that
  defines a minimum set of regression tests that should be written
  to ensure these operators are working reliably.
  Quick tally is 110 vectors or so...
*/
var testFixtureModel = require("./fixture-cpm");

module.exports = [// ----------------------------------------------------------------
// CPM Ancestor Processes Active

/*
  TEST | ANCESTORS | APM PREDICATE
  1    | single    | none
  2    | single    | single
  3    | single    | multi
  4    | multi     | none
  5    | multi     | single
  6    | multi     | multi
*/
{
  id: "XyAdaaZ_S9OTkRuwBYe4Ew",
  name: "CPM Ancestor Processes Active Test",
  description: "Tests the CPM ancestor processes active operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "XyAdaaZ_S9OTkRuwBYe4Ew",
            name: "CPM Ancestor Processes Active Test",
            description: "Tests the CPM ancestor processes active operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "eu32xBRTSE2-B71HrwPFBg"
            }).result
          },
          actRequests: [{
            actorName: "CPM Ancestor Processes Active Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "hybdu0VoQjWnOFs5vC3Tzw",

                    /* "CPM Ancestor Processes Active Operator Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Ancestor Processes All In Step

/*
  TEST | ANCESTORS | STEP PREDICATE | APM PREDICATE | VALID
  1    | single    | none           | *             | NO
  2    | single    | single         | none          |
  3    | single    | single         | single        |
  4    | single    | single         | multi         |
  5    | single    | multi          | none
  6    | single    | multi          | single
  7    | single    | multi          | multi
  8    | multi     | single         | none
  9    | multi     | single         | single
  10    | multi     | single         | multi
  11   | multi     | multi          | none
  12   | multi     | multi          | single
  13   | multi     | multi          | multi
*/
{
  id: "vzOf_2LZTgG7PSWqr_JzgA",
  name: "CPM Ancestor Processes All In Step Operator Test",
  description: "Tests the CPM descendant processes all in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "vzOf_2LZTgG7PSWqr_JzgA",
            name: "CPM Ancestor Processes All In Step Operator Test",
            description: "Tests the CPM descendant processes all in step transition operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "wjUvGFxOQu6H3lZeII0cbA"
            }).result
          },
          actRequests: [{
            actorName: "CPM Ancestor Processes All In Step Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "c09ke74xRza4Q9u2Ly0NIA",

                    /*"CPM Ancestor Processes All In Step Operator Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Ancestor Processes Any In Step

/*
  1    | single    | none           | *             | NO
  2    | single    | single         | none          |
  3    | single    | single         | single        |
  4    | single    | single         | multi         |
  5    | single    | multi          | none
  6    | single    | multi          | single
  7    | single    | multi          | multi
  8    | multi     | single         | none
  9    | multi     | single         | single
  10    | multi     | single         | multi
  11   | multi     | multi          | none
  12   | multi     | multi          | single
  13   | multi     | multi          | multi
*/
{
  id: "FLusrxY-QpulvQ5jpazAgg",
  name: "CPM Ancestor Processes Any In Step Operator Test",
  description: "Tests the CPM ancestor processes any in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "FLusrxY-QpulvQ5jpazAgg",
            name: "CPM Ancestor Processes Any In Step Operator Test",
            description: "Tests the CPM ancestor processes any in step transition operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "4_rZ65rORrOEYJTCl5mOEQ"
            }).result
          },
          actRequests: [{
            actorName: "CPM Ancestor Processes Any In Step Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "we5IUb__Smqwkl4ghRl3Lw",

                    /* "CPM Ancestor Processes Any In Step Operator Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Child Processes Active

/*
  TEST | CHILDREN | APM PREDICATE
  1    | none     | *
  2    | single   | none
  3    | single   | single
  4    | single   | multi
  5    | multi    | none
  6    | multi    | single
  7    | multi    | multi
*/
{
  id: "DhIrP3aDRQGrnmV63573iA",
  name: "CPM Child Processes Active Test",
  description: "Tests the CPM child processes active transition operator implementation.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "DhIrP3aDRQGrnmV63573iA",
            name: "CPM Child Processes Active Test",
            description: "Tests the CPM child processes active transition operator implementation.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "rIA4ammlRHStLM9zMYuJ9Q"
            }).result
          },
          actRequests: [{
            actorName: "CPM Child Processes Active Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "LVjhjYUcQXOYcbI_xbepJQ",

                    /* CPM Child Processes Active Operator Test Process*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }, {
            actorName: "CPM Child Processes Active Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {},
                          processCoordinates: {
                            apmID: "3E27IH_CQeqBUFsGm4tIIA",

                            /* Dummy Process A Process*/
                            instanceName: "Child Process"
                          }
                        }
                      }
                    }
                  },
                  cellCoordinates: {
                    apmID: "LVjhjYUcQXOYcbI_xbepJQ",

                    /* CPM Child Processes Active Operator Test Process*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // CPM Child Processes All In Step

/*
  TEST | CHILDREN | STEP PREDICATE | APM PREDICATE | VALID
  1    | *        | none           | *             | NO
  2    | none     | single         | *             | YES
  2    | single   | single         | none
  3    | single   | single         | single
  4    | single   | single         | multi
  5    | single   | multi          | none
  6    | single   | multi          | single
  7    | single   | multi          | multi
  8    | multi    | single         | none
  9    | multi    | single         | single
  10   | multi    | single         | multi
  11   | multi    | multi          | none
  12   | multi    | multi          | single
  13   | multi    | multi          | multi
*/
{
  id: "Jq9BQRTXQmmSznq40NvuiQ",
  name: "CPM Child Processes All In Step Operator Test",
  description: "Tests the CPM child processes all in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "Jq9BQRTXQmmSznq40NvuiQ",
            name: "CPM Child Processes All In Step Operator Test",
            description: "Tests the CPM child processes all in step transition operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "OfLkkeNgQDm3xLb7TJqNRg"
            }).result
          },
          actRequests: [{
            actorName: "CPM Child Processes All In Step Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "vjz7U4NWRE2_UlAvAjmS6g",

                    /* "CPM Child Processes All In Step Operator Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }, {
            actorName: "CPM Child Processes All In Step Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {},
                          processCoordinates: {
                            apmID: "3E27IH_CQeqBUFsGm4tIIA",

                            /* Dummy Process A Process*/
                            instanceName: "Child Process"
                          }
                        }
                      }
                    }
                  },
                  cellCoordinates: {
                    apmID: "vjz7U4NWRE2_UlAvAjmS6g",

                    /* "CPM Child Processes All In Step Operator Test Process" */
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Child Processes Any In Step

/*
  TEST | CHILDREN | STEP PREDICATE | APM PREDICATE | VALID
  1    | *        | none           | *             | NO
  2    | none     | single         | *             | YES
  2    | single   | single         | none
  3    | single   | single         | single
  4    | single   | single         | multi
  5    | single   | multi          | none
  6    | single   | multi          | single
  7    | single   | multi          | multi
  8    | multi    | single         | none
  9    | multi    | single         | single
  10   | multi    | single         | multi
  11   | multi    | multi          | none
  12   | multi    | multi          | single
  13   | multi    | multi          | multi
*/
{
  id: "BSXTNPAaRXKR5C5OrJzSwQ",
  name: "CPM Child Processes Any In Step Operator Test",
  description: "Tests the CPM child processes any in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "BSXTNPAaRXKR5C5OrJzSwQ",
            name: "CPM Child Processes Any In Step Operator Test",
            description: "Tests the CPM child processes any in step transition operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "C_wxJlAoTHW_7TWmpCXL2g"
            }).result
          },
          actRequests: [{
            actorName: "CPM Child Processes All In Step Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "8LE0CnuHRMOKoGXn1kHdNA",

                    /* "CPM Child Processes Any In Step Operator Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }, {
            actorName: "CPM Child Processes All In Step Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {},
                          processCoordinates: {
                            apmID: "3E27IH_CQeqBUFsGm4tIIA",

                            /* Dummy Process A Process*/
                            instanceName: "Child Process"
                          }
                        }
                      }
                    }
                  },
                  cellCoordinates: {
                    apmID: "8LE0CnuHRMOKoGXn1kHdNA",
                    // "CPM Child Processes Any In Step Operator Test Process"
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Descendant Processes Active

/*
  TEST | DESCENDANTS | APM PREDICATE
  1    | none        | *
  2    | single      | none
  3    | single      | single
  4    | single      | multi
  5    | multi       | none
  6    | multi       | single
  7    | multi       | multi
*/
{
  id: "frzhwqHrSCi1Ta9Mz1gQDg",
  name: "CPM Descendant Processes Active Test",
  description: "Tests the CPM descendant processes active operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "frzhwqHrSCi1Ta9Mz1gQDg",
            name: "CPM Descendant Processes Active Test",
            description: "Tests the CPM descendant processes active transition operator implementation.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "L0L3o-vqTOOli8Lio96e8w"
            }).result
          },
          actRequests: [{
            actorName: "CPM Descendant Processes Active Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "cYpoxyyZSwm19CqH3v7eLQ",

                    /* "CPM Descendant Processes Active Operator Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }, {
            actorName: "CPM Child Processes Active Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {},
                          processCoordinates: {
                            apmID: "3E27IH_CQeqBUFsGm4tIIA",

                            /* Dummy Process A Process*/
                            instanceName: "Child Process"
                          }
                        }
                      }
                    }
                  },
                  cellCoordinates: {
                    apmID: "cYpoxyyZSwm19CqH3v7eLQ",
                    // "CPM Descendant Processes Active Operator Test Process"
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Descendant Processes All In Step

/*
  TEST | DESCENDANTS | STEP PREDICATE | APM PREDICATE | VALID
  1    | *           | none           | *             | NO
  2    | none        | single         | *             | YES
  3    | single      | single         | none
  4    | single      | single         | single
  5    | single      | single         | multi
  6    | single      | multi          | none
  7    | single      | multi          | single
  8    | single      | multi          | multi
  9    | multi       | single         | none
  10   | multi       | single         | single
  11   | multi       | single         | multi
  12   | multi       | multi          | none
  13   | multi       | multi          | single
  14   | multi       | multi          | multi
*/
{
  id: "tydUf2gSSgSjSmrrF8nkyw",
  name: "CPM Descendant Processes All In Step Test",
  description: "Tests the CPM descendant processes all in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "tydUf2gSSgSjSmrrF8nkyw",
            name: "CPM Descendant Processes All In Step Test",
            description: "Tests the CPM descendant processes all in step transition operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "DXfqoTLmRzi-IloxkIFbRQ"
            }).result
          },
          actRequests: [{
            actorName: "CPM Descendant Processes All In Step Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "XzNJP6LyTCOnhGPKpJIjzg",

                    /* "CPM Descendant Processes ALl In Step Operator Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }, {
            actorName: "CPM Descendant Processes All In Step Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {},
                          processCoordinates: {
                            apmID: "3E27IH_CQeqBUFsGm4tIIA",

                            /* Dummy Process A Process*/
                            instanceName: "Child Process"
                          }
                        }
                      }
                    }
                  },
                  cellCoordinates: {
                    apmID: "XzNJP6LyTCOnhGPKpJIjzg",
                    // "CPM Descendant Processes ALl In Step Operator Test Process"
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Descendant Processes Any In Step

/*
  TEST | DESCENDANTS | STEP PREDICATE | APM PREDICATE | VALID
  1    | *           | none           | *             | NO
  2    | none        | single         | *             | YES
  3    | single      | single         | none
  4    | single      | single         | single
  5    | single      | single         | multi
  6    | single      | multi          | none
  7    | single      | multi          | single
  8    | single      | multi          | multi
  9    | multi       | single         | none
  10   | multi       | single         | single
  11   | multi       | single         | multi
  12   | multi       | multi          | none
  13   | multi       | multi          | single
  14   | multi       | multi          | multi
*/
{
  id: "OFSWJDZdQVSnkUxpu0THsw",
  name: "CPM Descendant Processes Any In Step Test",
  description: "Tests the CPM descendant processes any in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "OFSWJDZdQVSnkUxpu0THsw",
            name: "CPM Descendant Processes Any In Step Test",
            description: "Tests the CPM descendant processes any in step transition operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "xbaDltz5S2m7Wes94Kx2pQ"
            }).result
          },
          actRequests: [{
            actorName: "CPM Descendant Processes All In Step Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "TR7suTjQSKOBK5bGKztIcg",

                    /* "CPM Descendant Processes Any In Step Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }, {
            actorName: "CPM Descendant Processes All In Step Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {},
                          processCoordinates: {
                            apmID: "3E27IH_CQeqBUFsGm4tIIA",

                            /* Dummy Process A Process*/
                            instanceName: "Child Process"
                          }
                        }
                      }
                    }
                  },
                  cellCoordinates: {
                    apmID: "TR7suTjQSKOBK5bGKztIcg",
                    //  "CPM Descendant Processes Any In Step Test Process"
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Parent Process Active

/*
  TEST | PARENT | APM PREDICATE
  1    | single | none
  2    | single | single
  3    | single | multi
*/
{
  id: "rdh8dW74RnO7lWGNlFR79A",
  name: "CPM Parent Process Active Test",
  description: "Tests the CPM parent process active operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "rdh8dW74RnO7lWGNlFR79A",
            name: "CPM Parent Process Active Test",
            description: "Tests the CPM parent process active operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "mLTbOO97TtixSbKl8VB7gQ"
            }).result
          },
          actRequests: [{
            actorName: "CPM Parent Process Active Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "kAuEmZA9Qn24PEZLBygGyA",

                    /* "CPM Parent Process Active Operator Test Process"*/
                    instanceName: "Test Process"
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}, // ----------------------------------------------------------------
// CPM Parent Process In Step

/*
  TEST | PARENT | STEP PREDICATE | APM PREDICATE | VALID
  1    | single | none           | *             | NO
  2    | single | single         | none
  3    | single | single         | single
  4    | single | single         | multi
  5    | single | multi          | none
  6    | single | multi          | single
  7    | single | multi          | multi
*/
{
  id: "E4OfrQ0iS8yTV2DUaw7GGg",
  name: "CPM Parent Process In Step Operator Test",
  description: "Tests the CPM parent process in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
          options: {
            failTestIf: {
              postTestAnalysis: {
                CellProcessManager: {
                  ownedProcessTableEmpty: "fail-if-no-owned-processes"
                }
              }
            }
          },
          constructorRequest: {
            id: "E4OfrQ0iS8yTV2DUaw7GGg",
            name: "CPM Parent Process In Step Operator Test",
            description: "Tests the CPM parent process in step transition operator.",
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "YasRidtOS-qeNNXio5CbVQ"
            }).result
          },
          actRequests: [{
            actorName: "CPM Parent Process In Step Operator Test",
            actorTaskDescription: "Start the first process instance. We will use this process as our test.",
            actionRequest: {
              CellProcessor: {
                process: {
                  activate: {},
                  processCoordinates: {
                    apmID: "UMlS451nSWq6yDZNwcUTaw",

                    /* "CPM Parent Process In Step Operator Test Process"*/
                    instanceName: "Test Process"
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