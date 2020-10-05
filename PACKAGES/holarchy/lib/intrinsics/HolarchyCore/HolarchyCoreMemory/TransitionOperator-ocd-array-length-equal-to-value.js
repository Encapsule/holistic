"use strict";

var TransitionOperator = require("../../../../TransitionOperator");

var ObservableControllerData = require("../../../ObservableControllerData");

module.exports = new TransitionOperator({
  id: "oaF3-dXwQkusjD3I2o9-8g",
  name: "OCD Array Length Equal to Value",
  description: "Returns Boolean true iff the length of the array stored at OCD path equals the specified numerical value (direct or indirect).",
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
            array: {
              ____types: "jsObject",
              path: {
                ____accept: "jsString"
              },
              length: {
                ____types: "jsObject",
                equalToValue: {
                  ____accept: ["jsNumber", // value specified directly
                  "jsString"]
                }
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
      var message = request_.operatorRequest.holarchy.cm.operators.ocd.array;
      var rpResponse = ObservableControllerData.dataPathResolve({
        apmBindingPath: request_.context.apmBindingPath,
        dataPath: message.path
      });

      if (rpResponse.error) {
        errors.push(rpResponse.error);
        break;
      }

      var pathArray = rpResponse.result;
      var ocdResponse = request_.context.ocdi.readNamespace(pathArray);

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var arrayData = ocdResponse.result;
      var value = void 0;

      switch (Object.prototype.toString.call(message.length.equalToValue)) {
        case "[object Number]":
          value = message.length.equalToValue;
          break;

        case "[object String]":
          rpResponse = ObservableControllerData.dataPathResolve({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: message.length.equalToValue
          });

          if (rpResponse.error) {
            errors.push(rpResponse.error);
            break;
          }

          var pathNumber = rpResponse.result;
          ocdResponse = request_.context.ocdi.readNamespace(pathNumber);

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          value = ocdResponse.result;

          if ("[object Number]" !== Object.prototype.toString.call(value)) {
            errors.push("The OCD path '".concat(pathNumber, "' is expected to address a numerical value."));
            break;
          }

          break;

        default:
          errors.push("Unhandled value type specified.");
          break;
      }

      if (errors.length) {
        break;
      }

      response.result = arrayData.length === value;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});