"use strict";

(function () {
  var holarchy = require("@encapsule/holarchy");

  var cellModel = new holarchy.CellModel({
    id: "vmikzrq6Rf23WSc7TuNnpA",
    name: "cm-test-wrapper-C CellModel (CM)",
    description: "Includes a cm-test-wrapper-B cell as a helper.",
    apm: {
      id: "xStE95jnR6u1IJeLznmyxw",
      name: "cm-test-wrapper-C AbstractProcessModel (APM)",
      description: "Includes a cm-test-wrapper-C cell as a helper.",
      ocdDataSpec: {
        ____types: "jsObject",
        ____defaultValue: {},
        wrapperB: {
          ____types: "jsObject",
          ____appdsl: {
            apm: "jYMDrEcRSOalZc7zet4hrQ"
          } // APM for cm-test-wrapper-B

        }
      }
    },
    subcells: [require("./cm-test-wrapper-B")]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();