"use strict";

// vector-set-app-client-runtime.js
var clientCM = require("@encapsule/holistic-app-client-cm");

var response = clientCM.cml.getArtifact({
  id: "ENENGxq1TkCa6Sk9YXaLlw",
  type: "CM"
});

if (response.error) {
  throw new Error(response.error);
}

var HolisticAppClientRuntime = response.result;
module.exports = [{
  id: "sThxzN9-QuKCgErSNYhcQQ",
  name: "Holistic App Client Runtime CellModel Test",
  description: "Instantiate the Holistic App Client Runtime CellModel through the CellModel test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: HolisticAppClientRuntime
        }
      }
    }
  }
}];