"use strict";

// cellmodel-cpm-test-operator-childProcessesAllInStep/index.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "OfLkkeNgQDm3xLb7TJqNRg",
  name: "CPM Child Processes All In Step Operator Test Model",
  description: "A model to test the CPM child processes all in step operator.",
  apm: {
    id: "vjz7U4NWRE2_UlAvAjmS6g",
    name: "CPM Child Processes All In Step Operator Test Process",
    description: "A model to test the CPM child processes all in step operator.",
    steps: {
      uninitialized: {
        description: "Default",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_child_processes_all_in_step_1"
        }]
      },
      wait_for_child_processes_all_in_step_1: {
        description: "Wait for active child process(es) all in step.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  childProcessesAllInStep: {
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