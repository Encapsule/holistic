"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ControllerAction-app-client-kernel-step-worker.js
var holarchy = require("@encapsule/holarchy");

var hackLib = require("./lib"); // This action is never expected to be called by an external actor.
// It is only ever expected to be dispatched in response to a process
// step transition in the holistic app client kernel cell process.
// In more detail, this "step worker" action is "called" by OPC._evaluate when
// it is transitioning the app client kernel process between steps that declare
// enter/exit actions that OPC has delegated to us across the action request bus.
// Here in this "step worker" action we define the actual runtime semantics of these
// APM-declared process model orchestrations (i.e. concrete runtime interactions,
// internal/externally-visible side-effects etc.)


var controllerAction = new holarchy.ControllerAction({
  id: "4zsKHGrWRPm9fFa-RxsBuw",
  name: "Holistic App Client Kernel: Process Step Worker",
  description: "Performs actions on behalf of the Holistic App Client Kernel process.",
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
              stepWorker: {
                ____types: "jsObject",
                action: {
                  ____accept: "jsString",
                  ____inValueSet: ["noop", "activate-subprocesses", "deserialize-bootROM-data", "activate-display-adapter", "start-display-adapter", // After which the derived HTML5 service logic is actor who updates the display adapter
                  "relinquish-display-adapter"],
                  ____defaultValue: "noop"
                }
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
  bodyFunction: function bodyFunction(request_) {
    var _this = this;

    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var actorName = "[".concat(_this.operationID, "::").concat(_this.operationName, "]");
      var messageBody = request_.actionRequest.holistic.app.client.kernel._private.stepWorker;
      console.log("".concat(actorName, " processing \"").concat(messageBody.action, "\" request on behalf of app client kernel process."));
      var hackLibResponse = hackLib.getStatus.request(request_.context);

      if (hackLibResponse.error) {
        errors.push(hackLibResponse.error);
        return "break";
      }

      var hackDescriptor = hackLibResponse.result;
      var kernelCellData = hackDescriptor.cellMemory;
      var actResponse = void 0,
          ocdResponse = void 0;

      switch (messageBody.action) {
        case "noop":
          break;
        // ****************************************************************
        // ****************************************************************

        case "activate-subprocesses":
          // THIS IS WRONG (v0.0.49-spectrolite - Not sure this is still wrong but have not yet confirmed the full matrix of possibilities wrt metadata code paths yet)
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Activating derived AppMetadata process on behalf of the app client process.",
            actionRequest: {
              CellProcessor: {
                util: {
                  writeActionResponseToPath: {
                    dataPath: "#.serviceProcesses.appMetadata",
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          processCoordinates: {
                            apmID: "srjZAO8JQ2StYj07u_rgGg"
                            /* "Holistic App Common Kernel: App Metadata Process" */

                          },
                          activate: {
                            processData: {
                              construction: _objectSpread({}, kernelCellData.lifecycleResponses.query.result.actionResult.appMetadata)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: request_.context.apmBindingPath // this will be the holistic app client kernel process

          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Activating DOMLocationProcessor process on behalf of the app client kernel process.",
            actionRequest: {
              CellProcessor: {
                util: {
                  writeActionResponseToPath: {
                    dataPath: "#.serviceProcesses.domLocationProcessor",
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {
                            processData: {
                              derivedAppClientProcessCoordinates: kernelCellData.derivedAppClientProcessCoordinates
                            }
                          },
                          processCoordinates: {
                            apmID: "OWLoNENjQHOKMTCEeXkq2g"
                            /* "Holistic App Client Kernel: DOM Location Processor" */

                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: request_.context.apmBindingPath // this will be the holistic app client kernel process

          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Activating d2r2DisplayAdapter process on behalf of the app client kernel process.",
            actionRequest: {
              CellProcessor: {
                util: {
                  writeActionResponseToPath: {
                    dataPath: "#.serviceProcesses.d2r2DisplayAdapter",
                    actionRequest: {
                      CellProcessor: {
                        process: {
                          activate: {
                            processData: {
                              construction: {
                                d2r2Components: kernelCellData.lifecycleResponses.query.result.actionResult.d2r2ComponentsArray
                              }
                            }
                          },
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
            },
            apmBindingPath: request_.context.apmBindingPath // this will be the holistic app client kernel process

          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          } // TODO: Let's leave this out for now until the basic stuff is working end-to-end and requirements are less abstract.
          // { CellProcessor: { util: { writeActionResponseToPath: { dataPath: "#.serviceProcesses.clientViewProcessor", actionRequest: { CellProcessor: { process: { activate: {}, processCoordinates: { apmID: "Hsu-43zBRgqHItCPWPiBng" /* "Holistic App Client Kernel: Client View Processor" */ } } } } } } } },


          break;
        // ****************************************************************
        // ****************************************************************

        case "deserialize-bootROM-data":
          try {
            var bootROMElement = document.getElementById(kernelCellData.bootROMElementID);

            if (bootROMElement === null) {
              errors.push("Unexpected error in HolisticHTML5Service_Kernel process: Cannot locate DOM element '".concat(kernelCelLData.bootROMElementID, "' expected to contain the kernel's bootROM data."));
              break;
            }

            var bootDataString = bootROMElement.textContent;
            var bootDataShouldBeBase64 = Buffer.from(bootDataString, 'base64'); // Should return new Buffer containing deserialized base64-encoded bootROM data in JSON format. Or, Buffer.from will throw a TypeError exception if this presumption is not met.

            var bootDataShouldBeJSON = bootDataShouldBeBase64.toString("utf8"); // We expect this to be a JSON-encoded UTF-8 string. But, am only sure of that if we can actually deserialize it as JSON.

            var bootROMShouldBeValidData = JSON.parse(bootDataShouldBeJSON); // If the UTF-8 string is not valid JSON, then JSON.parse will throw a SyntaxError exception.
            // So now we have some in-memory data deserialized from JSON but have no idea what it is. Or, if it's valid.
            // There are many levels of meaning to this data potentially. Here we do not have nearly enough context to make those
            // decisions but do have the ability to write the deserialized bootROM data into the kernel process' OCD memory.
            // And, if this fails then we can stop the kernel from booting w/bad initial state.

            ocdResponse = request_.context.ocdi.writeNamespace({
              apmBindingPath: request_.context.apmBindingPath,
              dataPath: "#.bootROMData"
            }, bootROMShouldBeValidData);

            if (ocdResponse.error) {
              errors.push("Unexpected internal error in HolisticHTML5Service_Kernel process: Service bootROM data is invalid or corrupt; we cannot start the service kernel due to error:");
              errors.push(ocdResponse.error);
            } else {
              // Finally, if no errors remove the element from the DOM and free the heap occupied by the serialized copy that we have now deserialized into the kernel's cell memory.
              bootROMElement.parentNode.removeChild(bootROMElement); // delete the DOM node
            }
          } catch (exception_) {
            errors.push("Unexpected exception caught during HolisticHTML5Service kernel bootROM deserialization is preventing service boot:");
            errors.push(exception_.toString());
          }

          break;
        // ****************************************************************
        // ****************************************************************

        case "activate-display-adapter":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Sending initial layout request data to the app client display adapter to activate the display adapter process.",
            actionRequest: {
              holistic: {
                app: {
                  client: {
                    display: {
                      _private: {
                        activate: {
                          displayLayoutRequest: {
                            renderData: kernelCellData.bootROMData.initialDisplayData.renderData
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: request_.context.apmBindingPath // this will be the holistic app client kernel process

          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          break;
        // ****************************************************************
        // ****************************************************************

        case "start-display-adapter":
          actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Sending final kernel boot update to the display adapater and relinquishing responsibility for further updates to derived HTML5 app service logic.",
            actionRequest: {
              holistic: {
                app: {
                  client: {
                    display: {
                      update: {
                        thisProps: {
                          renderData: {
                            Viewpath5: {
                              pageview: {
                                loadingApp: {
                                  appStarted: true
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
            },
            apmBindingPath: request_.context.apmBindingPath // this will be the holistic app client kernel process

          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          var st = new Date().getTime();
          console.log("******************** DELAY TIMER STARTED ********************" + new Date().getTime());
          setTimeout(function () {
            var et = new Date().getTime();
            console.log("******************** DELAY TIMER FIRED ******************** ellaped " + (et - st) + "ms");
            request_.context.act({
              actorName: actorName,
              actorTaskDescription: "Relinquishing display adapter to derived HTML5 service logic.",
              actionRequest: {
                holistic: {
                  app: {
                    client: {
                      kernel: {
                        _private: {
                          stepWorker: {
                            action: "relinquish-display-adapter"
                          }
                        }
                      }
                    }
                  }
                }
              },
              apmBindingPath: request_.context.apmBindingPath
            });
          }, 500);
          break;

        case "relinquish-display-adapter":
          ocdResponse = request_.context.ocdi.writeNamespace({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: "#.displayReady"
          }, true);

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          break;

        default:
          errors.push("Internal error: unhandled action value \"".concat(messageBody.action, "\"."));
          break;
      }

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

if (!controllerAction.isValid()) {
  throw new Error(controllerAction.toJSON());
}

module.exports = controllerAction;