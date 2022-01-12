"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "eNWDTsZ1Rt-wmgxPID6hTA",
  name: "Dummy Process C Cell Model",
  description: "A simple cell model that carries a regressive APM for testing various CPM actions and operators.",
  apm: {
    id: "9yyLMK1QQwuUCFYrZ736pA",
    name: "Dummy Process C Process",
    description: "Implements a trivial cell process that does nothing."
  }
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;