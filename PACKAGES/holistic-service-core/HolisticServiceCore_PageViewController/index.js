"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "NAmE-o9qQWuPmUl31A5lBw",
  name: "Page View Controller Model",
  description: "This cell is activated as a singleton to provide arbitration between incoming and outgoing PageView cell activations.",
  apm: require("./AbstractProcessModel-page-view-controller"),
  actions: [require("./ControllerAction-page-view-controller-udpate")],
  subcells: [require("../HolisticServiceCore_PageView")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;