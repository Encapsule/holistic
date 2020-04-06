"use strict";

var HolodeckHarness = require("../HolodeckHarness");

var configHarnessMethod = new HolodeckHarness({
  createConfigHarness: {
    id: "6KD9fsk9S-2xaxaVetFEFw",
    name: "Method",
    description: "Configures program for testing a specific class method.",
    configCommandSpec: {
      ____types: "jsObject",
      method: {
        ____types: "jsObject",
        filterName: {
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
});

if (!configHarnessMethod.isValid()) {
  throw new Error(configHarnessMethod.toJSON());
}

module.exports = configHarnessMethod;