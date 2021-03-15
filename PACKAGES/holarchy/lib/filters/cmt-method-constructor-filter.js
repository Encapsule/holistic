"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// cmt-method-constructor-filter.js
(function () {
  var arccore = require("@encapsule/arccore");

  var CellModelArtifactSpace = require("../../CellModelArtifactSpace");

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
      spaceLabel: {
        ____accept: "jsString"
      },
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
        } /// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // v0.0.62-titanite --- IN RETROSPECT IT'S A BAD CHOICE TO COUPLE THE NOTION OF A TEMPLATE W/ARTIFACT SPACE LIKE THIS.
        // THIS IS GOING TO GET REMOVED / REWORKED. WE WILL ONLY ACTUALLY TAKE CMAS SCOPE IN THROUGH SYNTH REQUEST


        var cmasTemplateScope = constructorRequest_.cmasScope instanceof CellModelArtifactSpace ? constructorRequest_.cmasScope : new CellModelArtifactSpace(constructorRequest_.cmasScope);

        if (!cmasTemplateScope.isValid()) {
          errors.push(cmasTemplateScope.toJSON());
          break;
        }

        var cmasResponse = cmasTemplateScope.makeSubspaceInstance({
          spaceLabel: constructorRequest_.templateLabel
        });

        if (cmasResponse.error) {
          errors.push(cmasResponse.error);
          break;
        }

        var cmasInstanceScope = cmasResponse.result; // WARNING DEAD CODE ---- DO NOT EVER RELY ON CMAS AT TEMPLATE SCOPE UNTIL IT'S ENTIRELY EXORCISED FROM THE CLASS !
        /// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
            // Provided by the CellModelTemplate::synthesizeCellModel method implementation that forwards its class constructor reference.
            // TODO: Explain why this is passed through here in the comments.
            cmtClass: {
              ____label: "CellModelTemplate::constructor Function",
              ____accept: "jsFunction"
            },
            // Provided by the CellModelTemplate::synthesizeCellModel method implementation that forwards its this reference.
            // TODO: Explain why this is pass through here in the comments. And, if it's not necessary because CMT no longer extends CMAS then remove it and simplify.
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
                // v0.0.62-titanite I WANT TO KNOW IF WE REALLY EVEN NEED TO TAKE THIS IN HERE IF WE'RE REQUIRING CMAS?
                var cmtInstance = generateRequest_.cmtInstance; // According to the CellModelTemplate class instance.
                /// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                // NO - CMAS IS NOW REQUIRED TO BE PASSED TO SYNTH METHOD --- NOTHING SPECIAL --- JUST USE IT

                /*
                if (generateRequest_.cmasScope) { // ... but, whomever is calling synthesizeCellModel wants to use their own CMAS instead of our template's intrinsic CMAS. Okay...
                    // cmasSynthScope is (or should be) one of several types of objects:
                    // - CellModelArtifactSpace class instance
                    // ? CellModelArtifactSpace::constructor request - Seems rather an exotic case. The main use case is to pass in reference to a cmtInstance here from another generatorBodyFunction.
                    // - CellModelTemplate class instance that extends CellModelArtifactSpace
                    // X CellModelTemplate::constructor request --- NAH, not going to support this option
                    // Determine which of these and instantiate a new CellModelTemplate based on generateCellModelReqeust_.cmtInstance
                    // We really don't care if the caller passed us a CellModelTemplate instance. We just want to know its CMAS.
                    let cmasScope = (generateRequest_.cmasScope instanceof CellModelArtifactSpace)?generateRequest_.cmasScope:(new CellModelArtifactSpace(generateRequest_.cmasScope));
                    if (!cmasScope.isValid()) {
                        errors.push(cmasScope.toJSON());
                        break;
                    }
                    // Now we need a new CellModelTemplate instance to pass to our generatorBodyFunction instead of our own...
                    // Note that the new CellModelTemplate instance does exactly what this one does. Except, that CellModel
                    // generated via the instance's synthesizeCellModel method will be placed in the specified CMAS.
                     cmtInstance = new generateRequest_.cmtClass({
                        cmasScope,
                        templateLabel: generateRequest_.cmtInstance._private.templateLabel,
                        cellModelGenerator: {
                            specializationDataSpec: generateRequest_.cmtInstance._private.cellModelGeneratorFilter.filterDescriptor.inputFilterSpec.specializationData,
                            generatorFilterBodyFunction: generateRequest_.cmtInstance._private.generatorBodyFunction
                        }
                    });
                    if (!cmtInstance.isValid()) {
                        errors.push(cmtInstance.toJSON());
                        break;
                    }
                    cmtInstance._private.spaceLabel = cmasScope.spaceLabel; // zap the spaceLabel and keep everything else the same. This keeps the template names nice.
                }
                */

                var innerRequest = {
                  // v0.0.62-titanite disabled this line // replaced w/--v //// cmtInstance, // <=== BINGO: NOPE --- this gets passed through here expressly so that developers can resolve the CMAS scope to use to mapLabels to artifact ID IRUTS.
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
          spaceLabel: cmasInstanceScope.spaceLabel,
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