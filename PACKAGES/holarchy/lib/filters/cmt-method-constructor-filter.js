"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// cmt-method-constructor-filter.js
(function () {
  var arccore = require("@encapsule/arccore");

  var CellModelConstructorInputSpec = require("./iospecs/cm-method-constructor-input-spec");

  var cmasHolarchyPackage = require("../../cmasHolarchyPackage");

  var factoryResponse = arccore.filter.create({
    operationID: cmasHolarchyPackage.mapLabels({
      OTHER: "CellModelTemplate::constructor Filter"
    }).result.OTHERID,
    operationName: "CellModelTemplate::constructor Filter",
    operationDescription: "Processes the request value passed to CellModelTemplate::constructor function.",
    inputFilterSpec: require("./iospecs/cmt-method-constructor-input-spec"),
    outputFilterSpec: {
      ____types: "jsObject",
      templateLabel: {
        ____accept: "jsString"
      },
      generatorBodyFunction: {
        ____accept: "jsFunction"
      },
      // This will be a raw function.
      cellModelGeneratorFilter: {
        ____accept: "jsObject"
      } // This will be an @encapsule/arccore.filter object.

    },
    bodyFunction: function bodyFunction(constructorRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;

        if (!constructorRequest_.templateLabel.length) {
          errors.push("You must specify a templateLabel value of one or more characters. Invalid zero-length templateLabel rejected.");
          break;
        }

        var templateLabel = "CellModelTemplate<".concat(constructorRequest_.templateLabel, ">");
        var cellModelTemplateSynthMethodLabel = "".concat(templateLabel, "::synthesizeCellModel");
        var cellModelGeneratorFilterLabel = "".concat(templateLabel, "::cellModelGeneratorFilter"); // Construct the specialized CellModel generator filter instance.
        // CellModelTemplate::synthesizeCellModel method delegates to the cellModelGeneratorFilter created here...

        var factoryResponse2 = arccore.filter.create({
          operationID: cmasHolarchyPackage.mapLabels({
            OTHER: cellModelGeneratorFilterLabel
          }).result.OTHERID,
          operationName: cellModelGeneratorFilterLabel,
          operationDescription: "Processes the request value passed from ".concat(cellModelTemplateSynthMethodLabel, " method."),
          inputFilterSpec: {
            ____label: "".concat(cellModelGeneratorFilterLabel, " Request"),
            ____description: "A request descriptor object specifying the CellModelTemplate-instance-specific specializations to be used to synthesize a new CellModel.",
            ____types: "jsObject",
            // Provided by the CellModelTemplate::synthesizeCellModel method implementation that forwards its this reference.
            // We need the cmtInstance reference because we need the developer-specified generator filter body function that
            // it stashes for use by CellModelTemplate::synthesizeCellModel method. But we're not using it to obtain CMAS info anymore...
            cmtInstance: {
              ____label: "".concat(templateLabel, " Instance Reference"),
              ____accept: "jsObject" // This will be a pointer to CellModelTemplate::synthesizeCellModel method's this

            },
            // Provided by caller via CellModelTemplate::synthesizeCellModel request descriptor
            cmasScope: {
              ____label: "{templateLabel}::synthesizeCellModel CMAS",
              ____description: "Optional reference to a CellModelArtifactSpace or CellModelTemplate class instance that specifies which CMAS the new CellModel's IRUTs should be generated in.",
              ____accept: "jsObject" // v0.0.62-titanite // WE CANNOT GUESS WHAT CMAS YOU WANT YOUR CELLMODEL IN. AND, WE CANNOT GET INVOLVED IN THE HASHING. OR, YOU WILL NEVER EVER FIND IT IN THE CELLPLANE!

            },
            // Provided by caller via CellModelTemplate::synthesizeCellModel request descriptor
            cellModelLabel: {
              ____label: "".concat(templateLabel, " Instance Label"),
              ____description: "A unique and stable label (no spaces, legal JavaScript variable name token) that refers to specialization of of CellModel to be synthesized via this call to CellModelTemplate::synthesizeCellModel method.",
              ____accept: "jsString" // Note that cellModelLabel is used to call CellModelTemplate.mapLabels method (inherited from CellModelArtifactSpace) and is used e.g. as the value passed { CM: cellModelLabel, APM: cellModelLabel ... }

            },
            // Provided by caller via CellModelTemplate::synthesizeCellModel request descriptor
            specializationData: _objectSpread(_objectSpread({}, constructorRequest_.cellModelGenerator.specializationDataSpec), {}, {
              ____label: "".concat(templateLabel, " Instance Specialization & Config Data"),
              ____description: "Specific instructions to ".concat(cellModelGeneratorFilterLabel, " about how to build a new CellModel instance.")
            })
          },
          outputFilterSpec: _objectSpread(_objectSpread({}, CellModelConstructorInputSpec), {}, {
            ____label: "CellModelTemplate::synthesizeCellModel Result",
            ____description: "A @encapsule/holarchy CellModel::constructor request descriptor object synthesized by this filter."
          }),
          bodyFunction: function bodyFunction(generateRequest_) {
            var response = {
              error: null
            };
            var errors = [];
            var inBreakScope = false;

            while (!inBreakScope) {
              inBreakScope = true;

              try {
                var innerRequest = {
                  cmasScope: generateRequest_.cmasScope,
                  cmtInstance: generateRequest_.cmasScope,
                  // HOPEFULLY IF NONE OF MY GENERATORS DOES MORE THAN TREAT THE CMT AS A CMAS IT WILL NEVER EVEN KNOW THE DIFF AND I CAN JUST RENAME THE PARAM AND MOVE ON
                  cellModelLabel: generateRequest_.cellModelLabel,
                  specializationData: generateRequest_.specializationData
                };

                var innerResponse = generateRequest_.cmtInstance._private.generatorBodyFunction(innerRequest);

                if (innerResponse.error) {
                  errors.push(innerResponse.error);
                  break;
                }

                response.result = innerResponse.result;
              } catch (exception_) {
                errors.push(exception_.message);
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

        if (factoryResponse2.error) {
          errors.push(factoryResponse2.error);
          break;
        }

        var cellModelGeneratorFilter = factoryResponse2.result;
        response.result = {
          templateLabel: constructorRequest_.templateLabel,
          generatorBodyFunction: constructorRequest_.cellModelGenerator.generatorFilterBodyFunction,
          cellModelGeneratorFilter: cellModelGeneratorFilter
        };
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
  }

  module.exports = factoryResponse.result;
})();