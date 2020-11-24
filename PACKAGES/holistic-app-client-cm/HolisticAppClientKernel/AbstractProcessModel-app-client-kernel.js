"use strict";

// AbstractProcessModel-app-client-kernel-declaration.js
var optionalFilterResponseSpec = {
  ____types: ["jsUndefined", "jsObject"],
  error: {
    ____accept: ["jsNull", "jsString"],
    ____defaultValue: null
  },
  result: {
    ____opaque: true
  }
};
module.exports = {
  id: "PPL45jw5RDWSMNsB97WIWg",
  name: "Holistic App Client Kernel Process",
  description: "This process manages, tracks, and controls the lifecycle of the derived app client process.",
  ocdDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    bootROMElementID: {
      ____types: "jsString",
      ____defaultValue: "idClientBootROM"
    },
    derivedAppClientProcessCoordinates: {
      ____label: "Derived App Client Runtime Process Coordinates",
      ____description: "The cell process coordinates to be used to launch the derived app client cell process.",
      ____types: "jsObject",
      apmID: {
        ____accept: "jsString"
      },
      instanceName: {
        ____accept: "jsString",
        ____defaultValue: "singleton"
      }
    },
    serviceProcesses: {
      ____types: "jsObject",
      ____defaultValue: {},
      domLocationProcessor: optionalFilterResponseSpec,
      d2r2DisplayAdapter: optionalFilterResponseSpec,
      clientViewProcessor: optionalFilterResponseSpec,
      appMetadata: optionalFilterResponseSpec
    },
    lifecycleResponses: {
      ____types: "jsObject",
      ____defaultValue: {},
      init: optionalFilterResponseSpec,
      query: optionalFilterResponseSpec,
      deserialize: optionalFilterResponseSpec,
      config: optionalFilterResponseSpec,
      start: optionalFilterResponseSpec
    },
    windowLoaded: {
      ____label: "window.onload Completed Flag",
      ____description: "Boolean flag set when the window.onload event occurs.",
      ____accept: "jsBoolean",
      ____defaultValue: false
    },
    windowLoadTimeMs: {
      ____label: "Window Load Time Milliseconds",
      ____description: "A count of milliseconds reported by the browser in the window.onload event. This is the time from initial URL request to requested HTML5 document + all its referenced resources loaded and available to the app client.",
      ____accept: "jsNumber",
      ____defaultValue: -1
    },
    bootROMData: {
      ____accept: ["jsUndefined", "jsObject"]
    },
    // We propogate the error through the app client kernel on the way to the app and take note
    // in our notification path of our own __apmiStep value if/when that occurs.
    bootstrapFailureStep: {
      ____accept: ["jsNull"
      /*no failure*/
      , "jsString"
      /*the __apmiStep value (i.e. our process step) at the point where the bootstrap failed*/
      ],
      ____defaultValue: null
    }
  },
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "kernel-boot-start"
      }]
    },
    "kernel-boot-start": {
      description: "Holistic app client kernel process services startup.",
      actions: {
        exit: [// These are dispatched while the cell is in process step "kernel-start-services" iff transition === true
        {
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    hookDOMEvents: {}
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
        nextStep: "kernel-signal-lifecycle-init"
      }]
    },
    "kernel-signal-lifecycle-init": {
      description: "Informing the derived holistic app client process that it is time initialize any private external subsystems that it requires and manages external to this CellProcessor instance.",
      actions: {
        exit: [{
          CellProcessor: {
            util: {
              writeActionResponseToPath: {
                dataPath: "#.lifecycleResponses.init",
                actionRequest: {
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            signalLifecycleEvent: {
                              eventLabel: "init"
                            }
                          }
                        }
                      }
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
        nextStep: "kernel-signal-lifecycle-query"
      }]
    },
    "kernel-signal-lifecycle-query": {
      description: "Querying the derived holistic app client process for its runtime requirements and capabilities.",
      actions: {
        exit: [{
          CellProcessor: {
            util: {
              writeActionResponseToPath: {
                dataPath: "#.lifecycleResponses.query",
                actionRequest: {
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            signalLifecycleEvent: {
                              eventLabel: "query"
                            }
                          }
                        }
                      }
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
        nextStep: "kernel-activate-subprocesses"
      }]
    },
    "kernel-activate-subprocesses": {
      description: "Activating cell subprocesses required by the derived app client service.",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    stepWorker: {
                      action: "activate-subprocesses"
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
        nextStep: "kernel-wait-subprocesses"
      }]
    },
    "kernel-wait-subprocesses": {
      description: "Waiting for holistic app client kernel subprocesses to come online...",
      transitions: [{
        transitionIf: {
          and: [{
            CellProcessor: {
              cell: {
                query: {
                  inStep: {
                    apmStep: "display-adapter-wait-initial-layout"
                  }
                },
                cellCoordinates: {
                  apmID: "IxoJ83u0TXmG7PLUYBvsyg"
                  /* "Holistic Client App Kernel: d2r2/React Client Display Adaptor" */

                }
              }
            }
          }, {
            CellProcessor: {
              cell: {
                query: {
                  inStep: {
                    apmStep: "dom-location-wait-kernel-ready"
                  }
                },
                cellCoordinates: {
                  apmID: "OWLoNENjQHOKMTCEeXkq2g"
                  /* "Holistic App Client Kernel: DOM Location Processor" */

                }
              }
            }
          }]
        },
        nextStep: "kernel-wait-browser-tab-resources-loaded"
      }]
    },
    "kernel-wait-browser-tab-resources-loaded": {
      description: "Waiting for the browser to finish load/parse of the current HTML5 document so that we can safely presume all the resources that it references are accessible.",
      transitions: [// TODO: update this signature; it's an intrinsic part of @encapsule/holarchy so should live in CellProcessor request space.
      {
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isBooleanFlagSet: {
                    path: "#.windowLoaded"
                  }
                }
              }
            }
          }
        },
        nextStep: "kernel-signal-lifecycle-deserialize"
      }]
    },
    "kernel-signal-lifecycle-deserialize": {
      description: "Informing the derived holistic app client process that it is time to deserialize derived-application-specific init data written into the now loaded and ready HTML5 document by the holistic app server.",
      actions: {
        enter: [{
          CellProcessor: {
            util: {
              writeActionResponseToPath: {
                dataPath: "#.lifecycleResponses.deserialize",
                actionRequest: {
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            signalLifecycleEvent: {
                              eventLabel: "deserialize"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }, {
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    stepWorker: {
                      action: "activate-display-adapter"
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
        nextStep: "kernel-signal-lifecycle-config"
      }]
    },
    "kernel-signal-lifecycle-config": {
      description: "Informing the derived holistic app client process that it is time to perform its final configuration steps before the client application is started.",
      actions: {
        enter: [{
          CellProcessor: {
            util: {
              writeActionResponseToPath: {
                dataPath: "#.lifecycleResponses.config",
                actionRequest: {
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            signalLifecycleEvent: {
                              eventLabel: "config"
                            }
                          }
                        }
                      }
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
        nextStep: "kernel-signal-lifecycle-start"
      }]
    },
    "kernel-signal-lifecycle-start": {
      description: "Informing the derived holistic app client process that it is time to start the show!",
      actions: {
        enter: [{
          CellProcessor: {
            util: {
              writeActionResponseToPath: {
                dataPath: "#.lifecycleResponses.start",
                actionRequest: {
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            signalLifecycleEvent: {
                              eventLabel: "start"
                            }
                          }
                        }
                      }
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
        nextStep: "kernel-service-ready"
      }]
    },
    "kernel-service-ready": {
      description: "The holistic app client kernel process will now stop evaluating in the cell plane and will continue as an active cell servicing runtime requests from the derived app client service process (and its delegates)."
    }
  } // steps

};