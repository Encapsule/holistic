"use strict";

// vector-set-d2r2-react-processor.js
var holarchy = require("@encapsule/holarchy");

var clientSML = require("@encapsule/holistic-app-client-sml");

module.exports = [{
  id: "zUoUas3CTj2HLDfpNf4NTw",
  name: "d2r2/React Client Output Processor OPM #1",
  description: "Attempt to instantiate the current d2r2/React Client Display Adaptor OPM declaration via our test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessModel: {
          constructorRequest: clientSML.client.test.declaration.d2r2ReactClientDisplayAdaptor
        }
      }
    }
  }
}, {
  id: "fzuITg9BQbyV7jNv39Gv6w",
  name: "d2r2/React Client Output Processor OPC #1",
  description: "Attempt to apply the d2r2/React Client Display Adaptor OPM inside of an OPC instance.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "fzuITg9BQbyV7jNv39Gv6w",
            name: "d2r2/React Client Display Adaptor OPC #1",
            description: "Attempt to apply the d2r2/React Client Display Adaptor OPM inside of an OPC instance.",
            ocdTemplateSpec: {
              ____types: "jsObject",
              d2r2ReactClientOutputProcessor: {
                ____types: "jsObject",
                ____appdsl: {
                  opm: "IxoJ83u0TXmG7PLUYBvsyg"
                }
              }
            },
            observableProcessModelSets: [[clientSML.common.models.core.observableFrameLatch, clientSML.client.models.d2r2ReactClientDisplayAdaptor]],
            transitionOperatorSets: [clientSML.common.operators.logical],
            controllerActionSets: [clientSML.common.actions.ocd, clientSML.client.actions.d2r2ReactClientDisplayAdaptor]
          }
        },
        actionRequest: []
      }
    }
  }
}];