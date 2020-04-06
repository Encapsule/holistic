"use strict";

// holodeck-intrinsic-config-subsystem-set.js
var HolodeckHarness = require("../HolodeckHarness");

var configHarnessVectorSet = new HolodeckHarness({
  createConfigHarness: {
    id: "fg0ohNe8Qx-sbc4mcPgcoA",
    name: "Subsystem",
    description: "Configures a named application/service subsystem.",
    configCommandSpec: {
      ____types: "jsObject",
      subsystem: {
        ____types: "jsObject",
        subsystemName: {
          ____accept: "jsString"
        },
        programRequest: {
          ____accept: ["jsObject", "jsArray", "jsNull"],
          ____defaultValue: null
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

if (!configHarnessVectorSet.isValid()) {
  throw new Error(configHarnessVectorSet.toJSON());
}

module.exports = configHarnessVectorSet;