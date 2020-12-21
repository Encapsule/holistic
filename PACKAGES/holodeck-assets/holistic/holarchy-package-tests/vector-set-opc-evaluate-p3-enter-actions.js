"use strict";

// vector-set-opc-evaluate-p3-enter-actions.js
var _require = require("@encapsule/holarchy"),
    HolarchyCore = _require.HolarchyCore;

var fixtureOpmExamples = require("./fixture-opm-evaluate-p3-enter-actions");

var fixtureActExamples = require("./fixture-act-evaluate-p2-exit-actions"); // reuse


module.exports = [{
  id: "Zu13opLlRwSmU2LHvEAHnA",
  name: "OPC Evaluate Enter Action Test #1",
  description: "Test controller action failure (no controller actions registered).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "Zu13opLlRwSmU2LHvEAHnA",
            name: "OPC Evaluate Enter Action Test #1",
            description: "Test controller action failure (no controller actions registered).",
            ocdTemplateSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  apm: "I3ja3B00Rj-PIXnDrzQzNg"
                }
              }
            },
            abstractProcessModelSets: [fixtureOpmExamples],
            transitionOperatorSets: [HolarchyCore.getCMConfig({
              type: "TOP"
            }).result],
            controllerActionSets: []
          }
        }
      }
    }
  }
}, {
  id: "HxrzwXDSTlWXQJ5XAMhgtA",
  name: "OPC Evaluate Enter Action Test #2",
  description: "Test controller action failure (bad request message).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "HxrzwXDSTlWXQJ5XAMhgtA",
            name: "OPC Evaluate Enter Action Test #2",
            description: "Test controller action failure (bad request message).",
            ocdTemplateSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  apm: "I3ja3B00Rj-PIXnDrzQzNg"
                }
              }
            },
            abstractProcessModelSets: [fixtureOpmExamples],
            transitionOperatorSets: [HolarchyCore.getCMConfig({
              type: "TOP"
            }).result],
            controllerActionSets: [fixtureActExamples]
          }
        }
      }
    }
  }
}, {
  id: "dcSJk7BZQ3qnlrgivMayUQ",
  name: "OPC Evaluate Enter Action Test #3",
  description: "Test controller action failure (bad action returns transport error).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "dcSJk7BZQ3qnlrgivMayUQ",
            name: "OPC Evaluate Enter Action Test #3",
            description: "Test controller action failure (bad action returns transport error).",
            ocdTemplateSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  apm: "71VGW5zbRLiDf7E_2tFJ3g"
                }
              }
            },
            abstractProcessModelSets: [fixtureOpmExamples],
            transitionOperatorSets: [HolarchyCore.getCMConfig({
              type: "TOP"
            }).result],
            controllerActionSets: [fixtureActExamples]
          }
        }
      }
    }
  }
}, {
  id: "SHneUm5GTDO--xVSUpL92Q",
  name: "OPC Evaluate Enter Action Test #4",
  description: "Test controller action failure (bad action throws exception).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "SHneUm5GTDO--xVSUpL92Q",
            name: "OPC Evaluate Enter Action Test #4",
            description: "Test controller action failure (bad action throws exception).",
            ocdTemplateSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  apm: "maPNVFgWTduQ5vMiDU2sEw"
                }
              }
            },
            abstractProcessModelSets: [fixtureOpmExamples],
            transitionOperatorSets: [HolarchyCore.getCMConfig({
              type: "TOP"
            }).result],
            controllerActionSets: [fixtureActExamples]
          }
        }
      }
    }
  }
}];