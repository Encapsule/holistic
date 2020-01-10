"use strict";

// opm-d2r2-react-client-display-adaptor-declaration.js
//
// This is constructor data for @encapsule/holarchy.ObservableProcessModel constructor function.
//
module.exports = {
  id: "IxoJ83u0TXmG7PLUYBvsyg",
  name: "d2r2/React Client Display Adaptor",
  description: "Manages the details of initializing and dynamically updating the client application view (DOM display surface) via @encapsule/d2r2 and Facebook React.",
  opmDataSpec: {
    ____label: "d2r2/React Client Display Adaptor Memory",
    ____description: "Shared memory definition for the d2r2/React Client Display Adaptor OPM.",
    ____types: "jsObject",
    ____defaultValue: {},
    inputs: {
      ____label: "Adaptor Inputs",
      ____types: "jsObject",
      ____defaultValue: {},
      ComponentRouter: {
        // TODO: Not serializable
        ____label: "d2r2 <ComponentRouter/>",
        ____description: "A reference to previously-constructed <ComponentRouter/> instance (a React component that implements @encapsule/d2r2 dynamic layout protocol).",
        ____accept: ["jsNull", "jsFunction"],
        ____defaultValue: null
      },
      DOMElement: {
        // TODO: Not serializable
        ____label: "d2r2 Target DOM Element",
        ____description: "A reference to the DOM element to be be managed by the d2r2/React Client Display Adaptor (obtained with document.getElementById).",
        ____opaque: true,
        // this is typically a "[object HTMLDivElement]" type not natively supported by filter.
        ____defaultValue: null
      },
      pathRenderContext: {
        ____label: "Render Context OCD Path",
        ____description: "Fully-qualified OCD path of the descriptor object to be deep copied and passed to <ComponentRouter/> via this.props.",
        ____accept: ["jsNull", "jsString"],
        ____defaultValue: null
      },
      pathRenderData: {
        ____label: "Render Data OCD Path",
        ____description: "Fully-qualified OCD path of the descriptor object to be deep copied and passed to <ComponentRouter/> via this.props.renderData.",
        ____accept: ["jsNull", "jsString"],
        ____defaultValue: null
      },
      clock: {
        ____label: "React Output Processor Clock",
        ____description: "A frame latch used to trigger dynamic rerendering of the client view via d2r2 <ComponentRouter/> and Facebook React RTL's.",
        ____types: "jsObject",
        ____appdsl: {
          opm: "z_mTe02hSWmaM1iRO1pBeA"
          /* bind to Frame Latch OPM */

        },
        value: {
          ____label: "Render Info",
          ____description: "Info useful for debugging the d2r2/React Output Processor.",
          ____types: "jsObject",
          renderCount: {
            ____accept: "jsNumber"
          }
        }
      } // inputs

    }
  },
  // opmDataSpec
  steps: {
    uninitialized: {
      description: "Default OPM process step.",
      transitions: [{
        nextStep: "wait_invariants",
        transitionIf: {
          always: true
        }
      }]
    },
    wait_invariants: {
      description: "Waiting for input invariants to be satisfied.",
      transitions: [{
        nextStep: "initialized",
        transitionIf: {
          and: [{
            holarchy: {
              sml: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.inputs.ComponentRouter"
                    }
                  }
                }
              }
            }
          }, {
            holarchy: {
              sml: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.inputs.DOMElement"
                    }
                  }
                }
              }
            }
          }, {
            holarchy: {
              sml: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.inputs.pathRenderContext"
                    }
                  }
                }
              }
            }
          }, {
            holarchy: {
              sml: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.inputs.pathRenderData"
                    }
                  }
                }
              }
            }
          }]
        }
      }]
    },
    initialized: {
      description: "Input invariants have been satisfied.",
      transitions: [{
        nextStep: "render",
        transitionIf: {
          holarchy: {
            sml: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.clock.value"
                  }
                }
              }
            }
          }
        }
      }, {
        nextStep: "rehydrate",
        transitionIf: {
          always: true
        }
      }]
    },
    rehydrate: {
      description: "Rehydrating the client application view and registering user input and DOM event handlers.",
      actions: {
        enter: [{
          holarchy: {
            sml: {
              actions: {
                react: {
                  rehydrate: true
                }
              }
            }
          }
        }]
      },
      transitions: [{
        nextStep: "wait_clock",
        transitionIf: {
          always: true
        }
      }]
    },
    render: {
      description: "Rendering client application view updates.",
      actions: {
        enter: [{
          holarchy: {
            sml: {
              actions: {
                react: {
                  render: true
                }
              }
            }
          }
        }]
      },
      transitions: [{
        nextStep: "wait_clock",
        transitionIf: {
          always: true
        }
      }]
    },
    wait_clock: {
      description: "Waiting for next clock signal to re-render client application view.",
      transitions: [{
        nextStep: "render",
        transitionIf: {
          holarchy: {
            sml: {
              operators: {
                opmInStep: {
                  path: "#.clock",
                  step: "updated"
                }
              }
            }
          }
        }
      }]
    }
  }
};