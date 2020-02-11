"use strict";

// vector-set-dom-location-processor.js
var clientSML = require("@encapsule/holistic-app-client-sml");

module.exports = [{
  id: "y3Jy2d56QI63admJOy1tZw",
  name: "DOM Location Processor OPM #1",
  description: "Attempt to instantiate the current DOM Location Processor OPM via our test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessModel: {
          constructorRequest: clientSML.client.test.declaration.DOMLocationProcessor
        }
      }
    }
  }
}];