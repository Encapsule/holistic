"use strict";

var TransitionOperator = require("../../../../TransitionOperator");

module.exports = new TransitionOperator({
  id: "YgABX95wR86GCYrYaDLISA",
  name: "Logical AND",
  description: "Returns Boolean true iff all suboperations return true.",
  operatorRequestSpec: {
    ____types: "jsObject",
    and: {
      ____types: "jsArray",
      operandOperatorVariant: {
        ____accept: "jsObject"
      }
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: true
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;

      if (!request_.operatorRequest.and.length) {
        errors.push("Cannot evaluate AND operation with zero operands.");
        break;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = request_.operatorRequest.and[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

          if (!operatorResponse.result) {
            response.result = false;
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