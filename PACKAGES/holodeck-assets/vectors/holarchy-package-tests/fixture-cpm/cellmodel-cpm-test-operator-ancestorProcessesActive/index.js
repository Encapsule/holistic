"use strict";

// cellmodel-cpm-test-operator-ancestorProcessesActive/index.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "eu32xBRTSE2-B71HrwPFBg",
  name: "CPM Ancestor Processes Active Operator Test Model",
  description: "A model to test CPM ancestor active operator.",
  apm: {
    id: "hybdu0VoQjWnOFs5vC3Tzw",
    name: "CPM Ancestor Processes Active Operator Test Process",
    description: "A process to test CPM ancestor active operator.",
    steps: {
      uninitialized: {
        description: "Default cell process step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_ancestor_processes_active_1"
        }]
      },
      wait_for_ancestor_processes_active_1: {
        description: "Wait for active ancestor process(es).",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  ancestorProcessesActive: {}
                }
              }
            }
          },
          nextStep: "test_pass_1"
        }]
      },
      test_pass_1: {
        description: "The test process has detected that it has active ancestor process(es). Note that like parentProcessActive, ancestorProcessesActive is not super meaningful unless also filtered by APM binding ID."
      }
    }
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;