"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// CellModelArtifactSpace-method-constructor-filter.js
(function () {
  var arccore = require("@encapsule/arccore");

  var cmasConstructorRequestSpec = {
    ____label: "CellModelArtifactSpace::constructor Request",
    ____description: "Descriptor object passed into the CellModelArtifactSpace class constructor function.",
    ____types: "jsObject",
    ____defaultValue: {},
    spaceLabel: {
      ____label: "Artifact Space Label",
      ____description: "A unique string label used to identify the specific CellModel artifact space to use to resolve CellModel artifact label queries.",
      ____accept: "jsString",
      ____defaultValue: "@encapsule/holarchy"
    }
  };
  var factoryResponse1 = arccore.filter.create({
    operationID: "kNjJehTFRz2WhRHkuL9kWA",
    operationName: "CellModelArtifactSpace::constructor",
    operationDescription: "CellModelArtifactSpace::constructor function request input filter.",
    inputFilterSpec: cmasConstructorRequestSpec,
    outputSpec: {
      ____types: "jsObject",
      artifactSpaceLabel: {
        ____accept: "jsString"
      },
      mapLabelsMethodFilter: {
        ____accept: "jsObject" // This will be an @encapsule/arccore.filter object.

      },
      makeSubspaceInstanceMethodFilter: {
        ____accept: "jsObject" // This will be an @encapsule/arccore.filter object.

      }
    },
    bodyFunction: function bodyFunction(constructorRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      var _loop = function _loop() {
        inBreakScope = true;
        var spaceLabel = constructorRequest_.spaceLabel;
        var artifactSpaceLabel = "".concat(spaceLabel); // Create a filter that implements the mapLabels method.

        var factoryResponse2 = arccore.filter.create({
          operationID: arccore.identifier.irut.fromReference("CellModelArtifactSpace<".concat(artifactSpaceLabel, ">::mapLabels")).result,
          operationName: "CellModelArtifactSpace::mapLabels<".concat(artifactSpaceLabel, ">"),
          operationDescription: "A filter that implements the CellModelArtifactSpace<".concat(artifactSpaceLabel, ">::mapLabels class method."),
          inputFilterSpec: {
            ____label: "CellModelArtifactSpace::mapLabels<".concat(artifactSpaceLabel, "> Request"),
            ____description: "CellModelArtifactSpace::mapLabels method request descriptor object for space \"".concat(artifactSpaceLabel, "\"."),
            ____types: "jsObject",
            ____defaultValue: {},
            CM: {
              ____accept: ["jsUndefined", "jsString"]
            },
            APM: {
              ____accept: ["jsUndefined", "jsString"]
            },
            ACT: {
              ____accept: ["jsUndefined", "jsString"]
            },
            TOP: {
              ____accept: ["jsUndefined", "jsString"]
            },
            OTHER: {
              ____accept: ["jsUndefined", "jsString"]
            }
          },
          outputFilterSpec: {
            ____label: "Artifact Space Mapping",
            ____types: "jsObject",
            CM: {
              ____accept: ["jsUndefined", "jsString"]
            },
            CMID: {
              ____accept: ["jsUndefined", "jsString"]
            },
            APM: {
              ____accept: ["jsUndefined", "jsString"]
            },
            APMID: {
              ____accept: ["jsUndefined", "jsString"]
            },
            ACT: {
              ____accept: ["jsUndefined", "jsString"]
            },
            ACTID: {
              ____accept: ["jsUndefined", "jsString"]
            },
            TOP: {
              ____accept: ["jsUndefined", "jsString"]
            },
            TOPID: {
              ____accept: ["jsUndefined", "jsString"]
            },
            OTHER: {
              ____accept: ["jsUndefined", "jsString"]
            },
            OTHERID: {
              ____accept: ["jsUndefined", "jsString"]
            }
          },
          bodyFunction: function bodyFunction(mapLabelsRequest_) {
            return {
              error: null,
              result: _objectSpread(_objectSpread({}, mapLabelsRequest_), {}, {
                CMID: mapLabelsRequest_.CM ? arccore.identifier.irut.fromReference("".concat(artifactSpaceLabel, ".CellModel.").concat(mapLabelsRequest_.CM)).result : undefined,
                APMID: mapLabelsRequest_.APM ? arccore.identifier.irut.fromReference("".concat(artifactSpaceLabel, ".AbstractProcessModel.").concat(mapLabelsRequest_.APM)).result : undefined,
                ACTID: mapLabelsRequest_.ACT ? arccore.identifier.irut.fromReference("".concat(artifactSpaceLabel, ".ControllerAction.").concat(mapLabelsRequest_.ACT)).result : undefined,
                TOPID: mapLabelsRequest_.TOP ? arccore.identifier.irut.fromReference("".concat(artifactSpaceLabel, ".TransitionOperator.").concat(mapLabelsRequest_.TOP)).result : undefined,
                OTHERID: mapLabelsRequest_.OTHER ? arccore.identifier.irut.fromReference("".concat(artifactSpaceLabel, ".OtherAsset.").concat(mapLabelsRequest_.OTHER)).result : undefined
              })
            };
          }
        });

        if (factoryResponse2.error) {
          errors.push(factoryResponse2.error);
          return "break";
        }

        var mapLabelsMethodFilter = factoryResponse2.result; // Create a filter that implements the makeSubspaceInstance method.

        factoryResponse2 = arccore.filter.create({
          operationID: arccore.identifier.irut.fromReference("CellModelArtifactSpace<".concat(artifactSpaceLabel, ">::makeSubspaceInstance")).result,
          operationName: "CellModelArtifactSpace<".concat(artifactSpaceLabel, ">::makeSubspaceInstance"),
          operationDescription: "A filter that implements the CellModelArtifactSpace<".concat(artifactSpaceLabel, ">::makeSubspaceInstance class method."),
          inputFilterSpec: cmasConstructorRequestSpec,
          outputFilterSpec: cmasConstructorRequestSpec,
          bodyFunction: function bodyFunction(request_) {
            var response = {
              error: null
            };
            var errors = [];
            var inBreakScope = false;

            while (!inBreakScope) {
              inBreakScope = true; // Here a "subspace" is an artifact space "boundary". U+2202 (stylized d) is used here to demarcate the boundary.

              response.result = {
                spaceLabel: "".concat(artifactSpaceLabel, "\u2202").concat(request_.spaceLabel)
              };
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
          return "break";
        }

        var makeSubspaceInstanceMethodFilter = factoryResponse2.result;
        response.result = {
          artifactSpaceLabel: artifactSpaceLabel,
          mapLabelsMethodFilter: mapLabelsMethodFilter,
          makeSubspaceInstanceMethodFilter: makeSubspaceInstanceMethodFilter
        };
        return "break";
      };

      while (!inBreakScope) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (factoryResponse1.error) {
    throw new Error(factoryResponse1.error);
  }

  var constructorFilter = factoryResponse1.result;
  module.exports = constructorFilter;
})();