"use strict";

var TransitionOperator = require("../../../../TransitionOperator");

module.exports = new TransitionOperator({
  id: "TLSHkl73SO-utuzM7dyN2g",
  name: "Logical NOT",
  description: "Returns Boolean true iff the suboperator returns false (i.e. it logically complements or inverts whatever operator it's applied to).",
  operatorRequestSpec: {
    ____types: "jsObject",
    not: {
      ____accept: "jsObject"
    }
  },
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var operatorResponse = request_.context.transitionDispatcher.request({
        context: request_.context,
        operatorRequest: request_.operatorRequest.not
      });

      if (operatorResponse.error) {
        errors.push("In transition operator NOT process operatorRequest='" + JSON.stringify(request_.operatorRequest.not) + "':");
        errors.push(operatorResponse.error);
        break;
      }

      var filter = operatorResponse.result;
      operatorResponse = filter.request({
        context: request_.context,
        operatorRequest: request_.operatorRequest.not
      });

      if (operatorResponse.error) {
        errors.push("In transition operator NOT process operatorRequest='" + JSON.stringify(request_.operatorRequest.not) + "':");
        errors.push(operatorResponse.error);
        break;
      }

      response.result = !operatorResponse.result;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  }
});