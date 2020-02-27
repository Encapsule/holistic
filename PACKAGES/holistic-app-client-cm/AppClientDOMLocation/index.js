"use strict";

var holarchy = require("@encapsule/holarchy");

var holarchyCML = require("@encapsule/holarchy-cm");

module.exports = new holarchy.CellModel({
  id: "qzMWhMstQ4Ki06O75y5hMA",
  name: "DOM Location Processor",
  description: "Abstracts monitoring and setting the window.location and hashroute.",
  apm: require("./AbstractProcessModel-dom-location-processor"),
  actions: [require("./ControllerAction-dom-location-processor-initialize"), require("./ControllerAction-dom-location-processor-sink-event-hashchange")],
  subcells: [holarchyCML.cml]
});