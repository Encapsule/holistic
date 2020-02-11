"use strict";

var holarchy = require("@encapsule/holarchy");

module.exports = new holarchy.TransitionOperator({
  id: "2w7n6KxdR8mdIliePJesLQ",
  name: "OCD Compare Values",
  description: "Returns Boolean true iff operand A and B values compare using the indicated comparison operator.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      sml: {
        ____types: "jsObject",
        operators: {
          ____types: "jsObject",
          ocd: {
            ____types: "jsObject",
            compare: {
              ____types: "jsObject",
              values: {
                ____types: "jsObject",
                a: {
                  ____label: "Operand A",
                  ____description: "Operand A for identical operator comparison. Specifiy either value (direct) XOR path (indirect).",
                  ____types: "jsObject",
                  value: {
                    ____accept: ["jsUndefined", "jsNull", "jsString", "jsNumber", "jsBoolean"]
                  },
                  path: {
                    ____accept: ["jsUndefined", "jsString"]
                  }
                },
                // a
                b: {
                  ____label: "Operand B",
                  ____description: "Operand B for identical operator comparison. Specifiy either value (direct) XOR path (indirect).",
                  ____types: "jsObject",
                  value: {
                    ____accept: ["jsUndefined", "jsNull", "jsString", "jsNumber", "jsBoolean"]
                  },
                  path: {
                    ____accept: ["jsUndefined", "jsString"]
                  }
                },
                // b
                operator: {
                  ____label: "Comparison Operator",
                  ____description: "A string enum indicating the comparison operator to use.",
                  ____accept: "jsString",
                  ____inValueSet: ["===", "==", "<", "<=", ">", ">="] // operator

                }
              } // compare
              // values

            } // ocd

          } // operators

        } // sml

      } // holarchy

    }
  },
  // operatorRequest
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null,
      result: false
    };
    var errors = [];
    var inBreakScope = false;

    while (!inBreakScope) {
      inBreakScope = true;
      var message = request_.operatorRequest.holarchy.sml.operators.ocd.values.areIdentical;
      var rpResponse = void 0;
      var ocdResponse = void 0; // Get operand A

      var operandA = void 0;

      if (!message.a.path) {
        operandA = message.a.value;
      } else {
        rpResponse = holarchy.ObservableControllerData.dataPathResolve({
          opmBindingPath: request_.context.opmBindingPath,
          dataPath: message.a.path
        });

        if (rpResponse.error) {
          errors.push(rpResponse.error);
          break;
        }

        ocdResponse = request_.context.ocdi.readNamespace(rpResponse.result);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        operandA = ocdResponse.result;
      } // Get operand B


      var operandB = void 0;

      if (!message.b.path) {
        operandB = message.b.value;
      } else {
        rpResponse = holarchy.ObservableControllerData.dataPathResolve({
          opmBindingPath: request_.context.opmBindingPath,
          dataPath: message.b.path
        });

        if (rpResponse.error) {
          errors.push(rpResponse.error);
          break;
        }

        ocdResponse = request_.context.ocdi.readNamespace(rpResponse.result);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        operandB = ocdResponse.result;
      } // Set the Boolean result of the operation.


      switch (message.operator) {
        case "===":
          response.result = operandA === operandB;
          break;

        case "==":
          response.result = operandA == operandB;
          break;

        case "<":
          response.result = operandA < operandB;
          break;

        case "<=":
          response.result = operandA <= operandB;
          break;

        case ">":
          response.result = operandA > operandB;
          break;

        case ">=":
          response.result = operandA >= operandB;
          break;

        default:
          errors.push("Unhandled operator value '".concat(message.operator, "'."));
          break;
      }

      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  } // bodyFunction

});