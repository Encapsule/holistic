"use strict";

// TransitionOperator-cpm-parent-process-in-step.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../../TransitionOperator");

var ObservableControllerData = require("../../../lib/ObservableControllerData");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var cpmApmBindingPath = "~.".concat(cpmMountingNamespaceName);

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec");

module.exports = new TransitionOperator({
  id: "PHPSWivjRyK80Gtymsp-pA",
  name: "Cell Process Manager: Parent Process In Step",
  description: "Returns Boolean true request.context.apmBindingPath is a cell process whose parent cell process is in the specified process step.",
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
          filterBy: cellProcessQueryRequestFilterBySpec,
          parentProcessInStep: {
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

    var _loop = function _loop() {
      inBreakScope = true; // This is all we can ever be 100% sure about based on the apmBindingPath.

      if (request_.context.apmBindingPath === "~") {
        return "break"; // response.result === false
      }

      var messageBody = request_.operatorRequest.CellProcessor.cell;
      var cpmLibResponse = cpmLib.cellProcessFamilyOperatorPrologue.request({
        unresolvedCellCoordinates: messageBody.cellCoordinates,
        apmBindingPath: request_.context.apmBindingPath,
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      }

      var prologueData = cpmLibResponse.result; // Get the parent process descriptor.

      cpmLibResponse = cpmLib.getProcessParentDescriptor.request({
        cellProcessID: prologueData.resolvedCellCoordinates.cellPathID,
        filterBy: messageBody.query.filterBy,
        ocdi: request_.context.ocdi,
        treeData: prologueData.ownedCellProcessesData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      }

      var parentCellProcessDescriptor = cpmLibResponse.result;

      if (parentCellProcessDescriptor.apmBindingPath === "~") {
        // Note that we make it appear that the CPM is bound to ~. But, it's not.
        parentCellProcessDescriptor.apmBindingPath = cpmApmBindingPath;
      }

      response.result = parentCellProcessDescriptor.apmBindingPath ? true : false;
      var operatorRequest = {};
      var queryBody = messageBody.query.parentProcessInStep;

      if (!Array.isArray(queryBody.apmStep)) {
        operatorRequest.CellProcessor = {
          cell: {
            cellCoordinates: parentCellProcessDescriptor.apmBindingPath,
            query: {
              inStep: {
                apmStep: queryBody.apmStep
              }
            }
          }
        };
      } else {
        operatorRequest.or = [];
        queryBody.apmStep.forEach(function (stepName_) {
          operatorRequest.or.push({
            CellProcessor: {
              cell: {
                cellCoordinates: parentCellProcessDescriptor.apmBindingPath,
                query: {
                  inStep: {
                    apmStep: stepName_
                  }
                }
              }
            }
          });
        });
      }

      var transitionRequest = {
        context: {
          apmBindingPath: "~",
          ocdi: request_.context.ocdi,
          transitionDispatcher: request_.context.transitionDispatcher
        },
        operatorRequest: operatorRequest
      };
      var dispatchResponse = request_.context.transitionDispatcher.request(transitionRequest);

      if (dispatchResponse.error) {
        errors.push("Internal error dispatching synthesised suboperator request:");
        errors.push(dispatchResponse.error);
        return "break";
      } // Delegate.


      response = dispatchResponse.result.request(transitionRequest);
      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
    }

    if (errors.length) {
      response.error = errors.join(" ");
    }

    return response;
  }
});