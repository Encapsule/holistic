"use strict";

// cellmodel-cpm-test-operator-childProcessesActive.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "rIA4ammlRHStLM9zMYuJ9Q",
  name: "CPM Child Processes Active Operator Test Model",
  description: "A model to test the child processes active operator.",
  apm: {
    id: "LVjhjYUcQXOYcbI_xbepJQ",
    name: "CPM Child Processes Active Operator Test Process",
    description: "Test process",
    steps: {
      uninitialized: {
        description: "Default step",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_child_processes_1"
        }]
      },
      wait_for_child_processes_1: {
        description: "Wait for active child process(es) active.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  childProcessesActive: {}
                }
              }
            }
          },
          nextStep: "test_pass_1"
        }]
      },
      test_pass_1: {
        description: "The test process has detected one or more active child process(es)."
      }
    }
  },
  // apm
  subcells: [require("../cellmodel-dummy-A")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;