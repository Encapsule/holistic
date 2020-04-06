"use strict";

// holodeck-harness-method-constructor-config-harness-input-spec.js
module.exports = {
  ____types: "jsObject",
  createConfigHarness: {
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
    // programRequest = { id, name, description, config: { ...configCommandSpec } }
    configCommandSpec: {
      ____accept: "jsObject" // this is a filter specification

    },
    configPluginBodyFunction: {
      ____label: "Config Plug-in bodyFunction",
      ____description: "Some specific program configuration operation.",
      ____accept: "jsFunction"
    },
    configPluginResultSpec: {
      ____accept: "jsObject",
      // this is a filter specification
      ____defaultValue: {
        // Most config harnesses modify context and return no result.
        ____accept: "jsUndefined"
      }
    }
  }
};