"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "-mApjtHVTE2UpIANFJGaPQ",
  name: "Holistic App Common Kernel: App Metadata Model",
  description: "Provides consistent access/query API on derived-application-specific static metadata for all cells in a holistic application.",
  apm: require("./AbstractProcessModel-app-metadata"),
  actions: [require("./ControllerAction-app-metadata-init")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;