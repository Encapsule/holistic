"use strict";

var HolodeckHarness = require("../HolodeckHarness");

var configHarnessFilter = new HolodeckHarness({
  createConfigHarness: {
    id: "ytwqXMfeQEu0E9wsObpfDg",
    name: "Filter",
    description: "Configures program for testing a specific arccore.filter instance.",
    configCommandSpec: {
      ____types: "jsObject",
      filter: {
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

if (!configHarnessFilter.isValid()) {
  throw new Error(configHarnessFilter.toJSON());
}

module.exports = configHarnessFilter;