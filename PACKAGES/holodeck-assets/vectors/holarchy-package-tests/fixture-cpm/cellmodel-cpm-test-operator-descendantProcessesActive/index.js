"use strict";

// cellmodel-cpm-test-operator-descendantProcessesActive.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "L0L3o-vqTOOli8Lio96e8w",
  name: "CPM Descendant Processes Active Operator Test Model",
  description: "A model to test the descendant processes active operator.",
  apm: {
    id: "cYpoxyyZSwm19CqH3v7eLQ",
    name: "CPM Descendant Processes Active Operator Test Process",
    description: "A process to test the descendant processes active operator.",
    steps: {
      uninitialized: {
        description: "Default step",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_descendant_processes_1"
        }]
      },
      wait_for_descendant_processes_1: {
        description: "Wait for descendant process(es) active.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  descendantProcessesActive: {}
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