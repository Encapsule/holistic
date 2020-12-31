"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// AbstractProcessModel-app-client-kernel-declaration.js
var arccore = require("@encapsule/arccore");

var _require = require("@encapsule/holarchy"),
    AbstractProcessModel = _require.AbstractProcessModel;

(function () {
  // v0.0.49-spectrolite
  // Should we specialize these for the different uses? There are some nuanced
  // tradeoffs an insufficient time to think them through now. But, we'll need
  // to get all this filter spec composition stuff settled ultimately. There
  // are several approaches worth considering in the long-term.
  var optionalFilterResponseSpec = {
    ____types: ["jsUndefined", "jsObject"],
    error: {
      ____accept: ["jsNull", "jsString"],
      ____defaultValue: null
    },
    result: {
      ____opaque: true
    }
  }; // v0.0.49-spectrolite
  // We do need to specialize the kernel's APM so that critical variable information may be schematized for (a) securtiy (b) correctness (b) addressability in OCD storage (c) developer docs

  var factoryResponse = arccore.filter.create({
    operationID: "uspTHejsQq63sCEqouEpYA",
    operationName: "HolisticHTML5Service_Kernel APM Factory",
    operationDecription: "Factory filter leveraged by HolisticHTML5Service_Kernel CellModel Factory (filter) to synthesize a specialized APM for the serivce kernel.",
    inputFilterSpec: {
      ____types: "jsObject",
      appTypes: {
        ____types: "jsObject",
        bootROMSpec: {
          ____accept: "jsObject" // This is pre-synthesized filter spec for the bootROM data (base64-encoded JSON serialized into HTML5 document by HolisticNodeService instance) serialzed by HolisticNodeService and deserialized by HolisticHTML5Service_Kernel process upon activation/boot.

        }
      }
    },
    outputFilterSpec: {
      ____accept: "jsObject" // This is an @encapsule/holarchy AbstractProcessModel instance specialized for use w/the derived app service logic.

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var serviceKernelAPM = new AbstractProcessModel({
          id: "PPL45jw5RDWSMNsB97WIWg",
          name: "HolisticHTML5Service_Kernel Process",
          description: "This process initializes the CellProcessor environment and manages core processes on behalf of derived app service logic (some number of app-specific cell process(es)) allowing them to function correctly and reliably w/minimal knowledge of how these facilities are actually implemented.",
          ocdDataSpec: {
            ____types: "jsObject",
            ____defaultValue: {},
            // ----------------------------------------------------------------
            // BEGIN: required activation data
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
            // END: required activation data
            // ----------------------------------------------------------------
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
            displayReady: {
              ____label: "Display Adapter Ready",
              ____description: "A flag set by the kernel process to indicate that it is done interacting directly with the display adapter process. And, has passed responsibility for further display update(s) to the derived HTML5 app service.",
              ____accept: "jsBoolean",
              ____defaultValue: false
            },
            bootROMData: _objectSpread(_objectSpread({}, request_.appTypes.bootROMSpec), {}, {
              ____types: ["jsUndefined", "jsObject"] // This is set by the HolisticHTML5Service kernel process during boot once the window.onload even has fired and we know the data can be safely deserialized and validated/normalized.

            }),
            // v0.0.49-spectrolite confirm the details here. Do we need this. What's this again?
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
                            apmStep: "dom-location-processor-wait-kernel-ready"
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
                nextStep: "kernel-deserialize-bootROM"
              }]
            },
            "kernel-deserialize-bootROM": {
              description: "Analyzing the contents of the HTML5 service's bootROM contents to determine which of several possible boot strategies to pursue from this step in the kernel boot process forward.",
              actions: {
                exit: [{
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            stepWorker: {
                              action: "deserialize-bootROM-data"
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
                nextStep: "kernel-signal-lifecycle-deserialize"
              }]
            },

            /*
            "kernel-analyze-bootROM": {
                "Analyzing the results of bootROM deserialization.",
                transitions: [
                    {
                        transitionIf: { holarchy: { cm: { operators: { ocd: { compare: { values: { a: { path: "#.bootROMData" } } } } } } } }
                    }
                 ]
            }
            */
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
                nextStep: "kernel-start-display-adapter"
              }]
            },
            "kernel-start-display-adapter": {
              description: "Updating the current page view display to show the welcome message to the user. And, make any final preparations needed before handing control of the display adapter over to the derived HTML5 service logic.",
              actions: {
                enter: [{
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            stepWorker: {
                              action: "start-display-adapter"
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
                          isBooleanFlagSet: {
                            path: "#.displayReady"
                          }
                        }
                      }
                    }
                  }
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

        }); // new AbstractProcessModel

        if (!serviceKernelAPM.isValid()) {
          errors.push("Unable to synthesize an AbstractProcessModel for use by this service kernel due to error:");
          errors.push(serviceKernelAPM.toJSON());
          break;
        }

        response.result = serviceKernelAPM;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result; // a filter that returns the synthesized HolisticHTML5Service_Kernel APM instance
})();