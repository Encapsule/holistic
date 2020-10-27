"use strict";

// AbstractProcessModel-app-client-kernel-declaration.js
module.exports = {
  id: "PPL45jw5RDWSMNsB97WIWg",
  name: "Holistic Client App Kernel",
  description: "This model manages, tracks, and controls the lifecycle of the client application.",
  ocdDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    _private: {
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
      bootROMData: {
        ____accept: ["jsUndefined", "jsObject"]
      },
      windowLoaded: {
        ____label: "window.onload Completed Flag",
        ____description: "Boolean flag set when the window.onload event occurs.",
        ____accept: "jsBoolean",
        ____defaultValue: false
      }
    }
  },
  steps: {
    uninitialized: {
      description: "Default starting process step. Start the Holistic App Client Kernel daemon cell processes on process step exit.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "kernel-boot"
      }]
    },
    "kernel-boot": {
      description: "Initializing the holistic app client kernel process...",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                cm: {
                  HolisticAppRuntime: {
                    actions: {
                      _private: {
                        hookEvents: true
                      }
                    }
                  }
                }
              }
            }
          }
        }, // TODO: fix this request signature
        {
          CellProcessor: {
            process: {
              activate: {},
              processCoordinates: {
                apmID: "-1Ptaq_zTUa8Gfv_3ODtDg"
                /* "Holistic App Client Kernel: DOM Location Processor" */

              }
            }
          }
        }, {
          CellProcessor: {
            process: {
              activate: {},
              processCoordinates: {
                apmID: "IxoJ83u0TXmG7PLUYBvsyg"
                /* "Holistic Client App Kernel: d2r2/React Client Display Adaptor" */

              }
            }
          }
        }, {
          CellProcessor: {
            process: {
              activate: {},
              processCoordinates: {
                apmID: "Hsu-43zBRgqHItCPWPiBng"
                /* "Holistic App Client Kernel: Client View Processor" */

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
        enter: [{
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
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "kernel-wait-browser-tab-init"
      }]
    },
    "kernel-wait-browser-tab-init": {
      description: "Waiting for the browser to finish load/parse of the current HTML5 document so that we can safely presume all the resources that it references are accessible.",
      transitions: [{
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isBooleanFlagSet: {
                    path: "#._private.windowLoaded"
                  }
                }
              }
            }
          }
        },
        nextStep: "kernel-signal-lifecycle-deserialize"
      }]
    },

    /*
    "kernel-deserialize-init-data": {
        description: "Deserializing holistic app client init data written by the holistic app server into the now loaded and ready HTML5 document.",
        actions: {
            enter: [
                { holistic: { app: { client: { kernel: { private: { deserializeBootROM: {} } } } } } }
            ]
        },
        transitions: [
            { transitionIf: { always: true }, nextStep: "kernel-signal-lifecycle-deserialize" }
        ]
    },
    */
    "kernel-signal-lifecycle-deserialize": {
      description: "Informing the derived holistic app client process that it is time to deserialize derived-application-specific init data written into the now loaded and ready HTML5 document by the holistic app server.",
      actions: {
        enter: [{
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
        }]
      },
      transitions: [{
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
        }]
      },
      transitions: [{
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
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "kernel-started"
      }]
    },
    "kernel-started": {
      description: "The holistic app client kernel process is initialized. And, the derived client app is now running."
    }
  } // steps

};