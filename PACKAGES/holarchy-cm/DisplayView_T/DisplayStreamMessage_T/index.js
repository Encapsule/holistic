"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// DisplayView_T/DisplayStreamMessage_T/index.js // TODO: RENAME THIS SOMETHING LESS ABSTRUSE. e.g. d2r2Request_T?
(function () {
  var arccore = require("@encapsule/arccore");

  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmtObservableValue = require("../../ObservableValue_T");

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
        displayViewCellModelLabel: {
          ____accept: "jsString"
        },
        displayLayoutSpec: {
          ____accept: "jsObject"
        }
      },

      /*
        generatorRequest = {
        cmtInstance, // reference to this CellModelTemplate template instance --- aka the DisplayView CellModel synthesizer. *****TODO WILL BE A CMAS REF IN FUTURE ****
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
          var displayStreamMessageLabel = "".concat(templateLabel, "<").concat(generatorRequest_.cellModelLabel, ">");
          var filterResponse = arccore.filter.create({
            operationID: "65rI4JXWT02HOmPh1_Eamg",
            // one-time use local to this function
            operationName: "displayLayoutSpec MUST ACCEPT NO INPUT w/OUT ERROR",
            operationDescription: "A filter that uses your displayLayout as inputFilterSpec to determine if it's a valid filter spec and if it can be called generically if used as inputFilterSpec.",
            inputFilterSpec: generatorRequest_.specializationData.displayLayoutSpec
          });

          if (filterResponse.error) {
            errors.push("Unable to generate ".concat(displayStreamMessageLabel, " CellModel because the specified displayLayoutSpec is not a valid filter spec object."));
            errors.push(filterResponse.error);
            break;
          } // Now we know whatever the caller sent through generatorRequest_.specializationData.displayLayoutSpec is actually a filter spec.


          filterResponse = filterResponse.result.request();

          if (filterResponse.error) {
            errors.push("Unable to generate ".concat(displayStreamMessageLabel, " CellModel because the specified displayLayoutSpec is not valid. If we use your displayLayoutSpec as inputFilterSpec and call our testFilter.request() w/no request input there must be no response.error but instead:"));
            errors.push(filterResponse.error);
            break;
          } // Now we know whatever the caller sent through generatorRequest_.specializationData.displayLayoutSpec is a filter spec that accepts an undefined request.
          // Set the invariant portions of all DisplayStreamMessage family members.
          // SEE ALSO: https://en.wikipedia.org/wiki/Inter-process_communication
          //
          // @encapsule/d2r2 may be viewed as an IPC mechanism that accepts a variant message
          // that is parsed to determine a unique "target process" to which to deliver the message.
          // Here we define the format of a d2r2 Request (the variant request). Note, that given
          // the semantics of React, the semantics of this IPC is rather complicated insofar as
          // d2r2 messages affect activation/deactivation of display processes (i.e. mounting and
          // unmounting of React.Elements). As well, as providing updates to display processes
          // that are mounted and not subject to unmounting at the behest of their parent React.Element.
          // CHANGES MADE HERE MUST BE PROPOGATED FORWARD INTO DISPLAY ADAPTER MESSAGE PUMP ACTION.


          var displayStreamMessageSpec = {
            ____label: displayStreamMessageLabel,
            ____description: generatorRequest_.specializationData.description,
            ____types: "jsObject",
            ____defaultValue: {},
            renderContext: {
              ____label: "".concat(displayStreamMessageLabel, " Render Context"),
              ____types: "jsObject",
              ____defaultValue: {},
              apmBindingPath: {
                ____accept: "jsString"
              },
              // This is the actual apmBindingPath of the owning DisplayView_T cell.
              displayInstance: {
                ____accept: "jsString",
                ____defaultValue: "page"
              },
              displayPath: {
                ____accept: "jsString"
              }
            },
            renderData: {
              ____label: "".concat(displayStreamMessageLabel, " d2r2 Render Data"),
              ____types: "jsObject",
              ____defaultValue: {} // X_DisplayView_012345679ABCDEF01234567890ABCDEF spliced in below

            }
          }; // Must be kept in sync w/DVVD artifact generator. Brittle and TAF... Maybe there's a way to break it apart and make it simpler. Or, maybe it's just fucking hard.

          var apmID = generatorRequest_.cmtInstance.mapLabels({
            APM: generatorRequest_.specializationData.displayViewCellModelLabel
          }).result.APMID; // ***** TODO CHANGE TO CMAS REF

          var viewDisplayClassName = "".concat(generatorRequest_.specializationData.displayViewCellModelLabel, "_ViewDisplay_").concat(Buffer.from(apmID, "base64").toString("hex"));
          displayStreamMessageSpec.renderData[viewDisplayClassName] = _objectSpread({}, generatorRequest_.specializationData.displayLayoutSpec);
          var synthResponse = cmtObservableValue.synthesizeCellModel({
            cmasScope: generatorRequest_.cmtInstance,
            // ***** CHANGE TO CMAS REF --- i guess if this isn't throwing I am still extending ? wait - wat?
            cellModelLabel: displayStreamMessageLabel,
            specializationData: {
              valueTypeDescription: "An ObservableValue<".concat(displayStreamMessageLabel, "<").concat(generatorRequest_.cellModelLabel, ">> CellModel."),
              valueTypeSpec: displayStreamMessageSpec
            }
          });

          if (synthResponse.error) {
            errors.push(synthResponse.error);
            break;
          }

          var ovCellModel = synthResponse.result;
          response.result = ovCellModel;
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