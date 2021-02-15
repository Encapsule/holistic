"use strict";

// DisplayView_T/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmtObservableValue = require("../cmtObservableValue");

  var cmObservableValueProxyHelper = require("../ObservableValueProxy"); // const cmObservableValueBase = require("./ObservableValueBase");
  // const cmtObservableValueProxyWorker = require("./ObservableValueProxyWorker_T");


  var templateLabel = "DisplayView"; // const cellLib = require("./lib");
  // const tableDisplayView = cmtDisplayView.synthesizeCellModel({ cellModelLabel: "Table", synthesizeRequest })

  var cmtDisplayView = new holarchy.CellModelTemplate({
    cmasScope: cmasHolarchyCMPackage,
    templateLabel: templateLabel,
    cellModelGenerator: {
      synthesizeMethodRequestSpec: {
        ____label: "".concat(templateName, "<X> Specialization Request"),
        ____types: "jsObject",
        description: {
          ____label: "".concat(templateName, "<X> Description"),
          ____description: "Developer-provided description of the function/purpose of the X member of ".concat(templateName, " CellModel family."),
          ____accept: "jsString"
        },
        displayElement: {
          ____label: "Display Element Specializations",
          ___accept: "jsObject" // TODO

        }
      }
    },
    generatorFilterBodyFunction: function generatorFilterBodyFunction(generatorRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var cellMemorySpec = {
          ____label: "".concat(templateName, "<").concat(generatorRequest_.cellModelLabel, "> Cell Memory"),
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
                apm: cmtObservableValue.mapLabels({
                  APM: "".concat(templateName, "<").concat(generatorRequest_.cellModelLabel, ">")
                }).result.APMID
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
        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (cmtDisplayView.isValid()) {
    throw new Error(cmtDisplayView.toJSON());
  }

  module.exports = cmtDisplayView;
})();