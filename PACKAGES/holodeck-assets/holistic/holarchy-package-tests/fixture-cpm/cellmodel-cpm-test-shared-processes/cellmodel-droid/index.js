"use strict";

// CellModel-CPPTestDroid.js
var holarchy = require("@encapsule/holarchy");

var cellspace = require("../../cellspace");

var cmName = "CPP Test Droid";
module.exports = new holarchy.CellModel({
  id: cellspace.cmID(cmName),
  name: cmName,
  description: "A generic model to help orchestrate test creation and experiment further with interesting CellModel usage patterns.",
  apm: {
    id: cellspace.apmID(cmName),
    name: cmName,
    description: "Provides a mechanism to pre-program a little droid agent to run tests as a cell inside of CellProcessor instance.",
    ocdDataSpec: {
      ____types: "jsObject",
      ____defaultValue: {},
      construction: {
        ____types: "jsObject",
        ____defaultValue: {},
        instanceName: {
          ____accept: ["jsNull", "jsString"]
        },
        droidProcessRuntimeBehaviors: {
          ____types: "jsArray",
          ____defaultValue: [],
          runtimeBehaviorDescriptor: {
            ____types: "jsObject",
            operatorRequest: {
              ____accept: ["jsUndefined", "jsObject"]
            },
            actionRequest: {
              ____types: ["jsUndefined", "jsObject", "jsArray"]
            }
          }
        }
      },
      output: {
        ____types: "jsObject",
        ____defaultValue: {},
        droidBehaviorLog: {
          ____types: "jsArray",
          ____defaultValue: [],
          behaviorStepLog: {
            ____accept: "jsObject"
            /* TODO */

          }
        }
      }
    },
    steps: {
      uninitialized: {
        description: "Default process start step.",
        transitions: [{
          transitionIf: {
            holarchy: {
              cm: {
                operators: {
                  ocd: {
                    arrayIsEmpty: {
                      path: "#.construction.droidProcessRuntimeBehaviors"
                    }
                  }
                }
              }
            }
          },
          nextStep: "waiting_for_behavior_sequence"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "run_behavior_sequence"
        }]
      },
      waiting_for_behavior_sequence: {
        description: "Waiting for someone to write #.construction.droidProcessRuntimeBehaviors namespace with instructions.",
        transitions: [{
          transitionIf: {
            not: {
              holarchy: {
                cm: {
                  operators: {
                    ocd: {
                      arrayIsEmpty: {
                        path: "#.construction.droidProcessRuntimeBehaviors"
                      }
                    }
                  }
                }
              }
            }
          },
          nextStep: "set_new_behavior"
        }]
      },
      set_new_behavior: {
        description: "Dequeueing new droid behavior...",
        actions: {
          enter: [{
            "e1eD7WDvTJqZwzu0i_FDGA_workerAction": {
              setNewBehavior: {}
            }
          }]
        },
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_behavior_operator"
        }]
      },
      wait_behavior_operator: {
        description: "Wait for the condition specified by the currently set droid behavior.",
        transitions: [{
          transitionIf: {
            "e1eD7WDvTJqZwzu0i_FDGA_workerOperator": {
              evaluateBehaviorOperator: {}
            }
          },
          nextStep: "run_behavior_actions"
        }]
      },
      run_behavior_actions: {
        description: "Running action(s) specified by the currently set droid behavior.",
        actions: {
          enter: [{
            "e1eD7WDvTJqZwzu0i_FDGA_workerAction": {
              runBehaviorActions: {}
            }
          }]
        },
        transitions: [{
          transitionIf: {
            holarchy: {
              cm: {
                operators: {
                  ocd: {
                    arrayIsEmpty: {
                      path: "#.construction.droidProcessRuntimeBehaviors"
                    }
                  }
                }
              }
            }
          },
          nextStep: "droid_process_finished"
        }, {
          transitionIf: {
            always: true
          },
          nextStep: "set_new_behavior"
        }]
      },
      droid_process_finished: {
        description: "The droid process is finished."
      }
    }
  }
});