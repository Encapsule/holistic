"use strict";

// AbtractProcessModel-app-client-display-adapter.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var holarchyCM = require("@encapsule/holarchy-cm");

  var cmLabel = require("./cell-label");

  var apm = new holarchy.AbstractProcessModel({
    id: "IxoJ83u0TXmG7PLUYBvsyg",
    name: "".concat(cmLabel, " Model"),
    description: "Manages the details of initializing and dynamically updating the client application view (DOM display surface) via @encapsule/d2r2 and Facebook React.",
    ocdDataSpec: {
      ____label: "".concat(cmLabel, " Cell Memory"),
      ____description: "Shared memory definition for the d2r2/React Client Display Adapter OPM.",
      ____types: "jsObject",
      toJSON: {
        ____types: "jsFunction",
        ____defaultValue: function ____defaultValue() {
          return {
            tempState: true
          };
        }
      },
      config: {
        ____types: ["jsUndefined", // Initially undefined upon process activation.
        "jsObject" // Set holistic.app.client.display._private.loadConfig action
        ],
        targetDOMElementID: {
          ____accept: "jsString"
        },
        targetDOMElement: {
          ____label: "d2r2 Target DOM Element",
          ____description: "A reference to the DOM element to be be managed by the d2r2/React Client Display Adapter (obtained with document.getElementById).",
          ____opaque: true // This is an "[object HTMLDivElement]" type not natively supported by filter.

        },
        ComponentRouter: {
          ____label: "d2r2 <ComponentRouter/> React Component",
          ____opaque: true // This is a d2r2 <ComponentRouter/> React class used to dynamically update the display layout.

        }
      },
      inputs: {
        ____types: "jsObject",
        ____defaultValue: {},
        displayViewStream: {
          ____types: "jsObject",
          ____appdsl: {
            apm: holarchyCM.cmasHolarchyCMPackage.mapLabels({
              APM: "ObservableValueHelper"
            }).result.APMID
          }
        }
      },
      displayUpdateCount: {
        ____accept: "jsNumber",
        ____defaultValue: -1 // Default value -1 indicates that no client-side render has occurred; the contents of the target DIV was pre-rendered by the app server process.

      }
    },
    // ocdDataSpec
    steps: {
      uninitialized: {
        description: "Default process start step.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "display-adapter-initialize"
        }]
      },
      "display-adapter-initialize": {
        description: "".concat(cmLabel, " process is initializing."),
        actions: {
          enter: [{
            holistic: {
              app: {
                client: {
                  display: {
                    _private: {
                      loadConfig: {}
                    }
                  }
                }
              }
            }
          }]
        },
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "display-adapter-wait-kernel-config"
        }]
      },
      "display-adapter-wait-kernel-config": {
        description: "".concat(cmLabel, " process is waiting for the app client kernel to set the display's initial layout."),
        transitions: [{
          transitionIf: {
            holarchy: {
              cm: {
                operators: {
                  ocd: {
                    compare: {
                      values: {
                        a: {
                          value: 0
                        },
                        b: {
                          path: "#.displayUpdateCount"
                        },
                        operator: "==="
                      }
                    }
                  }
                }
              }
            }
          },
          nextStep: "display-adapter-configured"
        }]
      },
      "display-adapter-configured": {
        description: "".concat(cmLabel, " process has been configured."),
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "display-adapter-ready"
        }]
      },
      "display-adapter-ready": {
        description: "".concat(cmLabel, " process has reached ready step. Waiting for either a display update and/or display view process registration to occur."),
        transitions: [{
          transitionIf: {
            holarchy: {
              common: {
                operators: {
                  ObservableValueHelper: {
                    isLinked: {
                      path: "#.inputs.displayViewStream"
                    }
                  }
                }
              }
            }
          },
          nextStep: "display-adapter-process-display-view-registration"
        }]
      },
      "display-adapter-process-display-view-registration": {
        description: "".concat(cmLabel, " process has been linked to a display view cell process and will now start monitoring it for update(s)."),
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "display-adapter-wait-display-view"
        }]
      },
      "display-adapter-wait-display-view": {
        description: "Cool!",
        transitions: [{
          transitionIf: {
            holarchy: {
              common: {
                operators: {
                  ObservableValueHelper: {
                    valueHasUpdated: {
                      path: "#.inputs.displayViewStream"
                    }
                  }
                }
              }
            }
          },
          nextStep: "display-adapter-process-display-view-update"
        }]
      },
      "display-adapter-process-display-view-update": {
        description: "The registered display view process has indicated that it's got a new display stream message value for us to read.",
        transitions: [{
          transitionIf: {
            always: true
          },
          nextStep: "display-adapter-wait-display-view"
        }],
        actions: {
          exit: [{
            holistic: {
              app: {
                client: {
                  display: {
                    _private: {
                      pumpDisplayStream: {}
                    }
                  }
                }
              }
            }
          }]
        }
      }
    } // steps

  });

  if (!apm.isValid()) {
    throw new Error(apm.toJSON());
  }

  module.exports = apm;
})();