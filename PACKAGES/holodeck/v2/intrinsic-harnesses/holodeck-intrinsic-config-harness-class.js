"use strict";

var HolodeckHarness = require("../HolodeckHarness");

var configHarnessClass = new HolodeckHarness({
  createConfigHarness: {
    id: "bSx3jlWlSqSOBzlsIHvHZg",
    name: "Class",
    description: "Configures program for testing a specific class.",
    configCommandSpec: {
      ____types: "jsObject",
      "class": {
        ____types: "jsObject",
        className: {
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

if (!configHarnessClass.isValid()) {
  throw new Error(configHarnessClass.toJSON());
}

module.exports = configHarnessClass;