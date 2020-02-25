"use strict";

// vector-set-dom-location-processor.js
var clientSML = require("@encapsule/holistic-app-client-sml");

var response = clientSML.cml.getArtifact({
  id: "qzMWhMstQ4Ki06O75y5hMA",
  type: "CM"
});

if (response.error) {
  throw new Error(response.error);
}

var HolisticAppClientDOMLocationProcessor = response.result;
module.exports = [
  /* DISABLE - WE WILL BE HANDING APM TESTING VIA THE CELLMODEL HARNESS
   {
      id: "y3Jy2d56QI63admJOy1tZw",
      name: "DOM Location Processor APM #1",
      description: "Attempt to instantiate the current DOM Location Processor APM via our test harness.",
      vectorRequest: {
          holistic: {
              holarchy: {
                  AbstractProcessModel: {
                      constructorRequest: clientSML.client.test.declaration.DOMLocationProcessor
                  }
              }
          }
      }
  }
   */
];