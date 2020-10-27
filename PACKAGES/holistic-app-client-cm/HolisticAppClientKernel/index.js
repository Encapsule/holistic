"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "JatYSE8JQj6GxT8AOsbssQ",
  name: "Holistic App Client Kernel",
  description: "Holistic app client kernel process manages the overall lifecycle of a derived HTML5 client application defined as a directed graph of active cell processes executing within a CellProcessor instance in the browser tab.",
  apm: require("./AbstractProcessModel-app-client-kernel"),
  actions: [require("./ControllerAction-app-client-kernel-hook-events"), require("./ControllerAction-app-client-kernel-notify-event"), require("./ControllerAction-app-client-kernel-signal-lifecycle-event")],
  subcells: [require("./AppClientDOMLocation"), // Manages the application's interface between the DOM href and hashrouter locations and the state of the cellular runtime process.
  require("./AppClientDisplayAdapter"), // Encapsules low level details of rendering HTML5 view via @encapsule/d2r2 and Facebook React on behalf of AppClientView.
  require("./AppClientView"), // Provides high-level orchestration for lifespan of application-specific subview processes (a concept we haven't discussed yet).
  require("@encapsule/holistic-app-common-cm").cml, // Shared holistic app server/client kernel CellModel library.
  require("@encapsule/holarchy-cm").cml // Low-level shared CellModel library used by @encapsule/holistic RTL's.
  ]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;