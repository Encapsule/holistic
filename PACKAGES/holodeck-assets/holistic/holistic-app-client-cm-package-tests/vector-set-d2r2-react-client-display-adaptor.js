"use strict";

// v0.0.49-spectrolite
// vector-set-d2r2-react-processor.js
var holarchy = require("@encapsule/holarchy");

var clientCM = require("@encapsule/holistic-app-client-cm");

if (!clientCM.cml.isValid()) {
  throw new Error(clientCM.cml.toJSON());
}

var response = clientCM.cml.getArtifact({
  id: "UX7JquBhSZO0QyEk7u9-sw",
  type: "CM"
});

if (response.error) {
  throw new Error(response.error);
}

var HolisticAppClientDisplayAdapter = response.result;
module.exports = [{
  id: "D9E7--YgRqWfqoQFz7Ckfg",
  name: "d2r2/React Client Display Adaptor CellModel Test",
  description: "Send the current version of the d2r2/React Client Display Adapter CellModel through the CellModel test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        CellModel: {
          constructorRequest: HolisticAppClientDisplayAdapter
        }
      }
    }
  }
}, {
  id: "fzuITg9BQbyV7jNv39Gv6w",
  name: "d2r2/React Client Output Processor OPC #1",
  description: "Attempt to apply the d2r2/React Client Display Adaptor APM inside of an OPC instance.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "fzuITg9BQbyV7jNv39Gv6w",
            name: "d2r2/React Client Display Adaptor OPC #1",
            description: "Attempt to apply the d2r2/React Client Display Adaptor APM inside of an OPC instance.",
            ocdTemplateSpec: {
              ____types: "jsObject",
              d2r2ReactClientOutputProcessor: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  apm: "IxoJ83u0TXmG7PLUYBvsyg"
                }
              }
            },
            abstractProcessModelSets: [HolisticAppClientDisplayAdapter.getCMConfig({
              type: "APM"
            }).result],
            transitionOperatorSets: [HolisticAppClientDisplayAdapter.getCMConfig({
              type: "TOP"
            }).result],
            controllerActionSets: [HolisticAppClientDisplayAdapter.getCMConfig({
              type: "ACT"
            }).result]
          }
        },
        actionRequest: []
      }
    }
  }
}];