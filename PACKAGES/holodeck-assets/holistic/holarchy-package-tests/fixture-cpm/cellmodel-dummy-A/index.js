"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "fUQKrIPcQmingXFEQ4Pt9A",
  name: "Dummy Process A Cell Model",
  description: "A simple cell model that carries a regressive APM for testing various CPM actions and operators.",
  apm: {
    id: "3E27IH_CQeqBUFsGm4tIIA",
    name: "Dummy Process A Process",
    description: "Implements a trivial cell process that does nothing."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;