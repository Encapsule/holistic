"use strict";

// vector-set-app-client-view.js
var clientCM = require("@encapsule/holistic-app-client-cm");

var response = clientCM.cml.getArtifact({
  id: "vrmv3WMRQXql7Bx3DDEIDw",
  type: "CM"
});

if (response.error) {
  throw new Error(response.error);
}

var HolisticAppClientView = response.result;
module.exports = [{
  id: "VyQv8NaWTAuoY0daxO9mzQ",
  name: "Holistic Client App View CellModel Test",
  description: "Instantiate Holistic App Client View CellModel through the CellModel test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: HolisticAppClientView
        }
      }
    }
  }
}]; // holodeck vector set