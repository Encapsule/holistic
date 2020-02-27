"use strict";

var clientSML = require("@encapsule/holistic-app-client-sml");

module.exports = [{
  id: "7Hehip1DT5Kn0QEyEJMPhA",
  name: "Holistic App Client CellModel Test",
  description: "Instantiate HolisticAppClient CellModel through the CellModel test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: clientSML.cml
        }
      }
    }
  }
}]; // holodeck vector set