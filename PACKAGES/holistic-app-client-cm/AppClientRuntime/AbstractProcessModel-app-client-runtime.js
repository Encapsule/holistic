"use strict";

// AbstractProcessModel-app-client-kernel-declaration.js
module.exports = {
  id: "PPL45jw5RDWSMNsB97WIWg",
  name: "Holistic Client App Runtime Kernel",
  description: "This model manages, tracks, and controls the lifecycle of the client application.",
  ocdDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    "private": {
      ____types: "jsObject",
      ____defaultValue: {},
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
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot0_hook_events"
      }]
    },
    boot0_hook_events: {
      description: "Hooking DOM events pertinent to tracking the lifecycle of this instance of the client application running inside the user's browser.",
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
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot1_start_kernel"
      }]
    },
    boot1_start_kernel: {
      description: "Start core client app kernel subsystems.",
      actions: {
        enter: [{
          holarchy: {
            CellProcessor: {
              process: {
                create: {
                  apmID: "-1Ptaq_zTUa8Gfv_3ODtDg",
                  cellProcessUniqueName: "DOM Location Processor"
                }
              }
            }
          }
        }, {
          holarchy: {
            CellProcessor: {
              process: {
                create: {
                  apmID: "Hsu-43zBRgqHItCPWPiBng",
                  cellProcessUniqueName: "Holistic Client App View Processor"
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
        nextStep: "boot2_query_derived"
      }]
    },
    // ================================================================
    // **** CLIENT APPLICATION CALLBACK: QUERY
    boot2_query_derived: {
      description: "Query the derived client app for information required to initialize the core client app runtime.",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                query: {}
              }
            }
          }
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot3_wait_kernel"
      }]
    },
    boot3_wait_kernel: {
      description: "Wait for the core client app kernel subsystems to become available.",
      transitions: [// TODO: We want to check status of subprocesses and errors etc. here before calling any client app derived code.
      {
        transitionIf: {
          always: true
        },
        nextStep: "boot4_config_derived"
      }]
    },
    // ================================================================
    // **** CLIENT APPLICATION CALLBACK: CONFIG
    boot4_config_derived: {
      description: "Configure the derived application runtime.",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                config: {}
              }
            }
          }
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot5_wait_browser"
      }]
    },
    boot5_wait_browser: {
      description: "Wait for the browser to finish loading the HTML document and its referenced external resources (scripts, CSS, images, fonts, JSON, ...",
      transitions: [{
        transitionIf: {
          holarchy: {
            cm: {
              operators: {
                ocd: {
                  isBooleanFlagSet: {
                    path: "#.private.windowLoaded"
                  }
                }
              }
            }
          }
        },
        nextStep: "boot6_deserialize_app"
      }]
    },
    // ================================================================
    // **** CLIENT APPLICATION CALLBACK: DESERIALIZE
    boot6_deserialize_app: {
      description: "Access the boot ROM embedded in the hosting HTML document to get the suspended process state of the derived application.",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                deserialize: {}
              }
            }
          }
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot7_init_app_view"
      }]
    },
    boot7_init_app_view: {
      description: "Initialize the view and d2r2/React display models. Performs a d2r2/ReactDOM.hydrate operation ultimately.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "boot8_init_start_app"
      }]
    },
    // ================================================================
    // **** CLIENT APPLICATION CALLBACK: START RUNTIME
    boot8_init_start_app: {
      description: "Start the client application runtime.",
      actions: {
        enter: [{
          holistic: {
            app: {
              client: {
                start: {}
              }
            }
          }
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "running"
      }]
    },
    running: {
      description: "The client application is online and awaiting input from external actors."
    },
    error_process_boot_failure: {
      description: "Client application process boot failed due to unrecoverable error(s)."
    },
    error_process_resume_failure: {
      description: "Client application process resume failured due to unrecoverable error(s)."
    },
    error_process_runtime_failure: {
      description: "Client application process crashed at runtime due to unexpected and unrecoverable error(s)."
    }
  }
};