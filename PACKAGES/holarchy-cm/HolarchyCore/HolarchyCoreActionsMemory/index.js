"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.CellModel({
  id: "sedoxzVCQk-AR82lGi-gNw",
  name: "Holarchy Core Memory Actions",
  description: "A collection of ControllerAction plug-ins that implement low-level operations on shared cell process memory.",
  actions: [require("./ControllerAction-ocd-clear-boolean-flag"), require("./ControllerAction-ocd-set-boolean-flag"), require("./ControllerAction-ocd-read-namespace-indirect")]
});