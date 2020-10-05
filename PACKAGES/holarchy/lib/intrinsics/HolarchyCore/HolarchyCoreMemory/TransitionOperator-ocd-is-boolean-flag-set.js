"use strict";

var TransitionOperator = require("../../../../TransitionOperator");

var ObservableControllerData = require("../../../ObservableControllerData");

module.exports = new TransitionOperator({
  id: "UeLs9PcASwuC7KR190eYhA",
  name: "OCD Boolean Flag Is Set",
  description: "Returns Boolean true iff the indicated Boolean flag namespace is true.",
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
            isBooleanFlagSet: {
              ____types: "jsObject",
              path: {
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
      result: false
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.operatorRequest.holarchy.cm.operators.ocd.isBooleanFlagSet;
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
      }

      response.result = filterResponse.result === true;
      break;
    }

    if (errors.length) response.error = errors.join(" ");
    return response;
  }
});