"use strict";

// vector-set-dom-location-processor.js
var clientCM = require("@encapsule/holistic-app-client-cm");

var response = clientCM.cml.getArtifact({
  id: "qzMWhMstQ4Ki06O75y5hMA",
  type: "CM"
});

if (response.error) {
  throw new Error(response.error);
}

var HolisticAppClientDOMLocationProcessor = response.result;
module.exports = [{
  id: "y3Jy2d56QI63admJOy1tZw",
  name: "DOM Location Processor APM #1",
  description: "Attempt to instantiate the current DOM Location Processor APM via our test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: HolisticAppClientDOMLocationProcessor
        }
      }
    }
  }
}];