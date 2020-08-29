"use strict";

// vector-set-cpm-process-operators.js
var testFixtureModel = require("./fixture-cpm");

module.exports = [// CPM Ancestor Processes Active
{
  id: "XyAdaaZ_S9OTkRuwBYe4Ew",
  name: "CPM Ancestor Processes Active Test",
  description: "Tests the CPM ancestor processes active operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "hybdu0VoQjWnOFs5vC3Tzw",
                      //  "CPM Ancestor Processes Active Operator Test Process"
                      cellProcessUniqueName: "Test Process"
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
}, // CPM Ancestor Processes All In Step
{
  id: "vzOf_2LZTgG7PSWqr_JzgA",
  name: "CPM Ancestor Processes All In Step Operator Test",
  description: "Tests the CPM descendant processes all in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "c09ke74xRza4Q9u2Ly0NIA",
                      // "CPM Ancestor Processes All In Step Operator Test Process"
                      cellProcessUniqueName: "Test Process"
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
}, // CPM Ancestor Processes Any In Step
{
  id: "FLusrxY-QpulvQ5jpazAgg",
  name: "CPM Ancestor Processes Any In Step Operator Test",
  description: "Tests the CPM ancestor processes any in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "we5IUb__Smqwkl4ghRl3Lw",
                      // "CPM Ancestor Processes Any In Step Operator Test Process"
                      cellProcessUniqueName: "Test Process"
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
}, // CPM Child Processes Active
{
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
            cellmodel: testFixtureModel.getArtifact({
              type: "CM",
              id: "rIA4ammlRHStLM9zMYuJ9Q"
            }).result
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
                      // CPM Child Processes Active Operator Test Process
                      cellProcessUniqueName: "Test Process"
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
                          // CPM Child Processes Active Operator Test Process
                          cellProcessUniqueName: "Test Process"
                        }
                      },
                      apmID: "3E27IH_CQeqBUFsGm4tIIA",
                      // Dummy Process A Process
                      cellProcessUniqueName: "Child Process"
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
}, // CPM Child Processes All In Step
{
  id: "Jq9BQRTXQmmSznq40NvuiQ",
  name: "CPM Child Processes All In Step Operator Test",
  description: "Tests the CPM child processes all in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "vjz7U4NWRE2_UlAvAjmS6g",
                      // "CPM Child Processes All In Step Operator Test Process"
                      cellProcessUniqueName: "Test Process"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Child Processes All In Step Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      // Optionally override the default parent process specification.
                      parentCellProcess: {
                        cellProcessNamespace: {
                          apmID: "vjz7U4NWRE2_UlAvAjmS6g",
                          // "CPM Child Processes All In Step Operator Test Process"
                          cellProcessUniqueName: "Test Process"
                        }
                      },
                      apmID: "3E27IH_CQeqBUFsGm4tIIA",
                      // Dummy Process A Process
                      cellProcessUniqueName: "Child Process"
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
}, // CPM Child Processes Any In Step
{
  id: "BSXTNPAaRXKR5C5OrJzSwQ",
  name: "CPM Child Processes Any In Step Operator Test",
  description: "Tests the CPM child processes any in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "8LE0CnuHRMOKoGXn1kHdNA",
                      // "CPM Child Processes Any In Step Operator Test Process"
                      cellProcessUniqueName: "Test Process"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Child Processes All In Step Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      // Optionally override the default parent process specification.
                      parentCellProcess: {
                        cellProcessNamespace: {
                          apmID: "8LE0CnuHRMOKoGXn1kHdNA",
                          // "CPM Child Processes Any In Step Operator Test Process"
                          cellProcessUniqueName: "Test Process"
                        }
                      },
                      apmID: "3E27IH_CQeqBUFsGm4tIIA",
                      // Dummy Process A Process
                      cellProcessUniqueName: "Child Process"
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
}, // CPM Descendant Processes Active
{
  id: "frzhwqHrSCi1Ta9Mz1gQDg",
  name: "CPM Descendant Processes Active Test",
  description: "Tests the CPM descendant processes active operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "cYpoxyyZSwm19CqH3v7eLQ",
                      // "CPM Descendant Processes Active Operator Test Process"
                      cellProcessUniqueName: "Test Process"
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
                          apmID: "cYpoxyyZSwm19CqH3v7eLQ",
                          // "CPM Descendant Processes Active Operator Test Process"
                          cellProcessUniqueName: "Test Process"
                        }
                      },
                      apmID: "3E27IH_CQeqBUFsGm4tIIA",
                      // Dummy Process A Process
                      cellProcessUniqueName: "Child Process"
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
}, // CPM Descendant Processes All In Step
{
  id: "tydUf2gSSgSjSmrrF8nkyw",
  name: "CPM Descendant Processes All In Step Test",
  description: "Tests the CPM descendant processes all in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "XzNJP6LyTCOnhGPKpJIjzg",
                      // "CPM Descendant Processes ALl In Step Operator Test Process"
                      cellProcessUniqueName: "Test Process"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Descendant Processes All In Step Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      // Optionally override the default parent process specification.
                      parentCellProcess: {
                        cellProcessNamespace: {
                          apmID: "XzNJP6LyTCOnhGPKpJIjzg",
                          // "CPM Descendant Processes ALl In Step Operator Test Process"
                          cellProcessUniqueName: "Test Process"
                        }
                      },
                      apmID: "3E27IH_CQeqBUFsGm4tIIA",
                      // Dummy Process A Process
                      cellProcessUniqueName: "Child Process"
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
}, // CPM Descendant Processes Any In Step
{
  id: "OFSWJDZdQVSnkUxpu0THsw",
  name: "CPM Descendant Processes Any In Step Test",
  description: "Tests the CPM descendant processes any in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "TR7suTjQSKOBK5bGKztIcg",
                      //  "CPM Descendant Processes Any In Step Test Process"
                      cellProcessUniqueName: "Test Process"
                    }
                  }
                }
              }
            }
          }, {
            actorName: "CPM Descendant Processes All In Step Test",
            actorTaskDescription: "Start the second process instance. We will use this process to trigger a process step change in the first test process instance.",
            actionRequest: {
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      // Optionally override the default parent process specification.
                      parentCellProcess: {
                        cellProcessNamespace: {
                          apmID: "TR7suTjQSKOBK5bGKztIcg",
                          //  "CPM Descendant Processes Any In Step Test Process"
                          cellProcessUniqueName: "Test Process"
                        }
                      },
                      apmID: "3E27IH_CQeqBUFsGm4tIIA",
                      // Dummy Process A Process
                      cellProcessUniqueName: "Child Process"
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
}, // CPM Parent Process Active
{
  id: "rdh8dW74RnO7lWGNlFR79A",
  name: "CPM Parent Process Active Test",
  description: "Tests the CPM parent process active operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "kAuEmZA9Qn24PEZLBygGyA",
                      // "CPM Parent Process Active Operator Test Process"
                      cellProcessUniqueName: "Test Process"
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
}, // CPM Parent Process In Step
{
  id: "E4OfrQ0iS8yTV2DUaw7GGg",
  name: "CPM Parent Process In Step Operator Test",
  description: "Tests the CPM parent process in step transition operator.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellProcessor: {
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
              holarchy: {
                CellProcessor: {
                  process: {
                    create: {
                      apmID: "UMlS451nSWq6yDZNwcUTaw",
                      // "CPM Parent Process In Step Operator Test Process"
                      cellProcessUniqueName: "Test Process"
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