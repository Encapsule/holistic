"use strict";

// cellmodel-cpm-test-operator-childProcessesAnyInStep.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "C_wxJlAoTHW_7TWmpCXL2g",
  name: "CPM Child Processes Any In Step Operator Test Model",
  description: "A model to test the CPM child processes any in step operator.",
  apm: {
    id: "8LE0CnuHRMOKoGXn1kHdNA",
    name: "CPM Child Processes Any In Step Operator Test Process",
    description: "A model to test the CPM child processes any in step operator.",
    steps: {
      uninitialized: {
        description: "Default",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_child_processes_any_in_step_1"
        }]
      },
      wait_for_child_processes_any_in_step_1: {
        description: "Wait for active child process(es) any in step.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  childProcessesAnyInStep: {
                    apmStep: "ready"
                  }
                }
              }
            }
          },
          nextStep: "test_pass_1"
        }]
      },
      test_pass_1: {
        description: "All child processes have reached the desired step(s)."
      }
    }
  },
  subcells: [require("../cellmodel-dummy-A")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;