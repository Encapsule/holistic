"use strict";

// This module exports an @encapsule/holarchy Cell Model definition object.
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.CellModel({
  id: "orTbEFR_Q-u-qqEqP8OUBA",
  name: "Holarchy Core Cell",
  description: "Shared low-level TransitionOperator and ControllerAction's for interacting with cell processes running inside of an ObservableProcessController instance.",
  operators: [require("./TransitionOperator-apm-at-step")],
  actions: [require("./ControllerAction-cell-process-create")]
});