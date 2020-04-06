"use strict";

// holodeck-runner-input-spec.js
// Specifies the acceptable format for a request value sent to the holodeck runner filter.
module.exports = {
  ____types: "jsObject",
  id: {
    ____accept: "jsString"
  },
  name: {
    ____accept: "jsString"
  },
  description: {
    ____accept: "jsString"
  },
  logsRootDir: {
    // Fully-qualified local directory where the test runner will create JSON-format log files.
    ____accept: "jsString"
  },
  testHarnessFilters: {
    ____types: "jsArray",
    ____defaultValue: [],
    testHarnessFilter: {
      ____accept: "jsObject"
    } // test harness filter instance reference

  },
  testRunnerOptions: {
    ____types: "jsObject",
    ____defaultValue: {},
    onlyExecuteVectors: {
      ____types: ["jsNull", "jsArray"],
      ____defaultValue: null,
      vectorId: {
        ____accept: "jsString"
      }
    }
  },
  testRequestSets: {
    ____types: "jsArray",
    ____defaultValue: [],
    // TODO: Consider turning testRequestSet into a descriptor object w/id, name, description
    // and tagging eval logs (e.g. IRUT-concatentation) with the test set ID so that it's a
    // bit simpler to pickout vectors that belong to a logic test set in the eval logs.
    testRequestSet: {
      ____types: "jsArray",
      harnessRequest: {
        ____types: ["jsUndefined", "jsObject"],
        id: {
          ____accept: "jsString"
        },
        name: {
          ____accept: "jsString"
        },
        description: {
          ____accept: "jsString"
        },
        // expectedOutcome: { ____accept: "jsString", ____inValueSet: [ "pass", "fail" ] },
        vectorRequest: {
          ____accept: ["jsUndefined", "jsObject"]
        }
      }
    }
  }
};