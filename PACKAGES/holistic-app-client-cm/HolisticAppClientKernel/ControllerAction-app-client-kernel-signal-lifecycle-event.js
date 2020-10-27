"use strict";

// ControllerAction-app-client-kernel-signal-lifecycle-event.js
var holarchy = require("@encapsule/holarchy");

var controllerAction = new holarchy.ControllerAction({
  id: "mmLcuWywTe6lUL9OtMJisg",
  name: "Holistic App Client Kernel: Signal Lifecycle Event",
  description: "Forwards a holistic app client lifecycle signal to the derived client application's daemon proces.",
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
      console.log("".concat(actorName, " signalling lifecycle event '").concat(messageBody.eventLabel, "'..."));
      var ocdResponse = request_.context.ocdi.getNamespaceSpec(request_.context.apmBindingPath);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var namespaceSpec = ocdResponse.result;

      if (!namespaceSpec.____appdsl || !namespaceSpec.____appdsl.apm || namespaceSpec.____appdsl.apm !== "PPL45jw5RDWSMNsB97WIWg") {
        errors("This action may only be called on a holistic app client kernel process.");
        break;
      }

      ocdResponse = request_.context.ocdi.readNamespace({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: "#._private"
      });

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var kernelPrivateData = ocdResponse.result;
      var actResponse = void 0;

      switch (messageBody.eventLabel) {
        case "init":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel init lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelPrivateData.derivedAppClientProcessCoordinates,
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

          break;

        case "query":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel query lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelPrivateData.derivedAppClientProcessCoordinates,
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

          break;

        case "deserialize":
          var bootROMElement = document.getElementById(kernelPrivateData.bootROMElementID);
          var bootDataBase64 = bootROMElement.textContent;
          var bootDataJSON = new Buffer(bootDataBase64, 'base64').toString('utf8');
          var bootROMData = JSON.parse(bootDataJSON);
          bootROMElement.parentNode.removeChild(bootROMElement); // delete the DOM node

          ocdResponse = request_.context.ocdi.writeNamespace({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: "#._private.bootROMData"
          }, bootROMData);

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel query lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelPrivateData.derivedAppClientProcessCoordinates,
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

          break;

        case "config":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel query lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelPrivateData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      holistic: {
                        app: {
                          client: {
                            lifecycle: {
                              config: {}
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

          break;

        case "start":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel query lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelPrivateData.derivedAppClientProcessCoordinates,
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

          break;

        case "error":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Delegating app client kernel query lifecycle event to the derived app client process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: kernelPrivateData.derivedAppClientProcessCoordinates,
                  delegate: {
                    actionRequest: {
                      holistic: {
                        app: {
                          client: {
                            lifecycle: {
                              error: {}
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

          break;

        default:
          errors.push("Unhandled eventLabel value '".concat(messageBody.eventLabel, "'."));
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