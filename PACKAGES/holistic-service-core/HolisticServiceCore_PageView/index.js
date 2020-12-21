"use strict";

var holarchy = require("@encapsule/holarchy");

var cellModel = new holarchy.CellModel({
  id: "xJo0dbx0QDiChFL5xQ6z4A",
  name: "Page View Model",
  description: "A PageView cell updates the display adapter upon activation by the PageViewController using information obtained from metadata. Subsequently, it handles shared memory, request parsing, and message routing between a dynamic sets of active cells (could be anything) and a dynamic set of display processes (React.Elements).",
  apm: require("./AbstractProcessModel-page-view"),
  actions: [require("./ControllerAction-page-view-step-worker"), require("./ControllerAction-page-view-update-hashroute-query")]
});

if (!cellModel.isValid()) {
  throw new Error(cellModel.toJSON());
}

module.exports = cellModel;