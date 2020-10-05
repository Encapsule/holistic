"use strict";

var TransitionOperator = require("../../../../TransitionOperator");

var ObservableControllerData = require("../../../ObservableControllerData");

module.exports = new TransitionOperator({
  id: "XxX_a1sQS1OlJbWAYfx6tQ",
  name: "OCD Namespace Is Less Than Value",
  description: "Returns Boolean true iff the indicated OCD namespace is less than the indicated value. Limited to number and string value comparisons only.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      cm: {
        ____types: "jsObject",
        operators: {
          ____types: "jsObject",
          ocd: {
            ____types: "jsObject",
            isNamespaceLessThanValue: {
              ____types: "jsObject",
              path: {
                ____accept: "jsString"
              },
              value: {
                ____accept: ["jsString", "jsNumber"]
              }
            }
          }
        }
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
      var message = request_.operatorRequest.holarchy.cm.operators.ocd.isNamespaceLessThanValue;
      var rpResponse = ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: message.path
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var filterResponse = request_.context.ocdi.readNamespace(rpResponse.result);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      } // TODO: It would be better to also confirm that both values are the same type.


      response.result = filterResponse.result < message.value;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});