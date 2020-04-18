"use strict";

// holodeck-method-constructor-input-spec.js
module.exports = {
  ____label: "Holodeck Constructor Request",
  ____types: "jsObject",
  id: {
    ____label: "Holodeck ID",
    ____accept: "jsString"
  },
  name: {
    ____label: "Holodeck Name",
    ____accept: "jsString"
  },
  description: {
    ____label: "Holodeck Description",
    ____accept: "jsString"
  },
  logRootDir: {
    ____label: "Log Root Directory",
    ____description: "Local filesystem directory path that holodeck should use to store its evaluation log output.",
    ____accept: "jsString"
  },
  holodeckHarnesses: {
    ____label: "Holodeck Harness Filters",
    ____description: "An array of previously-constructed holodeck harness filters (minimum of two required).",
    ____types: "jsArray",
    ____defaultValue: [],
    holdeckHarness: {
      ____label: "HolodeckHarness Instance",
      ____description: "A reference to a previously-constructed HolodeckHarness class instance.",
      ____opaque: true
    }
  }
};