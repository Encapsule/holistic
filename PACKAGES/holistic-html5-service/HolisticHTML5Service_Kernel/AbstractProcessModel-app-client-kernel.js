"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// AbstractProcessModel-app-client-kernel-declaration.js
(function () {
  var arccore = require("@encapsule/arccore");

  var _require = require("@encapsule/holarchy"),
      AbstractProcessModel = _require.AbstractProcessModel;

  var cmasHolisticHTML5ServicePackage = require("../cmasHolisticHTML5ServicePackage"); // v0.0.49-spectrolite
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
              pageViewController: optionalFilterResponseSpec,
              appMetadata: optionalFilterResponseSpec,
              appServiceProcess: optionalFilterResponseSpec
            },

            /*
            lifecycleResponses: {
                ____types: "jsObject",
                ____defaultValue: {},
                start: optionalFilterResponseSpec,
            },
            */
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
            "uninitialized": {
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
                enter: [// These are dispatched while the cell is in process step "kernel-start-services" iff transition === true
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
                nextStep: "kernel-activate-subprocesses"
              }]
            },
            "kernel-activate-subprocesses": {
              description: "Activating cell subprocesses required by the derived app client service.",
              actions: {
                enter: [// Activate cell processes:
                // HolisticServiceCore_Metadata
                // HolisticServiceCore_PageViewController
                // HolisticHTML5Service_DomLocation
                // HolisticHTML5Service_DisplayAdapter
                {
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
                nextStep: "kernel-wait-subprocesses1"
              }]
            },
            "kernel-wait-subprocesses1": {
              description: "Waiting for HolisticHTML5Service_Kernel subprocesses to reach their expected post-activation process steps...",
              transitions: [{
                transitionIf: {
                  and: [// TODO: ensure that we wait on everything we activated in stepWorker activate-subprocesses action.
                  {
                    CellProcessor: {
                      cell: {
                        query: {
                          inStep: {
                            apmStep: "metadata-wait-kernel-config"
                          }
                        },
                        cellCoordinates: {
                          apmID: "srjZAO8JQ2StYj07u_rgGg"
                          /* HolisticServiceCore_Metadata Process */

                        }
                      }
                    }
                  }, {
                    CellProcessor: {
                      cell: {
                        query: {
                          inStep: {
                            apmStep: "dom-location-wait-kernel-config"
                          }
                        },
                        cellCoordinates: {
                          apmID: cmasHolisticHTML5ServicePackage.mapLabels({
                            APM: "HolisticHTML5Service_DOMLocation"
                          }).result.APMID
                        }
                      }
                    }
                  }, {
                    CellProcessor: {
                      cell: {
                        query: {
                          inStep: {
                            apmStep: "display-adapter-wait-kernel-config"
                          }
                        },
                        cellCoordinates: {
                          apmID: "IxoJ83u0TXmG7PLUYBvsyg"
                          /* HolisticHTML5Service_DisplayAdapter */

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
              transitions: [// TODO: update this action request signature
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
              description: "The bootROM data serialized to this HTML5 document by HolisticNodeService has been deserialized by HolisticHTML5Service.",
              actions: {
                enter: [{
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
                nextStep: "kernel-config-subprocesses"
              }]
            },
            "kernel-config-subprocesses": {
              description: "Completing subprocess initializations using information obtained from the deserialized bootROM.",
              actions: {
                enter: [// Rehydrate the display process in whatever state it was left in immediately prior to being serialized to an HTML5 document.
                // Then render the same data w/modified context indicating that we're now live inside the HTML5 service kernel (i.e. act is connected).
                {
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            stepWorker: {
                              action: "config-subprocesses"
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
                nextStep: "kernel-wait-subprocesses2"
              }]
            },
            "kernel-wait-subprocesses2": {
              description: "Waiting for HolisticHTML5Service_Kernel subprocesses to reach their expected post-config process steps...",
              transitions: [{
                transitionIf: {
                  and: [{
                    CellProcessor: {
                      cell: {
                        query: {
                          inStep: {
                            apmStep: "metadata-ready"
                          }
                        },
                        cellCoordinates: {
                          apmID: "srjZAO8JQ2StYj07u_rgGg"
                          /* HolisticServiceCore_Metadata Process */

                        }
                      }
                    }
                  }, {
                    CellProcessor: {
                      cell: {
                        query: {
                          inStep: {
                            apmStep: "pageview-controller-ready"
                          }
                        },
                        cellCoordinates: {
                          apmID: "AZaqZtWRSdmHOA6EbTr9HQ"
                          /* HolisticServiceCore_PageViewController */

                        }
                      }
                    }
                  }, {
                    CellProcessor: {
                      cell: {
                        query: {
                          inStep: {
                            apmStep: "dom-location-ready"
                          }
                        },
                        cellCoordinates: {
                          apmID: cmasHolisticHTML5ServicePackage.mapLabels({
                            APM: "HolisticHTML5Service_DOMLocation"
                          }).result.APMID
                        }
                      }
                    }
                  }, {
                    CellProcessor: {
                      cell: {
                        query: {
                          inStep: {
                            apmStep: "display-adapter-ready"
                          }
                        },
                        cellCoordinates: {
                          apmID: "IxoJ83u0TXmG7PLUYBvsyg"
                          /*display adpater*/

                        }
                      }
                    }
                  }]
                },
                nextStep: "kernel-boot-complete"
              }]
            },
            "kernel-boot-complete": {
              description: "The HolisticHTML5Service_Kernel process has completed its boot process and is now passing control over to the derived service.",
              transitions: [{
                transitionIf: {
                  always: true
                },
                nextStep: "kernel-activate-service-process"
              }]
            },
            "kernel-activate-service-process": {
              description: "Attempting to activate the derived HTML5 service process that developers understand as the root cell process of their browser tab application...",
              actions: {
                enter: [{
                  holistic: {
                    app: {
                      client: {
                        kernel: {
                          _private: {
                            stepWorker: {
                              action: "activate-service-process"
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
              description: "The HolisticHTML5Service_Kernel process has completed its boot sequence and the derived app service process has been started."
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