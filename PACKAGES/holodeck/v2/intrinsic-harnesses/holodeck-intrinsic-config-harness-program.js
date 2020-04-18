"use strict";

// holodeck-intrinsic-config-harness-program.js
var HolodeckHarness = require("../HolodeckHarness");

var configHarnessProgram = new HolodeckHarness({
  createConfigHarness: {
    id: "FDCaCMlJSLaBGeOlcbODIw",
    name: "Logger",
    description: "Configures logging options for a holodeck subprogram.",
    configCommandSpec: {
      ____types: "jsObject",
      logger: {
        ____types: "jsObject",
        options: {
          ____types: "jsObject",
          // TODO: extend definition as required
          ____defaultValue: {}
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
});

if (!configHarnessProgram.isValid()) {
  throw new Error(configHarnessProgram.toJSON());
}

module.exports = configHarnessProgram;