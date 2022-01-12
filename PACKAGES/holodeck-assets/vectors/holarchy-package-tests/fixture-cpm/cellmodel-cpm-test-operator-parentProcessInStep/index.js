"use strict";

// cellmodel-cpm-test-operator-parentProcessInStep/index.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "YasRidtOS-qeNNXio5CbVQ",
  name: "CPM Parent Process In Step Operator Test Model",
  description: "A model to test CPM parent process in step operator.",
  apm: {
    id: "UMlS451nSWq6yDZNwcUTaw",
    name: "CPM Parent Process In Step Operator Test Process",
    description: "A process to test CPM parent process in step operator.",
    steps: {
      uninitialized: {
        description: "Default step",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_parent_process_in_step_1"
        }]
      },
      wait_for_parent_process_in_step_1: {
        description: "Wait for parent process in step.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  parentProcessInStep: {
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
        description: "The test process has detected that its parent is at the ready process step."
      }
    }
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;