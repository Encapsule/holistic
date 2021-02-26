"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// DisplayView_T/DisplayStreamMessage_T/index.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var templateLabel = "DisplayStreamMessage";
  var cmtDisplayStreamMessage = new holarchy.CellModelTemplate({
    cmasScope: cmasHolarchyCMPackage,
    templateLabel: templateLabel,
    cellModelGenerator: {
      specializationDataSpec: {
        ____types: "jsObject",
        description: {
          ____accept: "jsString"
        },
        renderDataPropsSpec: {
          ____accept: "jsObject",
          ____defaultValue: {
            ____types: "jsObject",
            ____appdsl: {
              missingRenderDataPropsSpec: true
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
          var cmID = generatorRequest_.cmtInstance.mapLabels({
            CM: generatorRequest_.cellModelLabel
          }).result.CMID;
          var apmID = generatorRequest_.cmtInstance.mapLabels({
            APM: generatorRequest_.cellModelLabel
          }).result.APMID; // Create a specialized cell memory spec for our CellModel's APM.

          var cellMemorySpec = {
            ____label: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, ">"),
            ____description: generatorRequest_.specializationData.description,
            ____types: "jsObject",
            renderContext: {
              ____types: "jsObject",
              ____defaultValue: {},
              apmBindingPath: {
                ____accept: ["jsUndefined", "jsString"]
              }
            },
            renderData: {
              ____label: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, "> Render Data Request"),
              ____types: "jsObject" //// extended below

            }
          }; // Specialize the renderData spec ...

          cellMemorySpec.renderData[apmID] = _objectSpread({}, generatorRequest_.specializationData.renderDataPropsSpec);
          response.result = {
            id: cmID,
            name: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, "> Model"),
            description: generatorRequest_.specializationData.description,
            apm: {
              id: apmID,
              name: "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, "> Process"),
              description: generatorRequest_.specializationData.description,
              ocdDataSpec: cellMemorySpec
            }
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

  if (!cmtDisplayStreamMessage.isValid()) {
    throw new Error(cmtDisplayStreamMessage.toJSON());
  }

  module.exports = cmtDisplayStreamMessage;
})();