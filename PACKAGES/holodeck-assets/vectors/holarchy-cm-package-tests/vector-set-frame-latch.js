"use strict";

var holarchy = require("@encapsule/holarchy");

var cm = require("@encapsule/holarchy-cm");
/*
  id: "U5iIpgd8SHCk7pvaciVLTQ",
  name: "Holarchy Base Memory Mailbox Flag",
  description: "A primitive cell process that signals (via process step transition) when some actor has put a message in the mailbox namespace.",
*/


var response = cm.cml.getArtifact({
  id: "U5iIpgd8SHCk7pvaciVLTQ",
  type: "CM"
});

if (response.error) {
  throw new Error(response.error);
}

var cmMailboxFlag = response.result; // @encapsule/holodeck test vector set:

module.exports = [{
  id: "sO15Cox_SVqcCgyrOllAwQ",
  name: "Frame Latch OPM Test #1",
  description: "Run our Observable Frame Latch OPM declaration through the OPM test harness.",
  vectorRequest: {
    holistic: {
      holarchy: {
        AbstractProcessModel: {
          constructorRequest: cmMailboxFlag.getArtifact({
            id: "z_mTe02hSWmaM1iRO1pBeA",
            type: "APM"
          }).result
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
                  apm: "z_mTe02hSWmaM1iRO1pBeA"
                },
                value: {
                  ____accept: "jsString",
                  ____defaultValue: "default"
                }
              }
            },
            abstractProcessModelSets: [cmMailboxFlag.getCMConfig({
              type: "APM"
            }).result],
            transitionOperatorSets: [cmMailboxFlag.getCMConfig({
              type: "TOP"
            }).result],
            controllerActionSets: [cmMailboxFlag.getCMConfig({
              type: "ACT"
            }).result]
          },
          actRequests: [{
            actorName: "uZN6-qpIQO6CkwmLDWtMCw test action call",
            actorDescription: "A simple attempt to set a frame latch value.",
            actionRequest: {
              holarchy: {
                cm: {
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