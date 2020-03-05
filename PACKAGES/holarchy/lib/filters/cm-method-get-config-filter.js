"use strict";

// cm-method-get-config-filter.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "gGdsVfPmRpuSfD4rCdzblQ",
  operationName: "CellModel::getConfig Method Filter",
  operationDescription: "Provides the CellModel::getConfig method implementation.",
  inputFilterSpec: {
    ____label: "CellModel::getArtifact Method Request",
    ____description: "Request object passed to method CellModel::getArtifact to retrieve a specific registered CellModel, APM, ACT, or TOP ES6 class instance reference.",
    ____types: "jsObject",
    ____defaultValue: {},
    CellModelInstance: {
      ____opaque: true
    },
    // Reference to the calling CM instance's this provided by CellModel::getArtifactMethod
    id: {
      ____label: "Artifact IRUT ID",
      ____description: "The IRUT ID of the artifact to retrieve. Typically this API is not used by derived software; it's a very low-level facility.",
      ____accept: ["jsUndefined", // If not specified then getArtifact will attempt to resolve your query against this CellModel's definition
      "jsString" // If specified, then getArtifact will attempt to resolve your query against the the specified sub-CellModel's definition
      ]
    },
    type: {
      ____label: "Artifact Type",
      ____description: "An assertion about the type of artifact associated with id. If the actual artifact specified by id does not match type then the query will fail.",
      ____accept: "jsString",
      ____inValueSet: ["CM", // CellModel
      "CMAT", // CellModel Artifact Tree (report object generated from CellModel data).
      "APM", // AbstractProcessModel
      "TOP", // TransitionOperator
      "ACT" // ControllerAction (TODO: Should be CellAction)
      ],
      ____defaultValue: "CM"
    }
  },
  outputFilterSpec: {
    ____opaque: true // TODO: Lock this down

  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var cellModel = request_.CellModelInstance;

      if (!cellModel.isValid()) {
        errors.push(cellModel.toJSON());
        return "break";
      }

      var innerResponse = cellModel.getArtifact({
        id: request_.id,
        type: "CM"
      });

      if (innerResponse.error) {
        errors.push(innerResponse.error);
        return "break";
      }

      var artifact = innerResponse.result;

      switch (request_.type) {
        case "CM":
          response.result = {};

          var _innerResponse = cellModel.getCMConfig({
            type: "APM"
          });

          if (_innerResponse.error) {
            errors.push(_innerResponse.error);
            break;
          }

          response.result.apm = _innerResponse.result;
          _innerResponse = cellModel.getCMConfig({
            type: "TOP"
          });

          if (_innerResponse.error) {
            errors.push(_innerResponse.error);
            break;
          }

          response.result.top = _innerResponse.result;
          _innerResponse = cellModel.getCMConfig({
            type: "ACT"
          });

          if (_innerResponse.error) {
            errors.push(_innerResponse.error);
            break;
          }

          response.result.act = _innerResponse.result;
          break;

        case "CMAT":
          var context = {
            refStack: [],
            result: {}
          };
          arccore.graph.directed.depthFirstTraverse({
            digraph: artifact._private.digraph,
            context: context,
            options: {
              startVector: ["INDEX_CM"]
            },
            visitor: {
              getEdgeWeight: function getEdgeWeight(request_) {
                var props = request_.g.getVertexProperty(request_.e.u);
                var edgeWeight = null;

                switch (props.type) {
                  case "INDEX":
                    edgeWeight = "INDEX";
                    break;

                  case "APM":
                    edgeWeight = "0_".concat(props.artifact.getName());
                    break;

                  case "TOP":
                    edgeWeight = "1_".concat(props.artifact.getName());
                    break;

                  case "ACT":
                    edgeWeight = "2_".concat(props.artifact.getName());
                    break;

                  case "CM":
                    var _artifact = props.artifact ? props.artifact : cellModel;

                    edgeWeight = "3_".concat(_artifact.getName());
                    break;
                }

                return edgeWeight;
              },
              compareEdgeWeights: function compareEdgeWeights(request_) {
                return request_.a < request_.b ? -1 : request_.a > request_.b ? 1 : 0;
              },
              discoverVertex: function discoverVertex(request_) {
                if (!request_.context.refStack.length) {
                  request_.context.refStack.push(request_.context.result);
                }

                var descriptor = request_.context.refStack[request_.context.refStack.length - 1][request_.u] = {};
                var props = request_.g.getVertexProperty(request_.u);

                switch (props.type) {
                  case "INDEX":
                    descriptor.type = props.type;
                    break;

                  default:
                    var _artifact2 = props.artifact ? props.artifact : cellModel;

                    descriptor.id = _artifact2.getID();
                    descriptor.vdid = _artifact2.getVDID();
                    descriptor.name = _artifact2.getName();
                    descriptor.description = _artifact2.getDescription();
                    descriptor.type = props.type;
                    break;
                }

                request_.context.refStack.push(descriptor);
                return true;
              },
              finishVertex: function finishVertex(request_) {
                request_.context.refStack.pop();
                return true;
              }
            }
          });
          response.result = context.result;
          break;

        case "APM":
        case "TOP":
        case "ACT":
          var outEdges = artifact._private.digraph.outEdges("INDEX_".concat(request_.type));

          var adjacentVertices = outEdges.map(function (edge_) {
            return edge_.v;
          });
          var adjacentArtifacts = adjacentVertices.map(function (vertexID_) {
            var props = artifact._private.digraph.getVertexProperty(vertexID_);

            return props.artifact;
          });
          adjacentArtifacts.sort(function (a_, b_) {
            var aName = a_.getName();
            var bName = b_.getName();
            return aName < bName ? -1 : aName > bName ? 1 : 0;
          });
          response.result = adjacentArtifacts;
          break;

        default:
          errors.push("Value of '".concat(request_.type, "' specified for ~.type is invalid. Must be undefined, CM, APM, TOP, or ACT."));
          break;
      }

      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (errors.length) {
      errors.unshift("CellModel::getCMConfigAPM method error:");
      response.error = errors.join(" ");
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryRespnse.error);
}

module.exports = factoryResponse.result;