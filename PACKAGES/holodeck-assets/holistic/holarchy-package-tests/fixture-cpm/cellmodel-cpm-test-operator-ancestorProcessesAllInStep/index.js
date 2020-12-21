"use strict";

// cellmodel-cpm-test-operator-ancestorProcessesAllInStep/index.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "wjUvGFxOQu6H3lZeII0cbA",
  name: "CPM Ancestor Processes All In Step Operator Test Model",
  description: "A model to test CPM ancestor processes all in step operator.",
  apm: {
    id: "c09ke74xRza4Q9u2Ly0NIA",
    name: "CPM Ancestor Processes All In Step Operator Test Process",
    description: "A process to test CPM ancestor all in step operator.",
    steps: {
      uninitialized: {
        description: "Default step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_ancestor_processes_all_in_step_1"
        }]
      },
      wait_for_ancestor_processes_all_in_step_1: {
        description: "Wait for all ancestor processes to all be in any of the specified process step(s).",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  ancestorProcessesAllInStep: {
                    apmStep: "ready",
                    omitCellProcessor: false
                  }
                }
              }
            }
          },
          nextStep: "test_pass_1"
        }]
      },
      test_pass_1: {
        description: "All ancestor processes are at the expected process step."
      }
    }
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;