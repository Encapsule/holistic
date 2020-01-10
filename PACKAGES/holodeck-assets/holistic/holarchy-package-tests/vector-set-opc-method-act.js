"use strict";

var fixture_OPMExamples = require("./fixture-opm-evaluate-p1-transition-operators");

var fixture_ACTExamples = require("./fixture-act-examples");

module.exports = [{
  id: "AhfYIOp_RQmS-a37emkj9A",
  name: "OPC.act dispatch #1 (bad request)",
  description: "Dispatch an OPC.act method with a bad request and no registered controller actions.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "AhfYIOp_RQmS-a37emkj9A",
            name: "OPC.act dispatch #1 (bad request)",
            description: "Dispatch an OPC.act method with a bad request and no registered controller actions."
          },
          actRequests: [{
            bogus: "Our OPCi has no registered actions. So, by definition this request will result in an error."
          }]
        }
      }
    }
  }
}, {
  id: "mm9htD2iSuyVAPm9SFv-qw",
  name: "OPC.act dispatch #2",
  description: "Dispatch an OPC.act method with a valid request and no registered controller actions.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "mm9htD2iSuyVAPm9SFv-qw",
            name: "OPC.act dispatch #2",
            description: "Dispathc an OPC.act method with a valid request and no registered controller actions."
          },
          actRequests: [{
            actorName: "Test Vector mm9htD2iSuyVAPm9SFv-qw",
            actionDescription: "See what happens when I call OPC.act method with a valid request signature and no controller action plug-ins registered.",
            actionRequest: {
              bogus: "Still a bogus message. But, that doesn't matter because this isn't going to get dispatched in this example."
            }
          }]
        }
      }
    }
  }
}, {
  id: "pUxcxo9STsG3OMWWrREHoQ",
  name: "OPC.arc dispatch #3",
  description: "Dispatch on OPC.act method with valid request signature and registered test controller actions.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "pUxcxo9STsG3OMWWrREHoQ",
            name: "OPC.arc dispatch #3",
            description: "Dispatch on OPC.act method with valid request signature and registered test controller actions.",
            controllerActionSets: [fixture_ACTExamples]
          },
          actRequests: [{
            actorName: "Test Vector pUxcxo9STsG3OMWWrREHoQ",
            actionDescription: "Attempt to call into a registered ControllerAction plug-in.",
            actionRequest: {
              noop1: true
            }
          }]
        }
      }
    }
  }
}];