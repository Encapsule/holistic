"use strict";

// vector-set-app-client-runtime.js
var clientSML = require("@encapsule/holistic-app-client-sml");

var response = clientSML.cml.getArtifact({
  id: "ENENGxq1TkCa6Sk9YXaLlw",
  type: "CM"
});

if (response.error) {
  throw new Error(response.error);
}

var HolisticAppClientRuntime = response.result;
module.exports = [{
  id: "sThxzN9-QuKCgErSNYhcQQ",
  name: "Holistic App Client APM #1",
  description: "Attempt to instantiate the current App Client Runtime APM via our test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        AbstractProcessModel: {
          constructorRequest: HolisticAppClientRuntime.getArtifact({
            id: "PPL45jw5RDWSMNsB97WIWg",
            type: "APM"
          }).result
        }
      }
    }
  }
}, // TODO: Finish or remove this
{
  id: "Va0br1teR9Ce348EfkUAdg",
  name: "Holistic App Client APM ControllerAction: Hook Events",
  description: "Attempt to instantiate ControllerAction Hook Events via our test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        // TODO: Finish this? Or, not w/software model definition and a new harneess?
        // The issue is keeping track of all the plug-ins and there definitions and
        // who belongs to what and who should be tested with whom and how... This is
        // already taking too long per iteration. A software model will allow me
        // to aggregate the declarations, and automate construction of derived OPC
        // defintion (saves developers a ton of time). And, we can write a harness
        // that uses all the declarations cached in models to call the smaller
        // holarchy test harnesses we've already got...
        ControllerAction: {}
      }
    }
  }
}];