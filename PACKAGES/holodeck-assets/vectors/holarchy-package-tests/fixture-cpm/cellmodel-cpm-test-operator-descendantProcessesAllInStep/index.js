"use strict";

// cellmodel-cpm-test-operator-descendantProcessesAllInStep/index.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "DXfqoTLmRzi-IloxkIFbRQ",
  name: "CPM Descendant Processes All In Step Operator Test Model",
  description: "A model to test the CPM descendant processes all in step operator.",
  apm: {
    id: "XzNJP6LyTCOnhGPKpJIjzg",
    name: "CPM Descendant Processes ALl In Step Operator Test Process",
    description: "A process to test the CPM descendant processes in step operator.",
    steps: {
      uninitialized: {
        description: "Default",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_descendant_processes_all_in_step_1"
        }]
      },
      wait_for_descendant_processes_all_in_step_1: {
        description: "Wait for active descendant process(es) all in step.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  descendantProcessesAllInStep: {
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
        description: "All descendant processes have reached the desired step(s)."
      }
    }
  },
  subcells: [require("../cellmodel-dummy-A")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;