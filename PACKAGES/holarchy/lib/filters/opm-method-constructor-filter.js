"use strict";

// opm-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var inputFilterSpec = require("./iospecs/opm-method-constructor-input-spec");

var outputFilterSpec = require("./iospecs/opm-method-constructor-output-spec"); // Accepts developer app state controller declaration input. Produces a DirectedGraph model of the app state controller.


var factoryResponse = arccore.filter.create({
  operationID: "XoPnz1p9REe-XO3mKGII3w",
  operationName: "OPM Constructor Request Processor",
  operationDescription: "Filter used to normalize the request descriptor object passed to ObservableProcessModel constructor function.",
  inputFilterSpec: inputFilterSpec,
  outputFilterSpec: outputFilterSpec,
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var irutCheckResponse = arccore.identifier.irut.isIRUT(request_.id);

      if (irutCheckResponse.error || !irutCheckResponse.result) {
        errors.push("Error validating developer-specified id. Not an IRUT:");

        if (irutCheckResponse.error) {
          errors.push(irutCheckResponse.error);
        } else {
          errors.push(irutCheckResponse.guidance);
        }

        break;
      }

      var filterFactoryResponse = arccore.filter.create({
        operationID: request_.id,
        operationName: "OPM Filter Spec Validator",
        operationDescription: "Validates the developer-defined opmDataSpec.",
        inputFilterSpec: request_.opmDataSpec
      });

      if (filterFactoryResponse.error) {
        errors.push("Error validating developer-specified OPM filter spec.");
        errors.push(filterFactoryResponse.error);
        break;
      }

      var opmDataFilter = filterFactoryResponse.result;
      var graphFactoryResponse = arccore.graph.directed.create({
        name: "[".concat(request_.id, "::").concat(request_.name, "] OPM Digraph"),
        description: request_.description
      });

      if (graphFactoryResponse.error) {
        errors.push("Error constructing directed graph container instance for subcontroller model.");
        errors.push(graphFactoryResponse.error);
        break;
      }

      var opmDigraph = graphFactoryResponse.result; // Create vertices in the directed graph that represent the controller's set of finite states (called steps in an OPM).

      for (var stepName_ in request_.steps) {
        var stepDescriptor = request_.steps[stepName_];

        if (opmDigraph.isVertex(stepName_)) {
          errors.push("Error while evaluating observable process model step declaration.");
          errors.push("Invalid duplicate step declaration '" + stepName_ + "'.");
          break;
        }

        opmDigraph.addVertex({
          u: stepName_,
          p: {
            description: stepDescriptor.description,
            actions: stepDescriptor.actions
          }
        });
      } // end for
      // Create the edges in the directed graph that represent the controller's finite state transition matrix.


      for (var _stepName_ in request_.steps) {
        var _stepDescriptor = request_.steps[_stepName_]; // Evaluate each of the declared transition models.

        var transitionPriority = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _stepDescriptor.transitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var transitionModel = _step.value;

            if (!opmDigraph.isVertex(transitionModel.nextStep)) {
              errors.push("Error while evalatuing step '" + _stepName_ + "'.");
              errors.push("Invalid transition model specifies unknown next step target '" + transitionModel.nextStep + "'.");
              break;
            }

            var transitionEdgeDescriptor = {
              e: {
                u: _stepName_,
                v: transitionModel.nextStep
              },
              p: {
                priority: transitionPriority++,
                operator: transitionModel.transitionIf
              }
            };
            opmDigraph.addEdge(transitionEdgeDescriptor);
          } // end for transitionModel of stepDescriptor.transitions

        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } // end for stepDescriptor of request_.steps


      if (errors.length) {
        break;
      }

      response.result = {
        declaration: request_,
        digraph: opmDigraph,
        opmDataFilter: opmDataFilter
      };
      break;
    }

    if (errors.length) {
      errors.unshift("Error while evaluating subcontroller '" + request_.name + "' declaration.");
      response.error = errors.join(" ");
    }

    return response;
  } // inputFilterSpec

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;