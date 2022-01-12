"use strict";

// fixture-cell-process-tests-1.js
var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "6GaLWSE-RDi87oMnsTpXow",
  name: "Cell Process Test Fixture Model",
  description: "Used to test cell processor.",
  apm: {
    id: "itgXQ5RWS66fcdsuZim8AQ",
    name: "Cell Process Test Fixture Model",
    description: "A CellModel instance that aggregates several other small test CellModels. Used for testing CellProcessor process create, delete, and query actions.",
    steps: {
      uninitialized: {
        description: "Default starting step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "create_child_processes"
        }]
      },
      create_child_processes: {
        description: "Attempt to create a number of child processes.",
        actions: {
          enter: [{
            CellProcessor: {
              process: {
                activate: {},
                processCoordinates: {
                  apmID: "Q15zOx5FT-2vt1jSKIIOLQ",
                  instanceName: "Child Process #1"
                }
              }
            }
          }, {
            CellProcessor: {
              process: {
                activate: {},
                processCoordinates: {
                  apmID: "CW2q-O_CQ0CObmLa1PWb3g",
                  instanceName: "Child Process #2"
                }
              }
            }
          }, {
            CellProcessor: {
              process: {
                activate: {},
                processCoordinates: {
                  apmID: "l_CypcNERjOcr7SxzIGt8A",
                  instanceName: "Child Process #3"
                }
              }
            }
          }]
        },
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "ready"
        }]
      },
      ready: {}
    }
  },
  subcells: [{
    id: "5pHyXwfbSbmywdCLxAGpVA",
    name: "Test Model #1",
    description: "Test model #1.",
    apm: {
      id: "Q15zOx5FT-2vt1jSKIIOLQ",
      name: "Test Model #1 Process",
      description: "A simple test APM."
    }
  }, {
    id: "InBPBIpDRW6XTf8XvH93dw",
    name: "Test Model #2",
    description: "Test model #2.",
    apm: {
      id: "CW2q-O_CQ0CObmLa1PWb3g",
      name: "Test Model #2 Process",
      description: "A simple test APM."
    }
  }, {
    id: "1OnxzbEeTEiANHWD1bcD-w",
    name: "Test Model #3",
    description: "Test model #3.",
    apm: {
      id: "l_CypcNERjOcr7SxzIGt8A",
      name: "Test Model #3",
      description: "A simple test APM."
    }
  }]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;