"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// holistic-app-client-cellmodel-factory-filter.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

var holisticAppCommon = require("@encapsule/holistic-app-common-cm");

(function () {
  try {
    var filterDeclaration = {
      operationID: "xyEnAFgRRIKHUbjYXfzGyQ",
      operationName: "Holistic App Client CellModel Factory",
      operationDescription: "A filter that manufactures a CellModel that encapsulates the derived app client service.",
      inputFilterSpec: {
        ____label: "Holistic App Client CellModel Factory Request",
        ____description: "A descriptor object that declares the configuration and defines the runtime details of a class HTML5 client application service derived from @encapsule/holistic-app-client-cm and @encapsule/holarchy RTL package services.",
        ____types: "jsObject",
        name: {
          ____label: "Client Application Name",
          ____description: "The client application name string should be taken (generally) from holistic platform Makefile-generated app-build.json app.name value. Client is implied by context; don't include that in the name.",
          ____accept: "jsString"
        },
        description: {
          ____label: "Client Application Description",
          ____description: "The client application description string should be taken (generally) from holistic platform Makefile-generated app-build.json app.description value. Client is implied by context; don't include that detail in the description.",
          ____accept: "jsString"
        },
        cellModelID: {
          ____label: "Client Application CellModel ID",
          ____description: "A developer-defined IRUT-format string to be used as the CellModel ID for the new CellModel synthesized by this factory filter.",
          ____accept: "jsString"
        },
        apmID: {
          ____label: "Client Application AbstractProcessModel ID",
          ____description: "A developer-defined IRUT-format string to be used as the AbstractProcessModel ID for the APM synthesized by this factory filter.",
          ____accept: "jsString"
        },
        // appCommonKernelConfig: holisticAppCommon.appCommonKernelCellModelFactory.filterDescriptor.inputFilterSpec,
        appClientKernelIntegrations: {
          // TODO: Rename to appClientKernelC
          ____label: "Application Client Kernel Integrations",
          ____description: "A descriptor object used to define application-specific behaviors required by the @encapsule/holistic-app-client-cm RTL-provided HolisticAppClientKernel APM.",
          ____types: "jsObject",
          ____defaultValue: {},
          // Note that you provide the bodyFunction's. But, the input and output filter specifications for the synthesized ControllerAction plug-ins inferred here
          // are set and controlled by this factory (as they are closely-coupled to @encapsule/holistic-app-client-cm HolisticAppClientKernel CellModel and its submodels).
          lifecycleSignalActions: {
            ____types: "jsObject",
            ____defaultValue: {},
            initFunction: {
              ____label: "Application Client Lifecyle Signal Action: Initialize",
              ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.init ControllerAction plug-in.",
              ____accept: "jsFunction",
              ____defaultValue: function ____defaultValue(request_) {
                console.log("[".concat(filterDeclaration.operationID, "::").concat(filterDeclaration.operationName, "] WARNING: No holistic.app.client.lifecycle.init signal action was registered. USING DEFAULT HANDLER (does nothing)."));
                return {
                  error: null
                };
              }
            },
            queryFunction: {
              ____label: "Application Client Lifecycle Signal Action: Query",
              ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.query ControllerAction plug-in.",
              ____accept: "jsFunction",
              ____defaultValue: function ____defaultValue(request_) {
                console.log("[".concat(filterDeclaration.operationID, "::").concat(filterDeclaration.operationName, "] WARNING: No holistic.app.client.lifecycle.query signal action was registered. USING DEFAULT HANDLER (does nothing)."));
                return {
                  error: null
                };
              }
            },
            deserializeFunction: {
              ____label: "Application Client Lifecycle Signal Action: Deserialize",
              ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.deserialize ControllerAction plug-in.",
              ____accept: "jsFunction",
              ____defaultValue: function ____defaultValue(request_) {
                console.log("[".concat(filterDeclaration.operationID, "::").concat(filterDeclaration.operationName, "] WARNING: No holistic.app.client.lifecycle.deserialize signal action was registered. USING DEFAULT HANDLER (does nothing)."));
                return {
                  error: null
                };
              }
            },
            configFunction: {
              ____label: "Application Client Lifecycle Signal Action: Config",
              ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.config ControllerAction plug-in.",
              ____accept: "jsFunction",
              ____defaultValue: function ____defaultValue(request_) {
                console.log("[".concat(filterDeclaration.operationID, "::").concat(filterDeclaration.operationName, "] WARNING: No holistic.app.client.lifecycle.config signal action was registered. USING DEFAULT HANDLER (does nothing)."));
                return {
                  error: null
                };
              }
            },
            startFunction: {
              ____label: "Application Client Lifecycle Signal Action: Start",
              ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.start ControllerAction plug-in.",
              ____accept: "jsFunction",
              ____defaultValue: function ____defaultValue(request_) {
                console.log("[".concat(filterDeclaration.operationID, "::").concat(filterDeclaration.operationName, "] WARNING: No holistic.app.client.lifecycle.start signal action registered. USING DEFAULT HANDLER (does nothing)."));
                return {
                  error: null
                };
              }
            },
            hashrouteFunction: {
              ____label: "Application Client Lifecycle Signal Action: Hashroute",
              ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.hashroute ControllerAction plug-in.",
              ____accept: "jsFunction",
              ____defaultValue: function ____defaultValue(request_) {
                console.log("".concat(filterDeclaration.operationID, "::").concat(filterDeclaration.operationName, "] WARNING: No holistic.app.client.lifecycle.hashroute signal action registered. USING DEFAULT HANDLER (does nothing)."));
                return {
                  error: null
                };
              }
            },
            errorFunction: {
              ____label: "Application Client Lifecycle Signal Action: Error",
              ____description: "A filter bodyFunction that defines client application-specific behaviors for the synthesized CellModel's holistic.app.client.lifecycle.error ControllerAction plug-in.",
              ____accept: "jsFunction",
              ____defaultValue: function ____defaultValue(request_) {
                console.log("[".concat(filterDeclaration.operationID, "::").concat(filterDeclaration.operationName, "] WARNING: holistic.app.client.lifecycle.error signal action registerd. USING DEFAULT HANDLER (overrides client app display to show error(s))."));
                return {
                  error: null
                };
              }
            }
          } // lifecycleSignalActions

        },
        appClientCellModelLibrary: {
          ____label: "Client Application CellModels",
          ____description: "An array of application-defined CellModel artifacts to be included in the synthesized app client CellModel.",
          ____types: "jsArray",
          ____defaultValue: [],
          cellModel: {
            ____label: "Client Application CellModel Registration",
            ____description: "A reference to a client application-specific CellModel to be included in the synthesized app client CellModel.",
            ____accept: "jsObject"
          }
        }
      },
      outputFilterSpec: {
        ____label: "Holistic App Client CellModel",
        ____description: "Pass this CellModel to CellProcessor constructor function and then activate a cell process with the APM ID you specified to start the HTML5 client application service.",
        ____accept: "jsObject"
      },
      bodyFunction: function bodyFunction(clientFactoryRequest_) {
        var response = {
          error: null
        };
        var errors = [];
        var inBreakScope = false;

        while (!inBreakScope) {
          inBreakScope = true;
          var appClientCellModel = new holarchy.CellModel({
            // CellModel declaration description object.
            id: clientFactoryRequest_.cellModelID,
            name: "".concat(clientFactoryRequest_.name, " App Client (synthesized)"),
            description: "Synthesized holistic app client runtime CellModel for derived application '".concat(clientFactoryRequest_.name, "'."),
            apm: {
              // AbstractProcessModel declaration descriptor object
              id: clientFactoryRequest_.apmID,
              name: "".concat(clientFactoryRequest_.name, " App Client Runtime (synthesized)"),
              description: "Synthesized holistic app client runtime AbstractProcessModel for derived application '".concat(clientFactoryRequest_.name, "'."),
              ocdDataSpec: {
                ____label: "".concat(clientFactoryRequest_.name, " App Client Process Memory"),
                ____description: "ObservableControllerData specification for APM ID '".concat(clientFactoryRequest_.apmID, "'."),
                ____types: "jsObject",
                ____defaultValue: {},
                kernelProxy: {
                  ____types: "jsObject",
                  ____appdsl: {
                    apm: "CPPU-UPgS8eWiMap3Ixovg"
                    /* cell proxy APM */

                  }
                },
                locationProxy: {
                  ____types: "jsObject",
                  ____appdsl: {
                    apm: "CPPU-UPgS8eWiMap3Ixovg"
                    /* cell proxy APM */

                  }
                },
                displayProxy: {
                  ____types: "jsObject",
                  ____appdsl: {
                    apm: "CPPU-UPgS8eWiMap3Ixovg"
                    /* cell proxy APM */

                  }
                }
              },
              // ocdDataSpec
              steps: {
                uninitialized: {
                  description: "Default APM starting step.",
                  transitions: [{
                    transitionIf: {
                      always: true
                    },
                    nextStep: "app-client-wait-kernel-config"
                  }]
                },
                "app-client-wait-kernel-config": {
                  description: "Derived app client process has been started by the app client kernel. Waiting for the kernel to finish configuring...",
                  transitions: [{
                    transitionIf: {
                      CellProcessor: {
                        proxy: {
                          proxyCoordinates: "#.kernelProxy",
                          connect: {
                            statusIs: "connected"
                          }
                        }
                      }
                    },
                    nextStep: "app-client-active"
                  }]
                },
                "app-client-active": {
                  description: "The derived app client process has been activated and is now interactive."
                }
              }
            },
            // apm
            subcells: [].concat(_toConsumableArray(clientFactoryRequest_.appClientCellModelLibrary), [require("./HolisticAppClientKernel")]),
            actions: [// ----------------------------------------------------------------
            // ControllerAction: holistic.app.client.boot
            {
              id: arccore.identifier.irut.fromReference("".concat(clientFactoryRequest_.cellModelID, "::holistic.app.client.start")).result,
              name: "".concat(clientFactoryRequest_.name, " App Client Process Boot Action"),
              description: "This action is called by the client.js bootstrap function to activate the ".concat(clientFactoryRequest_.name, " App Client cell process inside CellProcessor."),
              actionRequestSpec: {
                ____types: "jsObject",
                holistic: {
                  ____types: "jsObject",
                  app: {
                    ____types: "jsObject",
                    client: {
                      ____types: "jsObject",
                      boot: {
                        ____types: "jsObject" // TODO? Options?

                      }
                    }
                  }
                }
              },
              actionResultSpec: {
                ____opaque: true
                /* TODO */

              },
              bodyFunction: function bodyFunction(controllerActionRequest_) {
                var response = {
                  error: null
                };
                var errors = [];
                var inBreakScope = false;

                while (!inBreakScope) {
                  inBreakScope = true;
                  var actorName = "".concat(clientFactoryRequest_.name, " App Client Launcher");
                  var actResponse = controllerActionRequest_.context.act({
                    actorName: actorName,
                    actorTaskDescription: "Attempting to launch the Holistic App Client Kernel process on behalf of derived application '".concat(clientFactoryRequest_.name, "'."),
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          processCoordinates: {
                            apmID: "PPL45jw5RDWSMNsB97WIWg"
                            /* Holistic App Client Kernel */

                          },
                          activate: {
                            processData: {
                              derivedAppClientProcessCoordinates: {
                                apmID: clientFactoryRequest_.apmID
                              }
                            }
                          }
                        }
                      }
                    },
                    apmBindingPath: "~"
                  });

                  if (actResponse.error) {
                    errors.push(actResponse.error);
                    break;
                  }

                  var appClientKernelActivateResult = actResponse.result;
                  actResponse = controllerActionRequest_.context.act({
                    actorName: actorName,
                    actorTaskDescription: "Attempting to launch derived application '".concat(clientFactoryRequest_.name, "' process."),
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          processCoordinates: {
                            apmID: clientFactoryRequest_.apmID // X App Client (synthesized)

                          },
                          activate: {
                            processData: {
                              appClientRuntime: clientFactoryRequest_.appClientRuntimeProcessData
                            }
                          }
                        }
                      }
                    },
                    apmBindingPath: "~"
                  });

                  if (actResponse.error) {
                    errors.push(actResponse.error);
                    break;
                  }

                  break;
                }

                if (errors.length) {
                  response.error = errors.join(" ");
                }

                return response;
              }
            }, // ----------------------------------------------------------------
            // ControllerAction: holistic.app.client.lifecycle.init
            {
              id: arccore.identifier.irut.fromReference("".concat(clientFactoryRequest_.cellModelID, "::holistic.app.client.lifecycle.init")).result,
              name: "".concat(clientFactoryRequest_.name, " App Client Lifecycle Action: Init"),
              description: "This action is dispatched by the Holistic App Client Kernel cell process to give the ".concat(clientFactoryRequest_.name, " app client cell process an opportunity to configure/initialize any library and/or runtime code that is **EXTERNAL-ONLY** to this CellProcessor instance."),
              actionRequestSpec: {
                ____types: "jsObject",
                holistic: {
                  ____types: "jsObject",
                  app: {
                    ____types: "jsObject",
                    client: {
                      ____types: "jsObject",
                      lifecycle: {
                        ____types: "jsObject",
                        init: {
                          ____accept: "jsObject"
                        }
                      }
                    }
                  }
                }
              },
              actionResultSpec: {
                ____accept: "jsUndefined"
              },
              // The app client kernel does not care what the app client runtime does inside of its lifecycle init action.
              bodyFunction: clientFactoryRequest_.appClientKernelIntegrations.lifecycleSignalActions.initFunction
            }, // ----------------------------------------------------------------
            // ControllerAction: holistic.app.client.lifecycle.query
            {
              id: arccore.identifier.irut.fromReference("".concat(clientFactoryRequest_.cellModelID, "::holistic.app.client.lifecycle.query")).result,
              name: "".concat(clientFactoryRequest_.name, " App Client Lifecycle Action: Query"),
              description: "This action is dispatched by the Holistic App Client Kernel cell process to query the ".concat(clientFactoryRequest_.name, " derived app client process for its requirements and capabilities."),
              actionRequestSpec: {
                ____types: "jsObject",
                holistic: {
                  ____types: "jsObject",
                  app: {
                    ____types: "jsObject",
                    client: {
                      ____types: "jsObject",
                      lifecycle: {
                        ____types: "jsObject",
                        query: {
                          ____accept: "jsObject"
                        }
                      }
                    }
                  }
                }
              },
              actionResultSpec: {
                ____label: "Holistic App Client Runtime Query Result",
                ____types: "jsObject",
                ____defaultValue: {},
                appMetadata: {
                  ____label: "Application Common Metadata",
                  ____description: "The schema (via filter specs) and static values for derived-application-specific metadata that is presumed to be created by hand. Or, synthesized via some manual or automated build process to be used to answer app metadata queries from active cells.",
                  ____types: "jsObject",
                  constraints: {
                    ____label: "Application Common Metadata Contraints",
                    ____types: "jsObject",
                    org: {
                      ____label: "Organization Metadata Spec",
                      ____description: "A filter spec that constrains the data stored about the organization publishing this application/site/service.",
                      ____accept: "jsObject"
                    },
                    app: {
                      ____label: "Application Metadata Spec",
                      ____description: "A filter spec that constrains the data stored about this specific application/site/service.",
                      ____accept: "jsObject"
                    },
                    page: {
                      ____label: "Page Metadata Spec",
                      ____description: "A filter spec that constrains the data stored about a specific server synthesized page view (i.e. a serialized HTML5 app client process produced by a GET:/X service request that responded w/Content-Encoding: utf Content-Type: text/html).",
                      ____accept: "jsObject"
                    },
                    hashroute: {
                      ____label: "Hashroute Metadata Spec",
                      ____description: "A filter spec that constrains the data stored about a specific client-side hashroute. This information can be used for a variety of different purposes.",
                      ____accept: "jsObject"
                    }
                  },
                  values: {
                    ____label: "Application Common Metadata Values",
                    ____description: "Application-specific metadata values to be used to build the holistic app metadata digraph that services app metadata queries from active cells in the app client cellplane.",
                    ____types: "jsObject",
                    org: {
                      ____accept: "jsObject"
                    },
                    app: {
                      ____accept: "jsObject"
                    },
                    pages: {
                      ____accept: "jsObject"
                    },
                    hashroutes: {
                      ____accept: "jsObject"
                    }
                  }
                },
                d2r2ComponentsArray: {
                  ____label: "Application-Defined d2r2 Components Array",
                  ____types: "jsArray",
                  ____defaultValue: [],
                  d2r2Component: {
                    ____accept: "jsObject"
                  }
                }
              },
              bodyFunction: clientFactoryRequest_.appClientKernelIntegrations.lifecycleSignalActions.queryFunction
            }, // ----------------------------------------------------------------
            // ControllerAction: holistic.app.client.lifecycle.deserialize
            {
              id: arccore.identifier.irut.fromReference("".concat(clientFactoryRequest_.cellModelID, "::holistic.app.client.lifecycle.deserialize")).result,
              name: "".concat(clientFactoryRequest_.name, " App Client Lifecycle Action: Deserialize"),
              description: "This action is dispatched by the Holistic App Client Kernel cell process to give the ".concat(clientFactoryRequest_.name, " app client a copy of the document's bootROM data. And, to obtain from ").concat(clientFactoryRequest_.name, " app client an application-specific appBootROM object to be subsequently passed back to the config lifecycle action."),
              actionRequestSpec: {
                ____types: "jsObject",
                holistic: {
                  ____types: "jsObject",
                  app: {
                    ____types: "jsObject",
                    client: {
                      ____types: "jsObject",
                      lifecycle: {
                        ____types: "jsObject",
                        deserialize: {
                          ____types: "jsObject",
                          bootROMData: {
                            ____accept: "jsObject"
                          } // TODO: We will want to schematize this object when we bring holistic app server kernel online.

                        }
                      }
                    }
                  }
                }
              },
              actionResultSpec: {
                ____label: "Holistic App Client Runtime Deserialize Result",
                ____types: "jsObject",
                ____defaultValue: {},
                appBootROMData: {
                  ____description: "An opaque, application-defined object returned by the derived app client runtime process in response to the deserialize lifecycle event. This object is passed back to the derived app client runtime process via action request during subsequent kernel dispatch of the config lifecycle action.",
                  ____accept: "jsObject",
                  ____defaultValue: {}
                }
              },
              bodyFunction: clientFactoryRequest_.appClientKernelIntegrations.lifecycleSignalActions.deserializeFunction
            }, // ----------------------------------------------------------------
            // ControllerAction: holistic.app.client.lifecycle.config
            {
              id: arccore.identifier.irut.fromReference("".concat(clientFactoryRequest_.cellModelID, "::holistic.app.client.lifecycle.config")).result,
              name: "".concat(clientFactoryRequest_.name, " App Client Lifecycle Action: Config"),
              description: "This action is invoked by the Holistic App Client Kernel process to inform the ".concat(clientFactoryRequest_.name, " app client process to configure itself and perform final preparation before the kernel dispatches the start lifecycle action."),
              actionRequestSpec: {
                ____types: "jsObject",
                holistic: {
                  ____types: "jsObject",
                  app: {
                    ____types: "jsObject",
                    client: {
                      ____types: "jsObject",
                      lifecycle: {
                        ____types: "jsObject",
                        config: {
                          ____types: "jsObject",
                          appInitialClientRoute: {
                            ____opaque: true
                          },
                          // TODO: not even sure I want/need this yet.
                          appBootROMData: {
                            ____accept: "jsObject"
                          },
                          appRuntimeServiceProcesses: {
                            ____types: "jsObject",
                            appClientKernelProcessID: {
                              ____accept: "jsString"
                            },
                            d2r2DisplayAdapterProcessID: {
                              ____accept: "jsString"
                            },
                            domLocationProcessorProcessID: {
                              ____accept: "jsString"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              actionResultSpec: {
                ____accept: "jsUndefined"
                /*currently we take nothing back*/

              },
              bodyFunction: clientFactoryRequest_.appClientKernelIntegrations.lifecycleSignalActions.configFunction
            }, // ----------------------------------------------------------------
            // ControllerAction: holistic.app.client.lifecycle.start
            {
              id: arccore.identifier.irut.fromReference("".concat(clientFactoryRequest_.cellModelID, "::holistic.app.client.lifecycle.start")).result,
              name: "".concat(clientFactoryRequest_.name, " App Client Lifecycle Action: Start"),
              description: "This action is invoked by the Holistic App Client Kernel process to inform the ".concat(clientFactoryRequest_.name, " app client process that the app client bootstrap process has completed, all app client kernel services are configured and ready, and that the visible DOM display surface is interactive."),
              actionRequestSpec: {
                ____types: "jsObject",
                holistic: {
                  ____types: "jsObject",
                  app: {
                    ____types: "jsObject",
                    client: {
                      ____types: "jsObject",
                      lifecycle: {
                        ____types: "jsObject",
                        start: {
                          ____accept: "jsObject"
                        }
                      }
                    }
                  }
                }
              },
              actionResultSpec: {
                ____opaque: true
                /*TODO*/

              },
              bodyFunction: clientFactoryRequest_.appClientKernelIntegrations.lifecycleSignalActions.startFunction
            }, // ----------------------------------------------------------------
            // ControllerAction: holistic.app.client.lifecycle.hashroute
            {
              id: arccore.identifier.irut.fromReference("".concat(clientFactoryRequest_.cellModelID, "::holistic.app.client.lifecycle.hashroute")).result,
              name: "".concat(clientFactoryRequest_.name, " App Client Lifecycle Action: Hashroute"),
              description: "This action is invoked by the Holistic App Client Kernel process to inform the ".concat(clientFactoryRequest_.name, " app client process that the user has updated the browser tab's hashroute."),
              actionRequestSpec: {
                ____types: "jsObject",
                holistic: {
                  ____types: "jsObject",
                  app: {
                    ____types: "jsObject",
                    client: {
                      ____types: "jsObject",
                      lifecycle: {
                        ____types: "jsObject",
                        hashroute: {
                          ____accept: "jsObject" // TODO: This is information that will be sourced from the DOMLocationProcessor singleton cell process.
                          // Need to add it to the filter spec so that developers can understand what they're being sent.

                        }
                      }
                    }
                  }
                }
              },
              actionResultSpec: {
                ____opaque: true
                /*TODO*/

              },
              bodyFunction: clientFactoryRequest_.appClientKernelIntegrations.lifecycleSignalActions.hashrouteFunction
            }, // ----------------------------------------------------------------
            // ControllerAction: holistic.app.client.lifecycle.error
            {
              id: arccore.identifier.irut.fromReference("".concat(clientFactoryRequest_.cellModelID, "::holistic.app.client.lifecycle.error")).result,
              name: "".concat(clientFactoryRequest_.name, " App Client Lifecycle Action: Error"),
              description: "This action is invoked by the Holistic App Client Kernel process to inform the ".concat(clientFactoryRequest_.name, " app client process of the occurance of runtime cell plane evaluation errors."),
              actionRequestSpec: {
                ____types: "jsObject",
                holistic: {
                  ____types: "jsObject",
                  app: {
                    ____types: "jsObject",
                    client: {
                      ____types: "jsObject",
                      lifecycle: {
                        ____types: "jsObject",
                        error: {
                          ____types: "jsObject",
                          lifecyclePhase: {
                            ____accept: "jsString",
                            ____inValueSet: [// Whatever error is indicated by badResponse is fatal; the app client service process cannot be started.
                            "app-client-boot", // Whatever error is indicated by badResponse is considered anomalous by the app client kernel
                            // and is likely an indication of a fatal application-level error (and likely active cells
                            // that are no longer being evaluated due to evaluation error(s)). But, we just pass this along
                            // here and keep the app client kernel and all other subsystems active.
                            "app-client-runtime"]
                          },
                          kernelProcessStep: {
                            ____accept: "jsString"
                          },
                          errorType: {
                            ____accept: "jsString",
                            ____inValueSet: [// An unhandled/unexpected error occurred when an external actor called CellProcessor.act.
                            // Or, a closure scope inside of a ControllerAction calls OPC.act in an async callback.
                            "action-error", // An unhandled/unexpected error occurred during OPC._evaluate cell plane evaluation that
                            // was undertaken in response to some external actor request to CellProcessor.act/OPC.act.
                            "evaluation-error"]
                          },
                          badResponse: {
                            ____accept: "jsObject"
                          }
                        }
                      }
                    }
                  }
                }
              },
              actionResultSpec: {
                ____accept: "jsString",
                ____defaultValue: "okay"
              },
              bodyFunction: clientFactoryRequest_.appClientKernelIntegrations.lifecycleSignalActions.errorFunction
            }]
          });

          if (!appClientCellModel.isValid()) {
            errors.push(appClientCellModel.toJSON());
            break;
          }

          response.result = appClientCellModel;
          break;
        }

        if (errors.length) {
          response.error = errors.join(" ");
        }

        return response;
      }
    };
    var factoryResponse = arccore.filter.create(filterDeclaration);

    if (factoryResponse.error) {
      throw new Error("Logical error in module initialization is preventing module load: ".concat(factoryResponse.error));
    }

    module.exports = factoryResponse.result;
  } catch (exception_) {
    throw new Error("Fatal exception in module implementation is preventing module load: ".concat(exception_.stack));
  }
})();