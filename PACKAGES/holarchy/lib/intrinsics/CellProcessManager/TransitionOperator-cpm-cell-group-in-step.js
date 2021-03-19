"use strict";

// TransitionOperator-cpm-cell-group-in-step.js
//
// Determines true/false if a "cell group" (defined as a dictionary/map or descriptor object)
// containing helper cells are all in a specific APM step. Or, if any of the group members
// are in a specific APM step.
(function () {
  var TransitionOperator = require("../../../TransitionOperator");

  var cpmLib = require("./lib");

  var operator = new TransitionOperator({
    id: "VncYNEtLRauWlwOnXehpwg",
    name: "Cell Process Manager: Cell Group At Step",
    description: "Returns Boolean true if all XOR any member of a group of cells contained within a OCD object namespace are in the specified APM process step.",
    operatorRequestSpec: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        cell: {
          ____types: "jsObject",
          cellCoordinates: {
            ____types: ["jsString", // If a string, then the caller-supplied value must be either a fully-qualified or relative path to a cell. Or, an IRUT that resolves to a known cellProcessID.
            "jsObject" // If an object, then the caller has specified the low-level apmID, instanceName coordinates directly.
            ],
            ____defaultValue: "#",
            apmID: {
              ____accept: "jsString"
            },
            instanceName: {
              ____accept: "jsString",
              ____defaultValue: "singleton"
            }
          },
          query: {
            ____types: "jsObject",
            cellGroupInStep: {
              ____types: "jsObject",
              constraint: {
                ____accept: "jsString",
                ____inValueSet: ["all", "any"]
              },
              apmStep: {
                ____types: ["jsString", "jsArray"],
                stepName: {
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
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = request_.operatorRequest.CellProcessor.cell;
        var cpmLibResponse = cpmLib.cellProcessFamilyOperatorPrologue.request({
          unresolvedCellCoordinates: messageBody.cellCoordinates,
          apmBindingPath: request_.context.apmBindingPath,
          ocdi: request_.context.ocdi
        });

        if (cpmLibResponse.error) {
          errors.push(cpmLibResponse.error);
          break;
        }

        response.result = false;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (!operator.isValid()) {
    throw new Error(operator.toJSON());
  }

  module.exports = operator;
})();