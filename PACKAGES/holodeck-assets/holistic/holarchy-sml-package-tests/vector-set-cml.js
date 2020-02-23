"use strict";

// vector-set-cml (CellModel Library)
var HolarchyCML = require("@encapsule/holarchy-sml").HolarchyCML; // TODO: Rename the module


module.exports = [{
  id: "kSrV2fJ_S-aXkSmJwxYpDQ",
  name: "@encapsule/holarchy-sml CellModel Export Test",
  description: "Attempt to instantiate the exported CML using the CellModel harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: {
            id: "kSrV2fJ_S-aXkSmJwxYpDQ",
            name: "@encapsule/holarchy-sml CellModel Export Test",
            description: "Attempt to instantiate the exported CML using the CellModel harness.",
            subcells: [HolarchyCML]
          }
        }
      }
    }
  }
}];