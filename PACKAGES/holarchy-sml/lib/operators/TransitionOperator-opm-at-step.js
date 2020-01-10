"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.TransitionOperator({
  id: "9tNY7o5GTUGH_xda2GhP-w",
  name: "OPM In Step Expression Operator",
  description: "Returns Boolean true iff the indicated OPM instance is in the indicated process step.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      sml: {
        ____types: "jsObject",
        operators: {
          ____types: "jsObject",
          opmi: {
            ____types: "jsObject",
            inStep: {
              ____types: "jsObject",
              path: {
                ____accept: "jsString"
              },
              step: {
                ____accept: "jsString"
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
      result: null
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.operatorRequest.holarchy.sml.operators.opmi.inStep;
      var rpResponse = holarchy.ObservableControllerData.dataPathResolve({
        opmBindingPath: request_.context.opmBindingPath,
        dataPath: message.path
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var processStepNamespace = "".concat(rpResponse.result, ".__opmStep");
      var filterResponse = request_.ocdi.readNamespace(processStepNamespace);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      response.result = filterResponse.result === message.step;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});