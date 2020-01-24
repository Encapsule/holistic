"use strict";

var holarchy = require("@encapsule/holarchy");

var sml = require("@encapsule/holarchy-sml"); // @encapsule/holodeck test vector set:


module.exports = [{
  id: "sO15Cox_SVqcCgyrOllAwQ",
  name: "Frame Latch OPM Test #1",
  description: "Run our Observable Frame Latch OPM declaration through the OPM test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessModel: {
          constructorRequest: sml.models.test.declaration.observableFrameLatch
        }
      }
    }
  }
}, {
  id: "uZN6-qpIQO6CkwmLDWtMCw",
  name: "OPC Frame Latch Test #1",
  description: "Try to apply the Frame Latch OPM in an OPC system.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "uZN6-qpIQO6CkwmLDWtMCw",
            name: "OPC Frame Latch Test #1",
            description: "Try to apply the Frame Latch OPM in an OPC system.",
            ocdTemplateSpec: {
              ____types: "jsObject",
              frameLatch: {
                ____types: "jsObject",
                ____appdsl: {
                  opm: "z_mTe02hSWmaM1iRO1pBeA"
                },
                value: {
                  ____accept: "jsString",
                  ____defaultValue: "default"
                }
              }
            },
            observableProcessModelSets: [[sml.models.core.observableFrameLatch]],
            transitionOperatorSets: [sml.operators.logical],
            controllerActionSets: [sml.actions.ocd]
          },
          actRequests: [{
            actorName: "uZN6-qpIQO6CkwmLDWtMCw test action call",
            actorDescription: "A simple attempt to set a frame latch value.",
            actionRequest: {
              holarchy: {
                sml: {
                  actions: {
                    frameLatch: {
                      write: {
                        path: "~.frameLatch",
                        value: "whatever"
                      }
                    }
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
}];