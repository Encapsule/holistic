"use strict";

(function () {
  var holarchy = require("@encapsule/holarchy");

  var cellModel = new holarchy.CellModel({
    id: "ohYkHRbMQKSjUy_qER6TGg",
    name: "cm-test-wrapper-A CellModel (CM)",
    description: "A simple cell w/a top-level (1) cell process proxy helper.",
    apm: {
      id: "N6y8PUKiQ_yaW-0vDsQVhA",
      name: "cm-test-wrapper-A AbstractProcessModel (APM)",
      description: "A simple cell w/a top-level (1) cell process proxy helper.",
      ocdDataSpec: {
        ____types: "jsObject",
        ____defaultValue: {},
        proxy: holarchy.appTypes.helperCells.cellProcessProxy
      }
    }
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();