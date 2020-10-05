"use strict";

var TransitionOperator = require("../../../../TransitionOperator");

var ObservableControllerData = require("../../../ObservableControllerData");

module.exports = new TransitionOperator({
  id: "2w7n6KxdR8mdIliePJesLQ",
  name: "OCD Namespace A ? B Value Comparison",
  description: "Returns Boolean true iff operand A and B values compare using the indicated comparison operator. Note either A and/or B may be specified by value or path.",
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

        } // cm

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
      var message = request_.operatorRequest.holarchy.cm.operators.ocd.compare.values;
      var rpResponse = void 0;
      var ocdResponse = void 0; // Get operand A

      var operandA = void 0;

      if (!message.a.path) {
        operandA = message.a.value;
      } else {
        rpResponse = ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.context.apmBindingPath,
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
        rpResponse = ObservableControllerData.dataPathResolve({
          apmBindingPath: request_.context.apmBindingPath,
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