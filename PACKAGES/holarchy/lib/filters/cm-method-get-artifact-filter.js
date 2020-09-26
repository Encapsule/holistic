"use strict";

// cm-method-get-artifact-filter.js
var arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
  operationID: "53rneKlrRre6RLe9BICPVg",
  operationName: "CellModel::getArtifact Method Filter",
  operationDescription: "Provides the CellModel::getArtifact method implementation.",
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

    while (!inBreakScope) {
      inBreakScope = true;
      var cellModel = request_.CellModelInstance;

      if (!cellModel.isValid()) {
        errors.push(cellModel.toJSON());
        break;
      }

      if (request_.type === "CM" && (!request_.id || request_.id === cellModel.getID())) {
        response.result = cellModel;
        break;
      }

      if (!cellModel._private.digraph.isVertex(request_.id)) {
        errors.push("Unknown ".concat(request_.type, " id='").concat(request_.id, "'. No artifact found."));
        break;
      }

      var props = cellModel._private.digraph.getVertexProperty(request_.id);

      if (props.type !== request_.type) {
        errors.push("Invalid id='".concat(request_.id, "' for type ").concat(request_.type, ". This ID is registered to a ").concat(props.type, " artifact, not a ").concat(request_.type, "."));
        break;
      }

      response.result = props.artifact;
      break;
    }

    if (errors.length) {
      errors.unshift("CellModel::getArtifact method error:");
      response.error = errors.join(" ");
      response.result = {
        // this is whatever we want because filter doesn't validate response.result iff response.error !== null
        missingArtifact: "This object is not a valid CellModel artifact. Whatever you're asking for cannot be resolved due to error.",
        alwaysCheckResponseError: "... because if you did you would know that this happened:",
        error: response.error
      };
    }

    return response;
  }
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;