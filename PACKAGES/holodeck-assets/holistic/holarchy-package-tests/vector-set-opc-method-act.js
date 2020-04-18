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
            description: "Dispatch an OPC.act method with a valid request and no registered controller actions."
          },
          actRequests: [{
            actorName: "Test Vector mm9htD2iSuyVAPm9SFv-qw",
            actorTaskDescription: "See what happens when I call OPC.act method with a valid request signature and no controller action plug-ins registered.",
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
  name: "OPC.act dispatch #3",
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
            actorTaskDescription: "Attempt to call into a registered ControllerAction plug-in.",
            actionRequest: {
              noop1: true
            }
          }]
        }
      }
    }
  }
}, {
  id: "eyJdms-IQR-_ebGiXP308g",
  name: "OPC.act dispatch #4",
  description: "Dispatch OPC.act method with a valid request that invokes a ControllerAction that returns a result value.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "eyJdms-IQR-_ebGiXP308g",
            name: "OPC.act dispatch #4",
            description: "Dispatch OPC.act method with a valid request that invokes a ControllerAction that returns a result value.",
            controllerActionSets: [fixture_ACTExamples]
          },
          actRequests: [{
            actorName: "Test Vector eyJdms-IQR-_ebGiXP308g",
            actorTaskDescription: "Attempt to call NOOP Controller Action #4 xhOHH7qqQCira4Cz3ZVG_Q",
            actionRequest: {
              noop3: {
                CONSPICUOUS_VALUE_PASSED_BY_ACTOR: "Hello, this is an actor-supplied value to be returned via the response.result by the ControllerAction."
              }
            }
          }]
        }
      }
    }
  }
}, {
  id: "vHzKNXxvS8Sp-LpbJ5NlUQ",
  name: "OPC.act dispatch #5",
  description: "Dispatch OPC.act method with valid request that invokes a ControllerAction that calls a ControllerAction to to check return value handling.",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "vHzKNXxvS8Sp-LpbJ5NlUQ",
            name: "OPC.act dispatch #5",
            description: "Dispatch OPC.act method with valid request that invokes a ControllerAction that calls a ControllerAction to to check return value handling.",
            controllerActionSets: [fixture_ACTExamples]
          },
          actRequests: [{
            actorName: "Test Vector vHzKNXxvS8Sp-LpbJ5NlUQ",
            actorTaskDescription: "Attempt to  call chain action #1 Zll03EOdQ-G6Q7UEEuAycg.",
            actionRequest: {
              chainer1: true
            }
          }]
        }
      }
    }
  }
}];