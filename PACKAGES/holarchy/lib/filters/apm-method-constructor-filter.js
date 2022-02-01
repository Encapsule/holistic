"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// apm-method-constructor-filter.js
var arccore = require("@encapsule/arccore");

var inputFilterSpec = require("./iospecs/apm-method-constructor-input-spec");

var outputFilterSpec = require("./iospecs/apm-method-constructor-output-spec"); // Accepts developer app state controller declaration input. Produces a DirectedGraph model of the app state controller.


var factoryResponse = arccore.filter.create({
  operationID: "XoPnz1p9REe-XO3mKGII3w",
  operationName: "APM Constructor Request Processor",
  operationDescription: "Filter used to normalize the request descriptor object passed to AbstractProcessModel::constructor function.",
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
        errors.push("Error while validating developer-specified id. Not an IRUT:");

        if (irutCheckResponse.error) {
          errors.push(irutCheckResponse.error);
        } else {
          errors.push(irutCheckResponse.guidance);
        }

        break;
      }

      var filterFactoryResponse = arccore.filter.create({
        operationID: request_.id,
        operationName: "APM Filter Spec Validator",
        operationDescription: "Validates the developer-defined ocdDataSpec.",
        inputFilterSpec: request_.ocdDataSpec
      });

      if (filterFactoryResponse.error) {
        errors.push("Error while validating developer-specified ocdDataSpec value for APM:");
        errors.push(filterFactoryResponse.error);
        break;
      }

      var ocdDataFilter = filterFactoryResponse.result;
      request_.ocdDataSpec = ocdDataFilter.filterDescriptor.inputFilterSpec; // take the normalized version

      var graphFactoryResponse = arccore.graph.directed.create({
        name: "[".concat(request_.id, "::").concat(request_.name, "] APM Digraph"),
        description: request_.description
      });

      if (graphFactoryResponse.error) {
        errors.push("Error while constructing directed graph container instance for APM:");
        errors.push(graphFactoryResponse.error);
        break;
      }

      var apmDigraph = graphFactoryResponse.result; // Create vertices in the directed graph that represent the controller's set of finite states (called steps in an APM).

      for (var stepName_ in request_.steps) {
        var stepDescriptor = request_.steps[stepName_];

        if (apmDigraph.isVertex(stepName_)) {
          errors.push("Error while evaluating APM step declaration:");
          errors.push("Invalid duplicate step declaration '" + stepName_ + "'.");
          break;
        }

        apmDigraph.addVertex({
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

        var _iterator = _createForOfIteratorHelper(_stepDescriptor.transitions),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var transitionModel = _step.value;

            if (!apmDigraph.isVertex(transitionModel.nextStep)) {
              errors.push("Error while evalatuing APM step '" + _stepName_ + "' declaration:");
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
            apmDigraph.addEdge(transitionEdgeDescriptor);
          } // end for transitionModel of stepDescriptor.transitions

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } // end for stepDescriptor of request_.steps


      if (errors.length) {
        break;
      }

      response.result = {
        declaration: request_,
        digraph: apmDigraph
      };
      var vdid = arccore.identifier.irut.fromReference(response.result).result;
      response.result.vdid = vdid;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // inputFilterSpec

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;