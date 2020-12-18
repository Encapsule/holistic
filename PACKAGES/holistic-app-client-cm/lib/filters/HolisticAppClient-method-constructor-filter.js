"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// HolisticAppClientService-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var holarchy = require("@encapsule/holarchy");

var d2r2 = require("@encapsule/d2r2");

var tabServiceCellModelFactory = require("../../HolisticAppClientKernel");

var factoryResponse = arccore.filter.create({
  operationID: "Jrc6uiRXS-aCNcQEDNcTug",
  operationName: "HolisticAppClientService::constructor Filter",
  operationDescription: "Validates/normalizes a HolisticAppClientService::constructor function request descriptor object. And, returns the new instance's private state data.",
  inputFilterSpec: require("./iospecs/HolisticAppClient-method-constructor-filter-input-spec"),
  outputFilterSpec: require("./iospecs/HolisticAppClient-method-constructor-filter-output-spec"),
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var appBuild = request_.appServiceCore.getAppBuild();
      response.result = {
        serviceModel: null,
        serviceRuntime: null
      }; // TODO: We need some stable ID's. I think these should come from appServiceCore? Yea - let's not fuck around...
      // The issue is that ultimately these keys underpin invariant assumptions we want to make about the location
      // of various cells in Node.js service cellplane and tab service cellplane... More about this when there's more time...
      // TODO: Yea - 2nd thought the way I want to do it will take an hour that doesn't need to be done now
      // in order to get the current tab service infrastructure dialed back online w/the re-integrated
      // v0.0.49-spectrolite Node.js service infrastructure.

      var tabServiceCellModelID = arccore.identifier.irut.fromReference("HolisticTabService.CellModel_1sJqGmKgTPGvPnmce3mlHg_".concat(appBuild.app.name)).result; // whatever really so long as it's stable. Here the generated IRUT is stable on appBuild.app.name which is likely okay for most people (defined by developer in holistic-app.json manifest).

      var tabServiceAPMID = arccore.identifier.irut.fromReference("HolisticTabService.APM_V8HWzGZPQRGXDCEtTpZAMg_".concat(appBuild.app.name)).result; // as above

      var tabServiceCellProcessorID = arccore.identifier.irut.fromReference("HolisticTabService.CellProcessor_1CBI_pNOSoyZDXK4iX77PA_".concat(appBuild.app.name)).result; // as above
      // v0.0.49-spectrolite
      // Now, let's build a specialized tab service kernel CellModel for this app service.

      var factoryResponse = tabServiceCellModelFactory.request({
        appBuild: appBuild,
        appModels: {
          display: {
            targetDOMElementID: request_.appServiceCore.getTargetDOMElementID(),
            d2r2Components: [].concat(_toConsumableArray(request_.appServiceCore.getDisplayComponents()), _toConsumableArray(request_.appModels.display.d2r2Components))
          }
        }
      });

      if (factoryResponse.error) {
        errors.push("Unable to synthesize a tab service kernel CellModel for use by ".concat(appBuild.app.name, " tab service due to error:"));
        errors.push(factoryResponse.error);
        return "break";
      }

      var tabServiceKernelCellModel = factoryResponse.result; // Now, let's go build the final tab service CellModel that represents all the platform and app-specific behaviors required by the tab service runtime.

      var tabServiceCellModel = new holarchy.CellModel({
        // CellModel declaration description object.
        id: tabServiceCellModelID,
        name: "".concat(appBuild.app.name, " Tab Service Model (synthesized)"),
        description: "Synthesized HolisticTabService runtime CellModel specialized for app service '".concat(appBuild.app.name, "'."),
        apm: {
          // AbstractProcessModel declaration descriptor object
          id: tabServiceAPMID,
          name: "".concat(appBuild.app.name, " Tab Service Process (synthesized)"),
          description: "Synthesized HolisticTabService runtime AbstractProcessModel for app service '".concat(appBuild.app.name, "'."),
          ocdDataSpec: {
            ____label: "".concat(appBuild.app.name, " Tab Service Process Memory"),
            ____description: "The ObservableControllerData filter spec for APM ID '".concat(tabServiceAPMID, "' (").concat(appBuild.app.name, " synthesized tab service CellModel) that defines APM's cell memory data format."),
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
        // TODO: We have work to do before we do this definition synthesis in order to pre-process the registration set.
        subcells: [].concat(_toConsumableArray(request_.appServiceCore.getCellModels()), _toConsumableArray(request_.appModels.cellModels), [// All the CellModels registered by the developer via HolisticTabService::constructor request.
        tabServiceKernelCellModel // The synthesized tab service kernel CellModel.
        ]),
        actions: [// ----------------------------------------------------------------
        // ControllerAction: holistic.app.client.boot
        {
          id: arccore.identifier.irut.fromReference("".concat(tabServiceCellModelID, "::holistic.app.client.start")).result,
          name: "".concat(appBuild.app.name, " Tab Service Boot Action"),
          description: "This action is called by HolisticTabService.start method (typically in SOURCES/CLIENT/client.js) to boot the tab service's re-activation sequence and bring it out of its suspended state as an lifeless HTML5 document.",
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
            /* TODO - if not going to extend then lets accept nothing and be clear about it? */

          },
          bodyFunction: function bodyFunction(controllerActionRequest_) {
            var response = {
              error: null
            };
            var errors = [];
            var inBreakScope = false;

            while (!inBreakScope) {
              inBreakScope = true;
              var actorName = "".concat(appBuild.app.name, " App Client Launcher");
              var actResponse = controllerActionRequest_.context.act({
                actorName: actorName,
                actorTaskDescription: "Attempting to launch the Holistic App Client Kernel process on behalf of derived application '".concat(appBuild.app.name, "'."),
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
                            apmID: tabServiceAPMID
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
                actorTaskDescription: "Attempting to launch derived application '".concat(appBuild.app.name, "' process."),
                actionRequest: {
                  CellProcessor: {
                    process: {
                      processCoordinates: {
                        apmID: tabServiceAPMID // X tab service APM ID (synthesized)

                      },
                      activate: {
                        processData: {
                          appClientRuntime: undefined // v0.0.49-spectrolite --- take the default here for now and let tabService APM sort it out in its OCD spec.

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
          id: arccore.identifier.irut.fromReference("".concat(tabServiceCellModelID, "::holistic.app.client.lifecycle.init")).result,
          name: "".concat(appBuild.app.name, " App Client Lifecycle Action: Init"),
          description: "This action is dispatched by the tab service kernel to inform ".concat(appBuild.app.name, " service logic that it is time to configure/initialize any library and/or runtime code that is **EXTERNAL** to the tab service instance. It's unclear anybody actually needs this. If not, then it will get removed."),
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
          bodyFunction: request_.appModels.tabServiceConfig.lifecycle.initFunction
        }, // ----------------------------------------------------------------
        // ControllerAction: holistic.app.client.lifecycle.query
        {
          id: arccore.identifier.irut.fromReference("".concat(tabServiceCellModelID, "::holistic.app.client.lifecycle.query")).result,
          name: "".concat(appBuild.app.name, " App Client Lifecycle Action: Query"),
          description: "This action is dispatched by the tab service kernel to query ".concat(appBuild.app.name, " service logic for runtime config and init options known only once the tab service boot process starts."),
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
            ____defaultValue: {} // NOPE: in v0.0.49-spectrolite these are not handled at tab service boot because metadata is cooked now in HolisticServiceCore for everyone at all layers.
            // And, we now explicitly manage d2r2 components as input "appModels" and now derive the d2r2 component set from a merge of multiple app service and platform service sources.
            // This here was a foolish mistake that violates a lot of my own rules. Getting it the hell out of here now is overdue.

            /*
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
                    org: { ____accept: "jsObject" },
                    app: { ____accept: "jsObject" },
                    pages: { ____accept: "jsObject" },
                    hashroutes: { ____accept: "jsObject" }
                }
             },
            d2r2ComponentsArray: {
                ____label: "Application-Defined d2r2 Components Array",
                ____types: "jsArray",
                ____defaultValue: [],
                d2r2Component: { ____accept: "jsObject" }
            }
            */

          },
          bodyFunction: request_.appModels.tabServiceConfig.lifecycle.queryFunction
        }, // ----------------------------------------------------------------
        // ControllerAction: holistic.app.client.lifecycle.deserialize
        {
          id: arccore.identifier.irut.fromReference("".concat(tabServiceCellModelID, "::holistic.app.client.lifecycle.deserialize")).result,
          name: "".concat(appBuild.app.name, " App Client Lifecycle Action: Deserialize"),
          description: "This action is dispatched by the tab service kernel to give the ".concat(appBuild.app.name, " service logic a chance to deserialize app-specific portions of the tab service's bootROM data."),
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
                      } // TODO: We will want to schematize this object when we bring holistic app server kernel online. v0.0.49-spectrolite yes we do...

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
          bodyFunction: request_.appModels.tabServiceConfig.lifecycle.deserializeFunction
        }, // ----------------------------------------------------------------
        // ControllerAction: holistic.app.client.lifecycle.config
        {
          id: arccore.identifier.irut.fromReference("".concat(tabServiceCellModelID, "::holistic.app.client.lifecycle.config")).result,
          name: "".concat(appBuild.app.name, " App Client Lifecycle Action: Config"),
          description: "This action is invoked by the tab service kernel to inform ".concat(appBuild.app.name, " service logic to configure itself and perform its final preparation(s) (if any) in advance of receipt of lifecycle 'start' action."),
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
                      // TODO: Schematize
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
          bodyFunction: request_.appModels.tabServiceConfig.lifecycle.configFunction
        }, // ----------------------------------------------------------------
        // ControllerAction: holistic.app.client.lifecycle.start
        {
          id: arccore.identifier.irut.fromReference("".concat(tabServiceCellModelID, "::holistic.app.client.lifecycle.start")).result,
          name: "".concat(appBuild.app.name, " App Client Lifecycle Action: Start"),
          description: "This action is invoked by the tab service kernel to inform ".concat(appBuild.app.name, " service logic that the kernel has completed its boot process and is yielding control of the tab service to {$appBuild.app.name} service logic."),
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
          bodyFunction: request_.appModels.tabServiceConfig.lifecycle.startFunction
        }, // ----------------------------------------------------------------
        // ControllerAction: holistic.app.client.lifecycle.hashroute
        {
          id: arccore.identifier.irut.fromReference("".concat(tabServiceCellModelID, "::holistic.app.client.lifecycle.hashroute")).result,
          name: "".concat(appBuild.app.name, " App Client Lifecycle Action: Hashroute"),
          description: "This action is invoked by the tab service kernel to inform ".concat(appBuild.app.name, " service logic that a hash change event has been fired by the DOM indicating a user modification (via their browser e.g. forward/back/manual/bookmark/link) or programmatic (via window.replace/window.location=) update of current tab service routing info."),
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
                      ____label: "DOM Location Router Event Descriptor",
                      ____description: "A descriptor object containing information about the hashroute change event created by the DOMLocationProcessor.",
                      ____types: "jsObject",
                      actor: {
                        ____label: "Event Source Actor",
                        ____description: "A string enumeration value indicating the actor that caused the hashroute change event to occur.",
                        ____accept: "jsString",
                        ____inValueSet: [// TODO: There is a small set of potential actors that may trigger a hashroute change event.
                        // It's useful probably to report them accurately. Currently, it's half-baked and of little
                        // more use than the counter value.
                        "user", // the hashroute change event was triggered by user interaction with the browser.
                        "server", // the hashroute change event was triggered by app client kernel (this is an old label with a bad name).
                        "app" // ? Not sure
                        ]
                      },
                      hashrouteString: {
                        ____label: "Hashroute String",
                        ____description: "The unparsed hashroute string extracted from the current location.href value. Note that there are no official parsing rules for hashroute strings. We impose some predictable guiderails.",
                        ____accept: "jsString"
                      },
                      hashrouteParse: {
                        ____label: "Hashroute Parse Descriptor",
                        ____description: "The hashroute string parsed into a descriptor that includes unparsed search and query subproperties.",
                        ____types: "jsObject",
                        pathname: {
                          ____label: "Hashroute Pathname",
                          ____description: "The hashroute pathname should be used as the a stable primary key for querying app metadata; it does not include any URL-encoded query parameter information.",
                          ____accept: "jsString"
                        },
                        path: {
                          ____label: "Hashroute Path",
                          ____description: "The hashroute path is is similar to the pathname except that it contains the URL-encoded query parameter(s) if they're present in hashrouteString.",
                          ____accept: "jsString"
                        },
                        search: {
                          ____label: "Unparsed Search Parameters",
                          ____accept: ["jsNull", "jsString"]
                        },
                        query: {
                          ____label: "Unparsed Query Parameters",
                          ____accept: ["jsNull", "jsString"]
                        }
                      },
                      hashrouteQueryParse: {
                        ____label: "Hashroute Query Parse Descriptor",
                        ____accept: "jsObject" // TODO

                      },
                      routerEventNumber: {
                        ____accept: "jsNumber"
                      }
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
          bodyFunction: request_.appModels.tabServiceConfig.lifecycle.hashrouteFunction
        }, // ----------------------------------------------------------------
        // ControllerAction: holistic.app.client.lifecycle.error
        {
          id: arccore.identifier.irut.fromReference("".concat(tabServiceCellModelID, "::holistic.app.client.lifecycle.error")).result,
          name: "".concat(appBuild.app.name, " App Client Lifecycle Action: Error"),
          description: "This action is invoked by the tab service kernel to inform ".concat(appBuild.app.name, " service logic that one or more unrecoverable runtime cellplane evaluation faults (errors) have occurred."),
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
          bodyFunction: request_.appModels.tabServiceConfig.lifecycle.errorFunction
        }]
      }); // new CellModel

      if (!tabServiceCellModel.isValid()) {
        errors.push("Unable to synthesize the ".concat(appBuild.app.name, " tab service's main @encapsule/holarchy CellModel due to error:"));
        errors.push(tabServiceCellModel.toJSON());
        return "break";
      }

      response.result.serviceModel = tabServiceCellModel; // And, finally... Load the service cell model into a new CellProcessor instance
      // and let the cell process manager initialize.

      var tabServiceRuntime = new holarchy.CellProcessor({
        id: tabServiceCellProcessorID,
        name: appBuild.app.name,
        description: "".concat(appBuild.app.name, " Tab Service Runtime"),
        cellmodel: tabServiceCellModel
      });

      if (!tabServiceRuntime.isValid()) {
        errors.push("Unable to initialize the ".concat(appBuild.app.name, " tab service's @encapsule/holarchy CellProcessor runtime host due to error:"));
        errors.push(tabServiceRuntime.toJSON());
        return "break";
      }

      response.result.serviceRuntime = tabServiceRuntime;
      /*
        /// NO NO ---- NOT HERE. This happens upstairs in HolisticTabService.boot() method.
      // START THE APP CLIENT CELL PROCESS
      stopwatch.mark("... calling CellProcessor.act to create Holistic App Client Kernel process.");
      clientBootstrapPhaseMessage = "vp5_client_bootstrap_start_client_app_kernel";
      let actResponse;
      actResponse = window.vpcp.act({
          actorName: "Viewpath5 App Client Bootstrap",
          actorTaskDescription: "Attempt to activate the Viewpath5 app client process.",
          actionRequest: { holistic: { app: { client: { boot: {} } } } }
      });
      if (actResponse.error) {
          error = { phase: clientBootstrapPhaseMessage, message: actResponse.error  };
          break;
      }
      */

      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
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

module.exports = factoryResponse.result;