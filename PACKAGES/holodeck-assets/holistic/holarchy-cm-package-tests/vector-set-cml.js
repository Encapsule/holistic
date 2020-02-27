"use strict";

// vector-set-cml (CellModel Library)
var HolarchyCM = require("@encapsule/holarchy-cm"); // TODO: Rename the module


module.exports = [{
  id: "kSrV2fJ_S-aXkSmJwxYpDQ",
  name: "@encapsule/holarchy-cm CellModel Export Test",
  description: "Attempt to instantiate the exported CML using the CellModel harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "kSrV2fJ_S-aXkSmJwxYpDQ",
            name: "@encapsule/holarchy-cm CellModel Export Test",
            description: "Attempt to instantiate the exported CML using the CellModel harness.",
            subcells: [HolarchyCM.cml]
          }
        }
      }
    }
  }
}];