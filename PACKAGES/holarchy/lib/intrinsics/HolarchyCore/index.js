"use strict";

var CellModel = require("../../../CellModel");

var cellModel = new CellModel({
  id: "MDVBKW89TvO9T62Ge7GmNg",
  name: "Holarchy Core Actions & Operators",
  description: "Low-level glue models, actions, and operators for building re-usable infrastructure for execution within an ObservableProcessController (OPC) runtime host instance.",
  subcells: [require("./HolarchyCoreLogic"), require("./HolarchyCoreMemory"), require("./HolarchyCoreUtil")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;