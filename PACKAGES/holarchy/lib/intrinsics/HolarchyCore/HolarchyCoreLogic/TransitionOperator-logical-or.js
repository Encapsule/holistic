"use strict";

var TransitionOperator = require("../../../../TransitionOperator");

module.exports = new TransitionOperator({
  id: "0JIva4IFSm6Xm7i38g8uUA",
  name: "Logical OR",
  description: "Returns Boolean true iff any suboperations return true.",
  operatorRequestSpec: {
    ____types: "jsObject",
    or: {
      ____types: "jsArray",
      operandOperatorVariant: {
        ____accept: "jsObject"
      }
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: false
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;

      if (!request_.operatorRequest.or.length) {
        errors.push("Cannot evaluate OR operation with zero operands.");
        break;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = request_.operatorRequest.or[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var operatorRequest = _step.value;
          var operatorResponse = request_.context.transitionDispatcher.request({
            context: request_.context,
            operatorRequest: operatorRequest
          });

          if (operatorResponse.error) {
            errors.push("In transition operator AND attempting to process operatorRequest='" + JSON.stringify(operatorRequest) + "':");
            errors.push(operatorResponse.error);
            break;
          }

          var filter = operatorResponse.result;
          operatorResponse = filter.request({
            context: request_.context,
            operatorRequest: operatorRequest
          });

          if (operatorResponse.error) {
            errors.push("In transition operator AND attempting to process operatorRequest='" + JSON.stringify(operatorRequest) + "':");
            errors.push(operatorResponse.error);
            break;
          }

          if (operatorResponse.result) {
            response.result = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (errors.length) break;
      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  }
});