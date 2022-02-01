"use strict";

(function () {
  var holarchy = require("@encapsule/holarchy");

  var cellModel = new holarchy.CellModel({
    id: "F0OaXBmTS8GbylNiOanlww",
    name: "cm-test-wrapper-B CellModel (CM)",
    description: "Includes a cm-test-wrapper-A cell as a helper.",
    apm: {
      id: "jYMDrEcRSOalZc7zet4hrQ",
      name: "cm-test-wrapper-B AbstractProcessModel (APM)",
      description: "Includes a cm-test-wrapper-A cell as a helper.",
      ocdDataSpec: {
        ____types: "jsObject",
        ____defaultValue: {},
        wrapperA: {
          ____types: "jsObject",
          ____appdsl: {
            apm: "N6y8PUKiQ_yaW-0vDsQVhA"
          } // APM for cm-test-wrapper-A

        }
      }
    },
    subcells: [require("./cm-test-wrapper-A")]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();