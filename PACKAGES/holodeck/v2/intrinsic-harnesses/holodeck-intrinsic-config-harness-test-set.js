"use strict";

// holodeck-intrinsic-config-harness-test-set.js
var HolodeckHarness = require("../HolodeckHarness");

var configHarnessTestSet = new HolodeckHarness({
  createConfigHarness: {
    id: "acKR_j0ARJq2oy0SyoADpg",
    name: "Test Set",
    description: "Define a set of related programRequests (typically test harness request(s)).",
    configCommandSpec: {
      ____types: "jsObject",
      testSet: {
        ____types: "jsObject",
        testSetName: {
          ____accept: "jsString"
        },
        programRequest: {
          ____accept: ["jsObject", "jsArray", "jsNull"],
          ____defaultValue: null // missing sub-programRequest

        }
      }
    },
    configPluginBodyFunction: function configPluginBodyFunction(harnessRequest_) {
      return {
        error: "Not implemented."
      };
    }
  }
}); //  This is an intrinsic config harness. It has to be valid.

if (!configHarnessTestSet.isValid()) {
  throw new Error(configHarnessTestSet.toJSON());
}

module.exports = configHarnessTestSet;