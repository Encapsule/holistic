"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "ABn1MUgSQT2dy8Lri8xDbA",
  name: "View Theme Processor",
  description: "The ViewThemeProcessor cell model provides a simple service for generating a Holistic App Theme JSON document used to dynamically style display elements via React.",
  apm: require("./AbstractProcessModel-ThemeProcessor"),
  actions: [require("./ControllerAction-read-theme"), require("./ControllerAction-write-theme-settings")],
  subcells: []
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;