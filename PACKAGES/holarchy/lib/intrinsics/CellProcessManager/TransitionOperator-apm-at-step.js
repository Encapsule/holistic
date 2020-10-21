"use strict";

var TransitionOperator = require("../../../TransitionOperator");

var ObservableCellData = require("../../ObservableControllerData");

var cpmLib = require("./lib");

module.exports = new TransitionOperator({
  id: "9tNY7o5GTUGH_xda2GhP-w",
  name: "Cell Process Manager: Cell In Step Operator",
  description: "Returns Boolean true iff the indicated cell is active and is in one of N >=1 APM process step label(s).",
  operatorRequestSpec: {
    ____types: "jsObject",
    CellProcessor: {
      ____types: "jsObject",
      cell: {
        ____types: "jsObject",
        cellCoordinates: {
          ____types: [// If a string, then the caller-supplied value must be either a fully-qualified or relative path to a cell.
          // Or, an IRUT that resolves to a known cellProcessID (that by definition must resolve to an active cell).
          "jsString", // If an object, then the caller has specified the low-level apmID, instanceName coordinates directly.
          "jsObject"],
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
          inStep: {
            ____types: "jsObject",
            apmStep: {
              // If apmStep is a single step name (string) then all child cell processes must be in that step.
              // If apmStep is an array of step names (strings), then all child cell processes must be in any of the indicated steps.
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
      error: null,
      result: false
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

      var prologueData = cpmLibResponse.result;
      var ocdResponse = request_.context.ocdi.readNamespace("".concat(prologueData.resolvedCellCoordinates.cellPath, ".__apmiStep"));

      if (ocdResponse.error) {
        errors.push(ocdResponse.error);
        break;
      }

      var cellCurrentStepValue = ocdResponse.result;
      var queryBody = messageBody.query.inStep;
      var testSteps = Array.isArray(queryBody.apmStep) ? queryBody.apmStep : [queryBody.apmStep];
      response.result = testSteps.indexOf(cellCurrentStepValue) >= 0;
      break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});