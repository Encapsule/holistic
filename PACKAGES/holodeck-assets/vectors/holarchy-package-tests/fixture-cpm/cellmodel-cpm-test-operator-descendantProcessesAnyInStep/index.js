"use strict";

// cellmodel-cpm-test-operator-descendantProcessesAnyInStep/index.js
var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm").cml;

var cellModel = new holarchy.CellModel({
  id: "xbaDltz5S2m7Wes94Kx2pQ",
  name: "CPM Descendant Processes Any In Step Operator Test Model",
  description: "A model to test CPM descendant processes any in step operator.",
  apm: {
    id: "TR7suTjQSKOBK5bGKztIcg",
    name: "CPM Descendant Processes Any In Step Test Process",
    description: "A process to test CPM descendant processes any in step operator.",
    steps: {
      uninitialized: {
        description: "Default",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "wait_for_descendant_processes_any_in_step_1"
        }]
      },
      wait_for_descendant_processes_any_in_step_1: {
        description: "Wait for active descendant process(es) any in step.",
        transitions: [{
          transitionIf: {
            CellProcessor: {
              cell: {
                query: {
                  descendantProcessesAnyInStep: {
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
        description: "One or more descendant processes have reached the desired step(s)."
      }
    }
  },
  subcells: [require("../cellmodel-dummy-A")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;