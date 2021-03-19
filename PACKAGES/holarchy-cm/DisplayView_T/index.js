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
          displayLayoutSpec: {
            ____accept: "jsObject"
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
                    // TEMPORARY: At the moment we are not working very hard to ensure that we can serialize OCD and then later resume the user session in _exactly_ the state they left it.
                    // A simple serialization of OCD will not suffice --- there needs to be explicit rules in place for serializing the state of a cell if the intention is that it should
                    // later be resumable within a larger system. We'll talk more about this subject later; it's use case #1 for distributed cellplane applications.
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
                    displayPath: {
                      ____accept: "jsString"
                    },
                    thisRef: {
                      ____accept: "jsObject"
                    }
                  },
                  dynamicViewDisplayQueue: {
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
                  displayViews: {
                    ____label: "".concat(generatorRequest_.cellModelLabel, " Sub-Display View Inputs"),
                    ____types: "jsObject",
                    ____asMap: true,
                    ____defaultValue: {},
                    subviewLabel: {
                      ____types: "jsObject",
                      ____appdsl: {
                        apm: cmObservableValueHelper.getAPM().getID()
                      }
                    }
                  },
                  dynamicSubDisplayViews: {
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
                  transitions: [{
                    transitionIf: {
                      always: true
                    },
                    nextStep: "display-view-initialize"
                  }]
                },
                "display-view-initialize": {
                  description: "The display view process is initializing itself...",
                  transitions: [{
                    transitionIf: {
                      always: true
                    },
                    nextStep: "display-view-wait-view-display"
                  }],
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
                  }
                },
                "display-view-wait-view-display": {
                  description: "The display view process is waiting for the React.Element that will be generated by @encapsule/d2r2 using our current #.outputs.displayView value to be mounted in the virtual DOM. And, to link back to us via action call.",
                  transitions: [{
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
                    nextStep: "display-view-display-process-linked"
                  }]
                },
                "display-view-display-process-linked": {
                  description: "The DisplayView family cell has established a bidirectional IPC link its matching ViewDisplay family React.Element (a process that follows it's own rules and evaluates inside React virtual DOM (VDOM)."
                  /* DISABLE FOR NOW --- this is WIP.
                     I need a general solution for dealing with dynamic maps of ObservableValueHelper cells for use in several places inside of DisplayView_T
                     This new CPM operator below is partially completed but requires that the target object itself be a cell (just OCD memory is insufficient because CPM only talks to cells)
                     And, I conclude that calling this operator here at this level is inappropriate; it needs to be called by a CellModel that specifically models a dyanamic map of
                     ObservableValueHelper cells. 
                  transitions: [
                      { transitionIf: { CellProcessor: { cell: { query: { cellGroupInStep: { constraint: "all", apmStep: "observable-value-helper-linked" } }, cellCoordinates: "#.inputs.displayViews" } } }, nextStep: "display-view-quiescent" }
                  ]
                  */

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