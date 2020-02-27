"use strict";

var clientCM = require("@encapsule/holistic-app-client-cm");

module.exports = [{
  id: "7Hehip1DT5Kn0QEyEJMPhA",
  name: "Holistic App Client CellModel Test",
  description: "Instantiate HolisticAppClient CellModel through the CellModel test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: clientCM.cml
        }
      }
    }
  }
}]; // holodeck vector set