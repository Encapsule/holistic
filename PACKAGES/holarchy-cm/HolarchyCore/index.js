"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.CellModel({
  id: "MDVBKW89TvO9T62Ge7GmNg",
  name: "Holarchy Core",
  description: "Holarchy core operations and actions for building derived CellModels.",
  subcells: [require("./HolarchyCoreCell"), require("./HolarchyCoreLogic"), require("./HolarchyCoreMemory")]
});