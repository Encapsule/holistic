"use strict";

// cellmodel-cpm-test-operator-parentProcessActive.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "mLTbOO97TtixSbKl8VB7gQ",
  name: "CPM Parent Process Active Operator Test Model",
  description: "A model to test CPM parent process active operator.",
  apm: {
    id: "kAuEmZA9Qn24PEZLBygGyA",
    name: "CPM Parent Process Active Operator Test Process",
    description: "A process to test CPM parent process active operator.",
    steps: {
      uninitialized: {
        description: "Default step",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_parent_process_1"
        }]
      },
      wait_for_parent_process_1: {
        description: "Wait for parentdant process active.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  parentProcessActive: {}
                }
              }
            }
          },
          nextStep: "test_pass_1"
        }]
      },
      test_pass_1: {
        description: "The test process has detected that its parent is active (meaningless actually until we filter by APM)."
      }
    }
  },
  subcells: []
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;