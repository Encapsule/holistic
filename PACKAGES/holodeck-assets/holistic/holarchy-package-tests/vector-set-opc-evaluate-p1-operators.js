"use strict";

var holarchySML = require("@encapsule/holarchy-sml");

var fixtureOpmExamples = require("./fixture-opm-evaluate-p1-transition-operators");

var fixtureTopExamples = require("./fixture-top-examples");

module.exports = [{
  id: "l0vKq8yVRsm73LoMev8ItA",
  name: "OPC Evaluate Operator Test #1",
  description: "Test transition operator failure (no transition operators registered).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "l0vKq8yVRsm73LoMev8ItA",
            name: "OPC Operator Test #1",
            description: "Test transition operator failure (no transition operators registered).",
            ocdTemplateSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  opm: "_vC2O7DGTZ22R5hvxpy0WQ"
                }
              }
            },
            observableProcessModelSets: [fixtureOpmExamples]
          }
        }
      }
    }
  }
}, {
  id: "TenISiGcTG-06LhZuBzJNQ",
  name: "OPC Evaluate Operator Test #2",
  description: "Test transition operator failure (bad operator request message).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "TenISiGcTG-06LhZuBzJNQ",
            name: "OPC Operator Test #2",
            description: "Test transition operator failure (bad operator request message).",
            ocdTemplateSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  opm: "_vC2O7DGTZ22R5hvxpy0WQ"
                }
              }
            },
            observableProcessModelSets: [fixtureOpmExamples],
            transitionOperatorSets: [holarchySML.operators.logical]
          }
        }
      }
    }
  }
}, {
  id: "KGh0Va-oTXKPUZmnDG4QPQ",
  name: "OPC Evaluate Operator Test #3",
  description: "Test transition operator failure (bad operator returns transport error).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "KGh0Va-oTXKPUZmnDG4QPQ",
            name: "OPC Evaluate Operator Test #3",
            description: "Test transition operator failure (bad operator returns transport error).",
            ocdTemplateSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  opm: "SyCUD3kpQ8mtYbV5A_4BPA"
                }
              }
            },
            observableProcessModelSets: [fixtureOpmExamples],
            transitionOperatorSets: [holarchySML.operators.logical, fixtureTopExamples]
          }
        }
      }
    }
  }
}, {
  id: "rFcPAwRGRsOlJSXBZOdwNA",
  name: "OPC Evaluate Operator Test #4",
  description: "Test transition operator failure (bad operator throws exception from bodyFunction).",
  vectorRequest: {
    holistic: {
      holarchy: {
        ObservableProcessController: {
          constructorRequest: {
            id: "rFcPAwRGRsOlJSXBZOdwNA",
            name: "OPC Evaluate Operator Test #4",
            description: "Test transition operator failure (bad operator throws exception from bodyFunction).",
            ocdTemplateSpec: {
              ____types: "jsObject",
              test: {
                ____types: "jsObject",
                ____defaultValue: {},
                ____appdsl: {
                  opm: "Pkr1EErLSiiHQRt8gCaO0Q"
                }
              }
            },
            observableProcessModelSets: [fixtureOpmExamples],
            transitionOperatorSets: [holarchySML.operators.logical, fixtureTopExamples]
          }
        }
      }
    }
  }
}];