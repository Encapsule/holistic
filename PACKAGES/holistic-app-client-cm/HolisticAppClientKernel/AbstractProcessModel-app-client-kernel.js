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
                    rootDisplayCommand: {
                      command: "initialize"
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
                    rootDisplayCommand: {
                      command: "show"
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
                    rootDisplayCommand: {
                      message: "App client kernel process is booting..."
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
        }, {
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    rootDisplayCommand: {
                      message: "App client kernel has initialized the derived app client process."
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
      actions: {
        exit: [{
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    rootDisplayCommand: {
                      message: "App client kernel is waiting on subprocess services to become ready..."
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
        }, {
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    rootDisplayCommand: {
                      message: "App client kernel has queried the derived app client process."
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
        nextStep: "kernel-wait-browser-tab-resources-loaded"
      }]
    },
    "kernel-wait-browser-tab-resources-loaded": {
      description: "Waiting for the browser to finish load/parse of the current HTML5 document so that we can safely presume all the resources that it references are accessible.",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    rootDisplayCommand: {
                      message: "App client kernel is waiting for the browser tab to load..."
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
        exit: [{
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
                    rootDisplayCommand: {
                      message: "App client kernel has received deserialized application data from the derived app client process."
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
        exit: [{
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
        }, {
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    rootDisplayCommand: {
                      message: "App client kernel has configured the derived app client process."
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
        exit: [{
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
        }, {
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    rootDisplayCommand: {
                      message: "App client kernel has started the derived app client process."
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
      description: "The holistic app client kernel process will now stop evaluating in the cell plane and will continue as an active cell servicing runtime requests from the derived app client service process (and its delegates).",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    rootDisplayCommand: {
                      message: "App client kernel process has reached ready step."
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
                    rootDisplayCommand: {
                      message: "App client service is now active and running."
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
                    rootDisplayCommand: {
                      command: "hide"
                    }
                  }
                }
              }
            }
          }
        }]
      }
    },
    "kernel-boot-fail": {
      description: "The kernel boot has failed.",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                kernel: {
                  _private: {
                    rootDisplayCommand: {
                      message: "The app client service failed to start due to error."
                    }
                  }
                }
              }
            }
          }
        } // { holistic: { app: { client: { kernel: { _private: { rootDisplayCommand: { command: "hide" } } } } } } },
        ]
      }
    }
  } // steps

};