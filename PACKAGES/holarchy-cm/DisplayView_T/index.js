"use strict";

// DisplayView_T/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmtObservableValue = require("../ObservableValue_T");

  var cmObservableValueHelper = require("../ObservableValueHelper");

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
          renderDataPropsSpec: {
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
          inBreakScope = true;
          var cmSynthRequest = {
            cellModelLabel: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, ">"),
            specializationData: {
              description: "Specialization for ".concat(generatorRequest_.cellModelLabel),
              renderDataPropsSpec: generatorRequest_.specializationData.displayElement.renderDataPropsSpec
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
                        apm: cmObservableValueHelper.getCMConfig({
                          type: "APM"
                        }).result[0].getID()
                      }
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
                    nextStep: "display-view-ready"
                  }]
                },
                "display-view-ready": {
                  description: "It's not really ready yet. But, let's say it is."
                }
              } // ~.apm.steps

            },
            subcells: [cmDisplayViewOutputObservableValue]
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