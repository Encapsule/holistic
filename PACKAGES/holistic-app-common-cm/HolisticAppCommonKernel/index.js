"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "74npOB-3S8GEgHwdtWwHrg",
  name: "Holistic App Common Kernel",
  description: "Provides core kernel cell process models shared by the holistic app server and holistic app client application cell models.",
  subcells: [require("./AppMetadata"), require("./ViewThemeProcessor")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;