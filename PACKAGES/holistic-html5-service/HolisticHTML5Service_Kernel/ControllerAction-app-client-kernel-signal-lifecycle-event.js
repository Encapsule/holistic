"use strict";

// ControllerAction-app-client-kernel-signal-lifecycle-event.js
var holarchy = require("@encapsule/holarchy");

var hackLib = require("./lib"); // This action is never expected to be called by an external actor.
// It is only ever expected to be dispatched in response to a process
// step transition in the holistic app client kernel cell process.
// In this capacity, this action is very similar to this CellModel's
// "step worker" action in the way that functions to define the concrete
// runtime semantics of evaluating an holistic app client kernel cell.


var controllerAction = new holarchy.ControllerAction({
  id: "mmLcuWywTe6lUL9OtMJisg",
  name: "Holistic App Client Kernel: Signal Lifecycle Event",
  description: "Forwards a holistic app client lifecycle signal to the derived app client service process.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      app: {
        ____types: "jsObject",
        client: {
          ____types: "jsObject",
          kernel: {
            ____types: "jsObject",
            _private: {
              ____types: "jsObject",
              signalLifecycleEvent: {
                ____types: "jsObject",
                eventLabel: {
                  ____types: "jsString",
                  ____inValueSet: ["init", "query", "deserialize", "config", "start", "error"]
                }
              }
            }
          }
        }
      }
    }
  },
  actionResultSpec: {
    ____opaque: true
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var actorName = "[".concat(this.operationID, "::").concat(this.operationName, "]");
      var messageBody = request_.actionRequest.holistic.app.client.kernel._private.signalLifecycleEvent;
      console.log("".concat(actorName, " signaling lifecycle event '").concat(messageBody.eventLabel, "'..."));
      var hackLibResponse = hackLib.getStatus.request(request_.context);

      if (hackLibResponse.error) {
        errors.push(hackLibResponse.error);
        break;
      }

      var hackDescriptor = hackLibResponse.result;
      var kernelCellData = hackDescriptor.cellMemory;
      var actResponse = void 0,
          ocdResponse = void 0;

      switch (messageBody.eventLabel) {
        // ----------------------------------------------------------------
        case "init":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel init lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      holistic: {
                        app: {
                          client: {
                            lifecycle: {
                              init: {}
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          response.result = actResponse.result.actionResult;
          break;
        // ----------------------------------------------------------------

        case "query":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel query lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      holistic: {
                        app: {
                          client: {
                            lifecycle: {
                              query: {}
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          response.result = actResponse.result.actionResult;
          break;
        // ----------------------------------------------------------------

        case "deserialize":
          // At this point in the app client lifecycle, window.document.onload event has fired and the HTML5 document produced
          // by the holistic app server process when it synthesized the app client process (and then serialized it HTML5 over
          // HTTP to the user's browser agent) has loaded into the DOM. So, we can use DOM API's to retrieve the "bootROM"
          // data that the app server process spliced into the HTML5 document for us.
          var bootROMElement = document.getElementById(kernelCellData.bootROMElementID);
          var bootDataBase64 = bootROMElement.textContent;
          var bootDataJSON = new Buffer(bootDataBase64, 'base64').toString('utf8');
          var bootROMData = JSON.parse(bootDataJSON);
          bootROMElement.parentNode.removeChild(bootROMElement); // delete the DOM node

          ocdResponse = request_.context.ocdi.writeNamespace({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: "#.bootROMData"
          }, bootROMData);

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          } // v0.0.48-kyanite note:
          // We do not yet have @encapsule/holistic-app-server-cm RTL so must rely on the correctness of a derived holistic application's
          // app server process wrt synthesizing and serializing the HTML5 app client process we're currently in the act of deserializing
          // and re-activating in the browser tab. There are an unacceptably large number of ways that developers can currently violate
          // conventions and presumptions made by @encapsule/holistic-app-common-cm and @encapsule/holistic-app-client-cm CellModels.
          // So, we need to be very defensive at this stage of the app client process boot in order to try to ensure that all the flagrant
          // cases get caught and reported as error(s).


          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel deserialize lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      holistic: {
                        app: {
                          client: {
                            lifecycle: {
                              deserialize: {
                                bootROMData: bootROMData
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
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          response.result = actResponse.result.actionResult;
          break;
        // ----------------------------------------------------------------

        case "config":
          // Query Cell Process Manager ~
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Querying the holistic app client kernel cell process to obtain information about shared subsystem cell processes.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: "#",
                  query: {}
                }
              }
            },
            apmBindingPath: request_.context.apmBindingPath
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          var cellProcessQueryResult = actResponse.result.actionResult; // Connect the derived app client process kernel proxy back to us (the app client kernel).

          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Connecting derived app client process proxy helper cell back to the app client kernel process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        proxy: {
                          proxyCoordinates: "#.kernelProxy",
                          connect: {
                            processCoordinates: cellProcessQueryResult.query.cellProcessID
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          } // Connect the derived app client process display adapter proxy to the d2r2 display adapter app client kernel-managed service process.


          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Connected derived app client process proxy helper cell to kernel-provided display adapter service process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        proxy: {
                          proxyCoordinates: "#.displayProxy",
                          connect: {
                            processCoordinates: kernelCellData.serviceProcesses.d2r2DisplayAdapter.result.actionResult.cellProcessID
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          } // Connect the derived app client process DOM location processor proxy to the DOM location processor app client kernel-managed service process.


          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Connected derived app client process proxy helper cell to kernel-provided DOM location processor service process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      CellProcessor: {
                        proxy: {
                          proxyCoordinates: "#.locationProxy",
                          connect: {
                            processCoordinates: kernelCellData.serviceProcesses.domLocationProcessor.result.actionResult.cellProcessID
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          } // Query the derived app client process via lifecycle action.


          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel config lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      holistic: {
                        app: {
                          client: {
                            lifecycle: {
                              config: {
                                // TODO appInitialClientRoute (currently opaque so not an error but needed) likely by app client action implementation).
                                appBootROMData: kernelCellData.lifecycleResponses.deserialize.result.actionResult.appBootROMData,
                                appRuntimeServiceProcesses: {
                                  appClientKernelProcessID: cellProcessQueryResult.query.cellProcessID,
                                  d2r2DisplayAdapterProcessID: kernelCellData.serviceProcesses.d2r2DisplayAdapter.result.actionResult.cellProcessID,
                                  domLocationProcessorProcessID: kernelCellData.serviceProcesses.domLocationProcessor.result.actionResult.cellProcessID
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
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          response.result = actResponse.result.actionResult;
          break;
        // ----------------------------------------------------------------

        case "start":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel query lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      holistic: {
                        app: {
                          client: {
                            lifecycle: {
                              start: {}
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          response.result = actResponse.result.actionResult;
          break;
        // ----------------------------------------------------------------
        // OKAY... Wait a second... This is thought crime here.
        // The purpose of the private signal action is to provide
        // kernel APM process declaration w/action it can easily
        // use to orchestrate calls to the derived app client
        // service process. Does the kernel APM orchestrate error
        // notifications back to the derived app client proces via
        // a lifecycle action request via the signal lifecycle action?
        // NO NO NO NO. This is wrong I think.

        /*
        case "error":
        actResponse = request_.context.act({
            actorName,
            actorTaskDescription: "Delegating app client kernel query lifecycle event to the derived app client process.",
            actionRequest: {
                CellProcessor: {
                    cell: {
                        cellCoordinates: kernelCellData.derivedAppClientProcessCoordinates,
                        delegate: {
                            actionRequest: {
                                holistic: {
                                    app: {
                                        client: {
                                            lifecycle: {
                                                error: {
                                                    lifecyclePhase: ((kernelCellData.__apmiStep === "kernel-service-ready")?"app-client-runtime":"app-client-boot"),
                                                    kernelProcessStep: kernelCellData.__apmiStep,
                                                    errorType: "fatal-lifecycle-error",
                                                    badResponse: {
                                                        error: "Holistic app client kernel boot has failed. The derived app client service cannot be started.",
                                                        result: {
                                                            bootstrapFailureStep: kernelCellData.bootstrapFailureStep,
                                                            lifecycleResponses: kernelCellData.lifecycleResponses
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
                }
            }
        });
        if (actResponse.error) {
            errors.push(actResponse.error);
            break;
        }
        response.result = actResponse.result.actionResult;
        break;
        */
        // ----------------------------------------------------------------

        default:
          errors.push("INTERNAL ERROR: Unhandled eventLabel value '".concat(messageBody.eventLabel, "'."));
          break;
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;