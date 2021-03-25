"use strict";

// DisplayView_T/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmtObservableValue = require("../ObservableValue_T");

  var cmObservableValueHelper = require("../ObservableValueHelper");

  var cmObservableValueHelperMap = require("../ObservableValueHelperMap");

  var cmtDisplayStreamMessage = require("./DisplayStreamMessage_T");

  var templateLabel = "DisplayView";
  var cmResponse = cmObservableValueHelper.getArtifact({
    type: "ACT",
    id: cmasHolarchyCMPackage.mapLabels({
      CM: "ObservableValueHelper",
      ACT: "configure"
    }).result.ACTID
  });

  if (cmResponse.error) {
    throw new Error(cmResponse.error);
  }

  var ovhConfigureAction = cmResponse.result;
  var cmtDisplayView = new holarchy.CellModelTemplate({
    cmasScope: cmasHolarchyCMPackage,
    templateLabel: templateLabel,
    cellModelGenerator: {
      specializationDataSpec: {
        ____label: "".concat(templateLabel, "<X> Specialization Data"),
        ____types: "jsObject",
        description: {
          ____label: "".concat(templateLabel, "<X> Description"),
          ____description: "Developer-provided description of the function/purpose of the X member of ".concat(templateLabel, " CellModel family."),
          ____accept: "jsString"
        },
        displayElement: {
          ____label: "Display Element Specializations",
          ____types: "jsObject",
          ____defaultValue: {},
          // THIS IS SIMILAR TO d2r2RenderData. But... it's not exactly the same.
          // 'renderData' is a reserved namespace allocated by d2r2 <ComponentRouter/> for the purposes of routing via @encapsule/arccore.discriminator
          // (d2r2 ignores all of this.props _except_ renderData when routing --- it does not care about anything else).
          // renderData MUST NOT BE DEFAULT constructable (per long-standing limitation of current @encapsule/arccore package that's on my backlog)
          // BUT, 'displayLayoutMust' MUST BE DEFAULT CONSTRUCTABLE so that we can feed React _something_ (even the default layout data for a React.Component)
          // when a DisplayView_T cell is activated.
          displayLayoutSpec: {
            ____accept: "jsObject"
          }
        },
        staticInputs: {
          ____types: "jsObject",
          ____defaultValue: {},
          displayViews: {
            ____types: "jsObject",
            ____asMap: true,
            ____defaultValue: {},
            signalName: {
              ____types: "jsObject"
            }
          }
        }
      },

      /*
        generatorRequest = {
        cmtInstance, // reference to this CellModelTemplate template instance --- aka the DisplayView CellModel synthesizer.
        cellModelLabel, // passed by cmtInstance.synthesizeCellModel from caller
        specializationData // passed by cmtInstance.synthesizeCellModel from caller filtered per above spec
        }
      */
      generatorFilterBodyFunction: function generatorFilterBodyFunction(generatorRequest_) {
        var response = {
          error: null
        };
        var errors = [];
        var inBreakScope = false;

        while (!inBreakScope) {
          inBreakScope = true; // TODO: CLEAN THIS UP... We are getting away w/this here only because ? Actually, I think this maybe should be failing but is somehow not still? In any case, we're getting a unique IRUT and this particular cell is an implementation detail of DisplayView_T.

          var cmSynthRequest = {
            cmasScope: generatorRequest_.cmtInstance,
            // ? ***** TODO***** THIS WILL NEED TO CHANGE --- TEMPLATES WILL NO LONGER EXTENDED CMAS --- TO BE CLEAR SYNTH REQUEST NOW REQUIRES CMAS INPUT AND GENERATOR NEVER USES CMT TO RESOLVE CMAS
            cellModelLabel: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, ">"),
            specializationData: {
              description: "Specialization for ".concat(generatorRequest_.cellModelLabel),
              displayViewCellModelLabel: generatorRequest_.cellModelLabel,
              displayLayoutSpec: generatorRequest_.specializationData.displayElement.displayLayoutSpec
            }
          };
          var cmSynthResponse = cmtDisplayStreamMessage.synthesizeCellModel(cmSynthRequest);

          if (cmSynthResponse.error) {
            errors.push("While attempting to synthesize a DisplayStreamMessage family CellModel:");
            errors.push(cmSynthResponse.error);
            break;
          }

          var cmDisplayViewOutputObservableValue = cmSynthResponse.result;
          response.result = {
            id: generatorRequest_.cmtInstance.mapLabels({
              CM: generatorRequest_.cellModelLabel
            }).result.CMID,
            name: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, "> Model"),
            description: generatorRequest_.specializationData.description,
            apm: {
              id: generatorRequest_.cmtInstance.mapLabels({
                APM: generatorRequest_.cellModelLabel
              }).result.APMID,
              name: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, "> Process"),
              description: generatorRequest_.specializationData.description,
              ocdDataSpec: {
                ____label: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, "> Cell Memory"),
                ____types: "jsObject",
                ____defaultValue: {},
                outputs: {
                  ____label: "Observable Output Values",
                  ____types: "jsObject",
                  ____defaultValue: {},
                  displayView: {
                    ____label: "".concat(generatorRequest_.cellModelLabel, " Display View Output"),
                    ____types: "jsObject",
                    ____appdsl: {
                      apm: cmDisplayViewOutputObservableValue.apm.id
                    }
                  }
                },
                core: {
                  ____types: "jsObject",
                  ____defaultValue: {},
                  viewDisplayProcess: {
                    // TODO: Revisit the serialization of non-serializable information from OCD memory when a CellProcessor instance is serialized.
                    toJSON: {
                      ____accept: "jsFunction",
                      ____defaultValue: function ____defaultValue() {
                        return {
                          displayName: this.displayName,
                          displayPath: this.displayPath,
                          thisRef: "****React.Element NOT SERIALIZABLE****"
                        };
                      }
                    },
                    ____types: ["jsUndefined", "jsObject"],
                    displayName: {
                      ____accept: "jsString"
                    },
                    displayInstance: {
                      ____accept: "jsString"
                    },
                    displayPath: {
                      ____accept: "jsString"
                    },
                    thisRef: {
                      ____accept: "jsObject"
                    }
                  },
                  pendingViewDisplayQueue: {
                    ____types: "jsArray",
                    ____defaultValue: [],
                    reactElementDescriptor: {
                      ____accept: "jsObject"
                    }
                  }
                },
                inputs: {
                  ____label: "Observable Input Values",
                  ____types: "jsObject",
                  ____defaultValue: {},
                  subDisplayViews: {
                    ____types: "jsObject",
                    ____defaultValue: {},
                    ____appdsl: {
                      apm: cmasHolarchyCMPackage.mapLabels({
                        APM: "ObservableValueHelperMap"
                      }).result.APMID
                    }
                  }
                }
              },
              // ~.apm.ocdDataSpec
              steps: {
                uninitialized: {
                  description: "Default starting step of activated cell.",
                  actions: {
                    exit: [{
                      holarchy: {
                        common: {
                          actions: {
                            DisplayViewBase: {
                              _private: {
                                stepWorker: {
                                  action: "initialize"
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
                    nextStep: "display-view-wait-view-display-process-mounted"
                  }]
                },
                "display-view-wait-view-display-process-mounted": {
                  description: "The display view process is waiting for the React.Element that will be generated by @encapsule/d2r2 using our current #.outputs.displayView value to be mounted in the virtual DOM. And, to link back to us via action call.",
                  transitions: [// Evaluates to Boolean true only after the ViewDisplay process (a mounted React.Element) that was "rendered" to the React
                  // VDOM via d2r2 <ComponentRouter/> from this DisplayView_T cell has been mounted (i.e. onComponentDidMount) and has
                  // "phoned home" back to its originating DisplayView_T cell with information required to negotiate IPC between the
                  // DisplayView_T cell and the mounted ViewDisplay_T React.Element.
                  {
                    transitionIf: {
                      holarchy: {
                        cm: {
                          operators: {
                            ocd: {
                              isNamespaceTruthy: {
                                path: "#.core.viewDisplayProcess"
                              }
                            }
                          }
                        }
                      }
                    },
                    nextStep: "display-view-view-display-ipc-negotiate"
                  }],
                  actions: {
                    exit: [{
                      holarchy: {
                        common: {
                          actions: {
                            DisplayViewBase: {
                              _private: {
                                stepWorker: {
                                  action: "update-view-display-context"
                                }
                              }
                            }
                          }
                        }
                      }
                    }]
                  }
                },
                "display-view-view-display-ipc-negotiate": {
                  description: "The DisplayView family cell has received a link request from its ViewDisplay_T React.Element.",
                  actions: {
                    enter: [{
                      holarchy: {
                        common: {
                          actions: {
                            ObservableValue: {
                              setDeferredAction: {
                                path: "#.outputs.displayView"
                              }
                            }
                          }
                        }
                      }
                    }]
                  },
                  // Clear output DACT
                  transitions: [// If this DisplayView cell's corresponding ViewDisplay process performed injected unlinked sub-DisplayView into the VDOM,
                  // then those DisplayView process(es) will have received ViewDisplayProcess.onComponentDidMount and responded by queueing
                  // their desired link coordinates for us to broker/resolve on their behalf.
                  {
                    transitionIf: {
                      not: {
                        holarchy: {
                          cm: {
                            operators: {
                              ocd: {
                                arrayIsEmpty: {
                                  path: "#.core.pendingViewDisplayQueue"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    nextStep: "display-view-view-display-ipc-negotiate-link-unlinked-view-displays"
                  }, {
                    transitionIf: {
                      holarchy: {
                        common: {
                          operators: {
                            ObservableValueHelperMap: {
                              mapIsEmpty: {
                                path: "#.inputs.subDisplayViews"
                              }
                            }
                          }
                        }
                      }
                    },
                    nextStep: "display-view-quiescent"
                  }, {
                    transitionIf: {
                      always: true
                    },
                    nextStep: "display-view-view-display-ipc-negotiate-link-unlinked-view-displays"
                  }]
                },
                "display-view-view-display-ipc-negotiate-link-unlinked-view-displays": {
                  description: "The DisplayView family cell is resolving IPC link requests from unlinked ViewDisplay processes that were mounted in the last display process update.",
                  actions: {
                    enter: [{
                      holarchy: {
                        common: {
                          actions: {
                            DisplayViewBase: {
                              _private: {
                                stepWorker: {
                                  action: "link-unlinked-view-displays"
                                }
                              }
                            }
                          }
                        }
                      }
                    }],
                    exit: [{
                      holarchy: {
                        common: {
                          actions: {
                            DisplayViewBase: {
                              _private: {
                                stepWorker: {
                                  action: "resolve-pending-view-displays"
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
                        common: {
                          operators: {
                            ObservableValueHelperMap: {
                              mapIsLinked: {
                                path: "#.inputs.subDisplayViews"
                              }
                            }
                          }
                        }
                      }
                    },
                    nextStep: "display-view-quiescent"
                  }]
                },
                "display-view-quiescent": {
                  description: "The display view process is linked to its matching view display process and is in its quiescient process step waiting for something to change."
                }
              } // ~.apm.steps

            },
            subcells: [cmObservableValueHelper, cmObservableValueHelperMap, cmDisplayViewOutputObservableValue, require("./DisplayViewBase")]
          };
          break;
        }

        if (errors.length) {
          response.error = errors.join(" ");
        }

        return response;
      }
    }
  });

  if (!cmtDisplayView.isValid()) {
    throw new Error(cmtDisplayView.toJSON());
  }

  module.exports = cmtDisplayView;
})();