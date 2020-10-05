"use strict";

// TransitionOperator-ocd-map-is-keyless
var TransitionOperator = require("../../../../TransitionOperator");

var ObservableControllerData = require("../../../ObservableControllerData");

module.exports = new TransitionOperator({
  id: "fS5liuD1RBSdaPBEhsoxXw",
  name: "OCD Namespace Is Map Keyless",
  description: "Returns Boolean true iff the indicated OCD namespace is declared as a map in the OCD filter spec AND the OCD value is an object AND Object.key(value) !== 0.",
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
            mapIsKeyless: {
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
      var message = request_.operatorRequest.holarchy.cm.operators.ocd.isMapKeyless;
      var rpResponse = ObservableControllerData.dataPathResolve({
        dataPath: message.path,
        apmBindingPath: request_.context.apmBindingPath
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var path = rpResponse.result;
      var filterResponse = request_.context.ocdi.readNamespace(path);

      if (filterResponse.error) {
        errors.push(filterResponse.error);
        break;
      }

      var value = filterResponse.result;
      var valueTypeString = Object.prototype.toString.call(value);

      if (valueTypeString !== "[object Object]") {
        errors.push("OCD path '".concat(rpResponse.result, "' is not an object. Check value type returned '").concat(valueTypeString, "'."));
        break;
      }

      response.result = Object.keys(value).length === 0;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});