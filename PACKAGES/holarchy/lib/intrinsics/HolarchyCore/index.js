"use strict";

var CellModel = require("../../../CellModel");

module.exports = new CellModel({
  id: "MDVBKW89TvO9T62Ge7GmNg",
  name: "Holarchy Core",
  description: "Holarchy Core CellLibrary packages standard logic and shared memory cell process step transition operators and action plug-ins that are loaded automatically into every CellProcessor cellular process runtime environment instance.",
  subcells: [require("./HolarchyCoreCell"), require("./HolarchyCoreLogic"), require("./HolarchyCoreMemory")]
});