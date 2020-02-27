"use strict";

// @encapsule/holistic-app-client-cm/lib/index.js
var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.CellModel({
  id: "JatYSE8JQj6GxT8AOsbssQ",
  name: "Holistic App Client Processor",
  description: "Provides extensible HTML5 client application runtime kernel for derived holistic client applications.",
  subcells: [require("./AppClientDisplayAdapter"), require("./AppClientDOMLocation"), require("./AppClientRuntime"), require("./AppClientView")]
});