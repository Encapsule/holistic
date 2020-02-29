"use strict";

// AbstractProcessModel-app-client-kernel-declaration.js
module.exports = {
  id: "PPL45jw5RDWSMNsB97WIWg",
  name: "Holistic Client App Runtime Kernel",
  description: "This model manages, tracks, and controls the lifecycle of the client application.",
  ocdDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    "PPL45jw5RDWSMNsB97WIWg": {
      ____types: "jsObject",
      ____defaultValue: {},
      inputs: {
        ____types: "jsObject",
        ____defaultValue: {}
      },
      _private: {
        ____types: "jsObject",
        ____defaultValue: {},
        windowLoaded: {
          ____label: "window.onload Completed Flag",
          ____description: "Boolean flag set when the window.onload event occurs.",
          ____accept: "jsBoolean",
          ____defaultValue: false
        },
        subprocesses: {
          ____types: "jsObject",
          ____defaultValue: {},
          displayAdapter: {
            ____types: ["jsUndefined", "jsObject"],
            ____appdsl: {
              apm: "IxoJ83u0TXmG7PLUYBvsyg"
            }
          },
          viewProcessor: {
            ____types: ["jsUndefined", "jsObject"],
            ____appdsl: {
              apm: "Hsu-43zBRgqHItCPWPiBng"
            }
          },
          DOMLocation: {
            ____types: ["jsUndefined", "jsObject"],
            ____appdsl: {
              apm: "-1Ptaq_zTUa8Gfv_3ODtDg"
            }
          }
        }
      },
      outputs: {
        ____types: "jsObject",
        ____defaultValue: {}
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
            cm: {
              actions: {
                cell: {
                  process: {
                    create: {
                      apmBindingPath: "#.PPL45jw5RDWSMNsB97WIWg._private.subprocesses.viewProcessor",
                      ocdInitData: {}
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
        nextStep: "boot2_query_derived"
      }]
    },
    boot2_query_derived: {
      description: "Query the derived client app for information required to initialize the core client app runtime.",
      actions: {
        enter: [// { holistic: { app: { client: { runtime: { private: { actions: { queryDerivedAppConfig: true } } } } } } }
        ]
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
    boot4_config_derived: {
      description: "Configure the derived application runtime.",
      // TODO: Dispatch an action that calls another action defined by this CellModel's APM but implemented by the derived application."
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
                    path: "#.PPL45jw5RDWSMNsB97WIWg._private.windowLoaded"
                  }
                }
              }
            }
          }
        },
        nextStep: "boot6_deserialize_app"
      }]
    },
    boot6_deserialize_app: {
      description: "Access the boot ROM embedded in the hosting HTML document to get the suspended process state of the derived application.",
      actions: {
        enter: []
      },
      transitions: []
    },
    boot7_load_app_memory: {
      description: "Load the deserialized app into the OCD to initialize the client app runtime."
    },
    boot8_init_app_view: {
      description: "Initialize the view and d2r2/React display models. Performs a d2r2/ReactDOM.hydrate operation ultimately."
    },
    boot9_start_app: {
      description: "Start the client application runtime."
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