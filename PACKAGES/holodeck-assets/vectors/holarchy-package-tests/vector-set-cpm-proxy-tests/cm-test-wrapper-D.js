"use strict";

(function () {
  var holarchy = require("@encapsule/holarchy");

  var cellModel = new holarchy.CellModel({
    id: "grceuAi6RXyWEizRMSMIGQ",
    name: "cm-test-wrapper-D CellModel (CM)",
    description: "Includes a cm-test-wrapper-C cell as a helper.",
    apm: {
      id: "iNPXCgKERFmORVJn2ytmqg",
      name: "cm-test-wrapper-D AbstractProcessModel (APM)",
      description: "Includes a cm-test-wrapper-D cell as a helper.",
      ocdDataSpec: {
        ____types: "jsObject",
        ____defaultValue: {},
        wrapperC: {
          ____types: "jsObject",
          ____appdsl: {
            apm: "xStE95jnR6u1IJeLznmyxw"
          } // APM for cm-test-wrapper-C

        }
      }
    },
    subcells: [require("./cm-test-wrapper-C")]
  });

  if (!cellModel.isValid()) {
    throw new Error(cellModel.toJSON());
  }

  module.exports = cellModel;
})();