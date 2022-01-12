"use strict";

// cellmodel-cpm-test-operator-ancestorAnyInStep/index.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "4_rZ65rORrOEYJTCl5mOEQ",
  name: "CPM Ancestor Processes Any In Step Operator Test Model",
  description: "A model to test CPM ancestor processes any in step operator.",
  apm: {
    id: "we5IUb__Smqwkl4ghRl3Lw",
    name: "CPM Ancestor Processes Any In Step Operator Test Process",
    description: "A process to test CPM ancestor processes any in step operator.",
    steps: {
      uninitialized: {
        description: "Default step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_ancestor_processes_any_in_step_1"
        }]
      },
      wait_for_ancestor_processes_any_in_step_1: {
        description: "Wait for any ancestor processes to be in any of the specified process step(s).",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  ancestorProcessesAnyInStep: {
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
        description: "One or more ancestor processes are at the expected process step."
      }
    }
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;