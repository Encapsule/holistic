"use strict";

// vector-set-app-client-view.js
var clientSML = require("@encapsule/holistic-app-client-sml");

var response = clientSML.cml.getArtifact({
  id: "vrmv3WMRQXql7Bx3DDEIDw",
  type: "CM"
});

if (response.error) {
  throw new Error(response.error);
}

var HolisticAppClientView = response.result; // TODO: We won't me maintaining these low level vectors by hand anymore... We'll instead focus on CellModel harness and automate all this.

module.exports = [{
  id: "VyQv8NaWTAuoY0daxO9mzQ",
  name: "Client App View OPM #1",
  description: "Attempt to instantiate the current App Client View OPM via our test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        AbstractProcessModel: {
          constructorRequest: HolisticAppClientView.getArtifact({
            id: "Hsu-43zBRgqHItCPWPiBng",
            type: "APM"
          }).result
        }
      }
    }
  }
}];