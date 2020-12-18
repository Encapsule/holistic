"use strict";

var themeObjectSpecs = require("./iospecs/holistic-view-theme-object-specs");

var themeSettingsSpec = require("./iospecs/holistic-view-theme-settings-spec");

module.exports = {
  id: "zzvzLbm2RTyQN1lWFcjpVA",
  name: "Theme Processor Model",
  description: "Encapsulates the details of generating and updating current programmatic style settings consumed by client application view and display processes.",
  ocdDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    inputs: {
      ____types: "jsObject",
      ____defaultValue: {},
      version: {
        ____accept: "jsNumber",
        ____defaultValue: 0
      },
      themeSettings: themeSettingsSpec
    },
    outputs: {
      ____types: "jsObject",
      ____defaultValue: {},
      version: {
        ____accept: "jsNumber",
        ____defaultValue: -1
      },
      holisticAppTheme: themeObjectSpecs.holisticAppThemeSpec
    }
  }
};