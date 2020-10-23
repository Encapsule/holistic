"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "JatYSE8JQj6GxT8AOsbssQ",
  name: "Holistic App Client Kernel",
  description: "Provides core HTML5 client application runtime kernel services as an extensible celluar process.",
  subcells: [require("./AppClientRuntime"), // manages the overall lifespan of the HTML5 client application.
  require("./AppClientDOMLocation"), // manages the application's interface between the DOM href and hashrouter locations and the state of the cellular runtime process.
  require("./AppClientView"), // provides high-level orchestration for lifespan of application-specific subview processes (a concept we haven't discussed yet).
  require("./AppClientDisplayAdapter") // encapsules low level details of rendering HTML5 view via @encapsule/d2r2 and Facebook React on behalf of AppClientView.
  ]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;