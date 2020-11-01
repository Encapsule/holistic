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
  name: "Holistic Client App Kernel",
  description: "This model manages, tracks, and controls the lifecycle of the client application.",
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
        ____accept: "jsString"
      }
    },
    serviceProcesses: {
      ____types: "jsObject",
      ____defaultValue: {},
      domLocationProcessor: optionalFilterResponseSpec,
      d2r2DisplayAdapter: optionalFilterResponseSpec,
      clientViewProcessor: optionalFilterResponseSpec
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
    bootROMData: {
      ____accept: ["jsUndefined", "jsObject"]
    },
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
      description: "Default starting process step. Start the Holistic App Client Kernel daemon cell processes on process step exit.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "kernel-start-services"
      }]
    },
    "kernel-start-services": {
      description: "Initializing the holistic app client kernel process...",
      actions: {
        enter: [{
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
        }, {
          CellProcessor: {
            util: {
              writeActionResponseToPath: {
                dataPath: "#.serviceProcesses.domLocationProcessor",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      activate: {},
                      processCoordinates: {
                        apmID: "-1Ptaq_zTUa8Gfv_3ODtDg"
                        /* "Holistic App Client Kernel: DOM Location Processor" */

                      }
                    }
                  }
                }
              }
            }
          }
        }, {
          CellProcessor: {
            util: {
              writeActionResponseToPath: {
                dataPath: "#.serviceProcesses.d2r2DisplayAdapter",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      activate: {},
                      processCoordinates: {
                        apmID: "IxoJ83u0TXmG7PLUYBvsyg"
                        /* "Holistic Client App Kernel: d2r2/React Client Display Adaptor" */

                      }
                    }
                  }
                }
              }
            }
          }
        }, {
          CellProcessor: {
            util: {
              writeActionResponseToPath: {
                dataPath: "#.serviceProcesses.clientViewProcessor",
                actionRequest: {
                  CellProcessor: {
                    process: {
                      activate: {},
                      processCoordinates: {
                        apmID: "Hsu-43zBRgqHItCPWPiBng"
                        /* "Holistic App Client Kernel: Client View Processor" */

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
          or: [// TODO: update this signature; it's an intrinsic part of @encapsule/holarchy so should live in CellProcessor request space.
          {
            holarchy: {
              cm: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.serviceProcesses.domLocationProcessor.error"
                    }
                  }
                }
              }
            }
          }, {
            holarchy: {
              cm: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.serviceProcesses.d2r2DisplayAdapter.error"
                    }
                  }
                }
              }
            }
          }, {
            holarchy: {
              cm: {
                operators: {
                  ocd: {
                    isNamespaceTruthy: {
                      path: "#.serviceProcesses.clientViewProcessor.error"
                    }
                  }
                }
              }
            }
          }]
        },
        nextStep: "kernel-boot-fail"
      }, {
        transitionIf: {
          always: true
        },
        nextStep: "kernel-signal-lifecycle-init"
      }]
    },
    "kernel-signal-lifecycle-init": {
      description: "Informing the derived holistic app client process that it is time initialize any private external subsystems that it requires and manages external to this CellProcessor instance.",
      actions: {
        enter: [{
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
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.lifecycleResponses.init.error"
                  }
                }
              }
            }
          }
        },
        nextStep: "kernel-boot-fail"
      }, {
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
                    apmStep: "wait"
                  }
                },
                cellCoordinates: {
                  apmID: "-1Ptaq_zTUa8Gfv_3ODtDg"
                  /* "Holistic App Client Kernel: DOM Location Processor" */

                }
              }
            }
          }, {
            CellProcessor: {
              cell: {
                query: {
                  inStep: {
                    apmStep: "initialized"
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
                    apmStep: "wait_app_config"
                  }
                },
                cellCoordinates: {
                  apmID: "Hsu-43zBRgqHItCPWPiBng"
                  /* "Holistic App Client Kernel: Client View Processor" */

                }
              }
            }
          }]
        },
        nextStep: "kernel-signal-lifecycle-query"
      }]
    },
    "kernel-signal-lifecycle-query": {
      description: "Querying the derived holistic app client process for its runtime requirements and capabilities.",
      actions: {
        enter: [{
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
      transitions: [// TODO: update this signature; it's an intrinsic part of @encapsule/holarchy so should live in CellProcessor request space.
      {
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.lifecycleResponses.query.error"
                  }
                }
              }
            }
          }
        },
        nextStep: "kernel-boot-fail"
      }, {
        transitionIf: {
          always: true
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
        nextStep: "kernel-browser-tab-resources-ready"
      }]
    },
    "kernel-browser-tab-resources-ready": {
      description: "The hosting browser tab for this CellProcessor instance has finished loading all the resources referenced in the HTML5 document received from the holistic app server process.",
      // TODO placeholder for any work that needs to be done after the the document has loaded and before we call the derived app client process to deserialize the bootROM data that the holistic app server wrote into the synthesized HTML5 document that's now laoded in the browser tab.
      transitions: [{
        transitionIf: {
          always: true
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
        }]
      },
      transitions: [{
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.lifecycleResponses.deserialize.error"
                  }
                }
              }
            }
          }
        },
        nextStep: "kernel-boot-fail"
      }, {
        transitionIf: {
          always: true
        },
        nextStep: "kernel-configure-runtime-environment"
      }]
    },
    "kernel-configure-runtime-environment": {
      description: "Preparing the holistic app client runtime environment...",
      // TODO placeholder for any work that needs to be done after the derived app client has performed deserialization.
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
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.lifecycleResponses.config.error"
                  }
                }
              }
            }
          }
        },
        nextStep: "kernel-boot-fail"
      }, {
        transitionIf: {
          always: true
        },
        nextStep: "kernel-final-prelaunch"
      }]
    },
    "kernel-final-prelaunch": {
      description: "Performing final runtime environment adjustments before starting the derived client app process.",
      // TODO placeholder for any work that needs to be done after the derived app client has configured itself.
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
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isNamespaceTruthy: {
                    path: "#.lifecycleResponses.start.error"
                  }
                }
              }
            }
          }
        },
        nextStep: "kernel-boot-fail"
      }, {
        transitionIf: {
          always: true
        },
        nextStep: "kernel-started"
      }]
    },
    "kernel-started": {
      description: "The holistic app client kernel process is initialized. And, the derived client app is now running."
    },
    "kernel-boot-fail": {
      description: "The kernel boot has failed."
    }
  } // steps

};