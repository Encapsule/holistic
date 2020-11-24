"use strict";

// holistic-app-common-cellmodel-factory-input-spec.js
var appMetadataCellModelFactoryInputSpec = require("./app-metadata-cellmodel-factory-input-spec");

module.exports = {
  ____label: "Holistic App Common CellModel Factory Request",
  ____description: "A descriptor object that declares common configuration, and runtime details that are germane to both app server and app client processes.",
  ____types: "jsObject",
  appMetadata: appMetadataCellModelFactoryInputSpec // TODO: d2r2 common components

};