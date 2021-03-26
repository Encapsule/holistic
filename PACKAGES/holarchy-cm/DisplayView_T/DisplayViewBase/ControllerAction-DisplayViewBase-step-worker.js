"use strict";

// DisplayView_T/DisplayViewBase/ControllerAction-DisplayViewBase-step-worker.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var actionLabel = "stepWorker";
  var actionName = "".concat(cmLabel, " Private Step Worker");

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: actionName,
    description: "Implementation worker action for the DisplayViewBase CellModel.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            DisplayViewBase: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                stepWorker: {
                  ____types: "jsObject",
                  action: {
                    ____types: "jsString",
                    ____inValueSet: ["noop", "initialize", "update-view-display-context", "link-unlinked-view-displays", "resolve-pending-view-displays"]
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
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var libResponse = lib.getStatus.request(request_.context);

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var cellMemory = libResponse.result.cellMemory;
        var messageBody = request_.actionRequest.holarchy.common.actions.DisplayViewBase._private.stepWorker;
        var actResponse = void 0,
            ocdResponse = void 0;

        switch (messageBody.action) {
          case "noop":
            break;

          case "initialize":
            // Given the nature of the beast, we never know when we're activated exactly what role we're being activated to fullfill.
            // We presume (tentatively) that we're being activated to fill the role of root DisplayView_T (which is typically wrong assumption).
            // If this is the case, then HolisticHTML5Service_DisplayAdapter will be the cell that actually causes this DisplayView_T cell to
            // be activated and it will want/need to be able to read the DisplayView_T cell's d2r2 output message in order to render the root
            // (presumably some sort of page) ViewDisplay_T family React.Element via d2r2 <ComponentRouter/>. We queue a DACT (deferred action)
            // on our output so that any cell that queries will see hasUpdated === true. However, once it's clear that we're not to fill
            // the role of root (page-level DisplayView_T cell) we clear the DACT and proceeed with our standard process algorithm for
            // correlating and updating the d2r2 ObservableValue_T family cell output of this DisplayView_T cell.
            actResponse = request_.context.act({
              actorName: actionName,
              actorTaskDescription: "Registering a DACT on this DisplayView_T cell's d2r2 ObservableValue_T cell so if we're mounted as the root component, the HolisticHTML5Service_DisplayAdapter can read the DisplayView_T cell's default d2r2 message in order to start the linking and embedding process.",
              actionRequest: {
                holarchy: {
                  common: {
                    actions: {
                      ObservableValue: {
                        setDeferredAction: {
                          path: "#.outputs.displayView",
                          dact: {
                            holarchy: {
                              common: {
                                actions: {
                                  DisplayViewBase: {
                                    _private: {
                                      setAsRoot: {}
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
              },
              apmBindingPath: request_.context.apmBindingPath
            });

            if (actResponse.error) {
              errors.push(actResponse.error);
              break;
            } // Most DisplayView_T monitor a set of DataView_T (view process that correlates some number of input data streams).
            // The new DataGateway_T family of cells is an example. HolisticHTML5Service_DOMLocation, and
            // HolisticHTML5Service_UserLoginSession are several others. Developer's specify which if any fixed DataView_T cells
            // their specific DisplayView_T cell specialization will monitor and correlate via declarations passed into
            // DisplayView_T.synthesizeCellModel that the generator attaches to the synthesized APM ocdDataSpec as an ____appdsl
            // annotation. Here we go read the ____appdsl annotation and turn the design-time declarations into runtime
            // behavior by configuring this specific cell instance's to link to the specified DataView_T cell(s).


            ocdResponse = request_.context.ocdi.getNamespaceSpec(request_.context.apmBindingPath);

            if (ocdResponse.error) {
              errors.push(ocdResponse.error);
              break;
            }

            var displayViewSpec = ocdResponse.result;

            if (Object.keys(displayViewSpec.inputs.fixed.____appdsl.fixedInputBindings.dataViews).length !== 0) {
              actResponse = request_.context.act({
                actorName: actionName,
                actorTaskDescription: "Attempting to auto-link this DisplayView_T cell's declared fixed data view inputs...",
                actionRequest: {
                  holarchy: {
                    common: {
                      actions: {
                        ObservableValueHelperMap: {
                          addValues: {
                            path: "#.inputs.fixed.dataViews",
                            names: displayViewSpec.inputs.fixed.____appdsl.fixedInputBindings.dataViews
                          }
                        }
                      }
                    }
                  }
                },
                apmBindingPath: request_.context.apmBindingPath
              });

              if (actResponse.error) {
                errors.push(actResponse.error);
                break;
              }
            }

            break;

          case "update-view-display-context":
            cellMemory.core.viewDisplayProcess.thisRef.finalizeDisplayViewLink({
              apmBindingPath: request_.context.apmBindingPath
            });
            break;

          case "link-unlinked-view-displays":
            // Okay, so... We have ourselves (as in this cell) had our d2r2 ObservableValue_T read by someone
            // resulting in some or another "ViewDisplay" process (actually a mounted React.Element in the React-
            // managed VDOM) that has decided for whatever reason to inject an unlinked ViewDisplayProcess-derived
            // React.Element into the VDOM render tree. Here we resolve (link) these unlinked DisplayView processes
            // by walking the displayPath tree, creating new ObservableValueHelper entries in our ObservableValueHelperMap,
            // and in cases where the queued link requests are below our own immediate children (in the OVH map) we will
            // adjust and merely re-queue the request on the children (so that the process resolves via recursion through
            // the cells working in coordination w/their ViewDisplay processes and w/each other to re-stablilize the cell
            // plane w/all DisplayView_T family members in their quiescent process step.
            for (var i = 0; i < cellMemory.core.pendingViewDisplayQueue.length; i++) {
              var deferredViewDisplayLinkRequest = cellMemory.core.pendingViewDisplayQueue[i];
              var ourDisplayPathTokens = cellMemory.core.viewDisplayProcess.displayPath.split(".");
              var linkRequestDisplayPathTokens = deferredViewDisplayLinkRequest.reactElement.displayPath.split(".");

              if (linkRequestDisplayPathTokens.length === ourDisplayPathTokens.length + 1) {
                // The unlinked ViewDisplay process will be registered in this DisplayView cell's #.inputs.dynamic.displayViews ObservableValueHelperMap.
                // Synthesize the action request names map.
                var names = {};
                names[deferredViewDisplayLinkRequest.reactElement.displayInstance] = {
                  observableValue: {
                    processCoordinates: {
                      apmID: deferredViewDisplayLinkRequest.reactElement.displayViewAPMID,
                      instanceName: deferredViewDisplayLinkRequest.reactElement.displayPath
                    },
                    path: "#.outputs.displayView"
                  }
                }; // This will create a new ObservableValueHelper in our ObservableValueHelperMap (itself a helper cell)
                // and link it to the ObservableValue_T family cell specified by processCoordinates.

                actResponse = request_.context.act({
                  actorName: actionName,
                  actorTaskDescription: "Attempting to add a new ObservableValueHelper entry to our ObservableValueHelperMap helper cell...",
                  actionRequest: {
                    holarchy: {
                      common: {
                        actions: {
                          ObservableValueHelperMap: {
                            addValues: {
                              path: "#.inputs.dynamic.displayViews",
                              names: names
                              /*synthesized above*/

                            }
                          }
                        }
                      }
                    }
                  },
                  apmBindingPath: request_.context.apmBindingPath
                });

                if (actResponse.error) {
                  errors.push(actResponse.error);
                  break;
                } // Okay, we're done. For now. Once the ObservableValueHelper cells added to ObservableValueHelperMap (if any)
                // have linked then we need to circle back, and finally resolve the pendingViewDisplayQueue to sub-display-view
                // cell(s) activated above.


                console.log(actResponse.result);
              } else {
                // Just an integrity check here. We deal w/all of these in a 2nd-pass through the queue after our immediate sub-DisplayView_T cell's have been activated.
                if (!deferredViewDisplayLinkRequest.reactElement.displayPath.startsWith(cellMemory.core.viewDisplayProcess.displayPath)) {
                  errors.push("INTERNAL ERROR: We expected the sub ViewDisplay link request to be a descendant of one of this DisplayView cell's direct sub DisplayView. This should not happen!");
                  break;
                }
              }
            } // end for


            ocdResponse = request_.context.ocdi.writeNamespace({
              apmBindingPath: request_.context.apmBindingPath,
              dataPath: "#.core.pendingViewDisplayQueue"
            }, cellMemory.core.pendingViewDisplayQueue);

            if (ocdResponse.error) {
              errors.push(ocdResponse.result);
              break;
            }

            break;

          case "resolve-pending-view-displays":
            cellMemory.core.pendingViewDisplayQueue.sort(function (a_, b_) {
              return a_.reactElement.displayPath > b_.reactElement.displayPath ? 1 : -1;
            });
            var lastChildProcessed = null;

            while (cellMemory.core.pendingViewDisplayQueue.length) {
              var _deferredViewDisplayLinkRequest = cellMemory.core.pendingViewDisplayQueue.shift();

              var _ourDisplayPathTokens = cellMemory.core.viewDisplayProcess.displayPath.split(".");

              var _linkRequestDisplayPathTokens = _deferredViewDisplayLinkRequest.reactElement.displayPath.split(".");

              if (_linkRequestDisplayPathTokens.length === _ourDisplayPathTokens.length + 1) {
                // The pending ViewDisplay_T React.Element wants to be registered to one of our direct sub-DisplayView_T cells
                // that we know is active because we have an ObservableValueHelper cell linked to it.
                actResponse = request_.context.act({
                  actorName: actionName,
                  actorTaskDescription: "Attempting to resolve unlinked ViewDisplay_T React.Element link request to its desired owner DisplayView_T family cell instance.",
                  actionRequest: {
                    CellProcessor: {
                      cell: {
                        cellCoordinates: {
                          apmID: _deferredViewDisplayLinkRequest.reactElement.displayViewAPMID,
                          instanceName: _deferredViewDisplayLinkRequest.reactElement.displayPath
                        },
                        delegate: {
                          actionRequest: {
                            holistic: {
                              common: {
                                actions: {
                                  service: {
                                    // ... wtf --- sorry, too many namespaces, it's not necessary and I got carried away ;-)
                                    html5: {
                                      display: {
                                        view: {
                                          linkDisplayProcess: {
                                            notifyEvent: "vd-root-activated",
                                            reactElement: _deferredViewDisplayLinkRequest.reactElement
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
                  }
                });

                if (actResponse.error) {
                  errors.push(actResponse.error);
                  break;
                }

                lastChildProcessed = _deferredViewDisplayLinkRequest;
              } else {
                // The pending ViewDisplay_T React.Element wants to link to a DisplayView_T cell that's a descendant of
                // one of our direct sub-DisplayView_T cells. Because of the sorting order of the array, we know that if
                // we hit this code path, then the correct DisplayView_T cell instance to resolve (via delegation) the
                // link request to is identified by lastChildProcessed.
                actResponse = request_.context.act({
                  actorName: actionName,
                  actorTaskDescription: "Attempting to resolve unlinked ViewDisplay_T React.Element link request by passing it down to one of our sub-DisplayView_T family cells to take care of.",
                  actionRequest: {
                    CellProcessor: {
                      cell: {
                        cellCoordinates: {
                          apmID: lastChildProcessed.reactElement.displayViewAPMID,
                          instanceName: lastChildProcessed.reactElement.displayPath
                        },
                        delegate: {
                          actionRequest: {
                            holistic: {
                              common: {
                                actions: {
                                  service: {
                                    html5: {
                                      // ... yea this has to go this deep namespace
                                      display: {
                                        view: {
                                          linkDisplayProcess: {
                                            notifyEvent: "vd-child-activated",
                                            reactElement: _deferredViewDisplayLinkRequest.reactElement
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
                  }
                });

                if (actResponse.error) {
                  errors.push(actResponse.error);
                  break;
                }
              } // end else

            } // end while


            if (errors.length) {
              break;
            }

            ocdResponse = request_.context.ocdi.writeNamespace({
              apmBindingPath: request_.context.apmBindingPath,
              dataPath: "#.core.pendingViewDisplayQueue"
            }, []);

            if (ocdResponse.error) {
              errors.push(ocdResponse.error);
              break;
            }

            break;

          default:
            errors.push("ERROR: Unhandled action value \"".concat(messageBody.action, "\"."));
            break;
        } // end switch


        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();