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
          observableValueSpec: {
            ____accept: "jsObject",
            ____defaultValue: {
              ____types: "jsObject",
              ____label: "Default Specialization"
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
          inBreakScope = true;
          var cellModelLabel = "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, ">");
          var cmSynthResponse = cmtObservableValue.synthesizeCellModel({
            cellModelLabel: cellModelLabel,
            synthesizeRequest: {
              valueTypeDescription: "Specialization for ".concat(cellModelLabel),
              valueTypeSpec: generatorRequest_.sythesizeRequest.displayElement.observableValueSpec
            }
          });

          if (cmSynthResponse.error) {
            errors.push(cmSynthResponse.error);
            break;
          }

          var cmDisplayViewOutputObservableValue = cmSynthResponse.result;
          var cellMemorySpec = {
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
                  apm: cmDisplayViewOutputObservableValue.getCMConfig({
                    type: "APM"
                  }).result[0].getID()
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
                    apm: cmObservableValueProxyHelper.getCMConfig({
                      type: "APM"
                    }).result[0].getID()
                  }
                }
              }
            }
          }; // TODO: will fail in OFSP because we're not setting response.result to valid CellModel declaration yet...

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