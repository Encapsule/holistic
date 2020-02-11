"use strict";

// opm-d2r2-react-client-display-adaptor-declaration.js
//
// This is constructor data for @encapsule/holarchy.ObservableProcessModel class constructor function.
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
      // TODO: Probably none of the inputs should be serialized.
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
      clock: {
        ____label: "React Output Processor Clock",
        ____description: "A frame latch used to trigger dynamic rerendering of the client view via d2r2 <ComponentRouter/> and Facebook React RTL's.",
        ____types: "jsObject",
        ____appdsl: {
          opm: "z_mTe02hSWmaM1iRO1pBeA"
          /* bind to Frame Latch OPM */

        },
        value: {
          ____label: "Render Command",
          ____types: ["jsNull", "jsObject"],
          ____defaultValue: null,
          options: {
            ____types: "jsObject",
            ____defaultValue: {},
            rehydrate: {
              ____types: "jsBoolean",
              ____defaultValue: false
            }
          },
          pathRenderContext: {
            ____label: "Render Context OCD Path",
            ____description: "Fully-qualified OCD path of the descriptor object to be deep copied and passed to <ComponentRouter/> via this.props.",
            ____accept: "jsString"
          },
          pathRenderData: {
            ____label: "Render Data OCD Path",
            ____description: "Fully-qualified OCD path of the descriptor object to be deep copied and passed to <ComponentRouter/> via this.props.renderData.",
            ____accept: "jsString"
          } // value

        } // clock

      }
    },
    // inputs
    private: {
      ____types: "jsObject",
      ____defaultValue: {},
      renderCount: {
        ____accept: "jsNumber",
        ____defaultValue: -1
      },
      renderPending: {
        ____accept: "jsBoolean",
        ____defaultValue: false
      }
    }
  },
  // opmDataSpec
  steps: {
    uninitialized: {
      description: "Default OPM process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "wait_invariants"
      }]
    },
    wait_invariants: {
      description: "Waiting for d2r2 ComponentRouter instance (how to render), and DOM element (where to render) invariants to be specified.",
      transitions: [{
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
          }]
        },
        nextStep: "wait_inputs"
      }]
    },
    wait_inputs: {
      description: "Invariants have been satisfied. Waiting for initial d2d2 ComponentRouter render data context to be specified.",
      transitions: [{
        transitionIf: {
          holarchy: {
            sml: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.inputs.clock.value"
                  }
                }
              }
            }
          }
        },
        nextStep: "initialized"
      }]
    },
    initialized: {
      description: "Preparing for initial render operation. Determining if we rehyrdate server-rendered view. Or, replace it.",
      transitions: [{
        transitionIf: {
          holarchy: {
            sml: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.inputs.clock.value.options.rehydrate"
                  }
                }
              }
            }
          }
        },
        nextStep: "rehydrate"
      }, {
        transitionIf: {
          always: true
        },
        nextStep: "render"
      }]
    },
    rehydrate: {
      description: "Rehydrating the specified d2r2 ComponentRouter render data context to reconstruct server-rendered d2r2 ComponentRouter render data context in the client application.",
      actions: {
        enter: [{
          holarchy: {
            sml: {
              actions: {
                ocd: {
                  setBooleanFlag: {
                    path: "#.private.renderPending"
                  }
                }
              }
            }
          }
        }, {
          holistic: {
            app: {
              client: {
                sml: {
                  actions: {
                    d2r2ReactClientDisplayAdaptor: {
                      operation: "hydrate"
                    }
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
        nextStep: "rendering"
      }]
    },
    render: {
      description: "Rendering the specified d2r2 ComponentRouter render data context to refresh layout and client-side React component mountings.",
      actions: {
        enter: [{
          holarchy: {
            sml: {
              actions: {
                ocd: {
                  setBooleanFlag: {
                    path: "#.private.renderPending"
                  }
                }
              }
            }
          }
        }, {
          holistic: {
            app: {
              client: {
                sml: {
                  actions: {
                    d2r2ReactClientDisplayAdaptor: {
                      operation: "render"
                    }
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
        nextStep: "rendering"
      }]
    },
    rendering: {
      description: "Rendering the specified d2r2 ComponentRouter render data context. Please wait for the operation to complete.",
      transitions: [{
        transitionIf: {
          not: {
            holarchy: {
              sml: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.private.renderPending"
                    }
                  }
                }
              }
            }
          }
        },
        nextStep: "ready"
      }]
    },
    ready: {
      description: "Waiting for next clock signal to re-render client application view.",
      transitions: [{
        transitionIf: {
          holarchy: {
            sml: {
              operators: {
                opmi: {
                  atStep: {
                    path: "#.inputs.clock",
                    step: "updated"
                  }
                }
              }
            }
          }
        },
        nextStep: "render"
      }]
    } // steps

  }
}; // OPM declaration