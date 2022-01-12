"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "HxQv-J55RxyrI1TtPHnRQw",
  name: "Dummy Process B Cell Model",
  description: "A simple cell model that carries a regressive APM for testing various CPM actions and operators.",
  apm: {
    id: "ZnfGUUudRxKohSuLFD1_sw",
    name: "Dummy Process B Process",
    description: "Implements a trivial cell process that does nothing."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;