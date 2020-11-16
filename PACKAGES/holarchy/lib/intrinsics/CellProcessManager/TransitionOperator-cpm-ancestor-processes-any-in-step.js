"use strict";

// TransitionOperator-ancestor-processes-any-in-step.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../../TransitionOperator");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var cpmApmBindingPath = "~.".concat(cpmMountingNamespaceName);

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec");

var transitionOperator = new TransitionOperator({
  id: "jFxFmpHSSPaeWEFfLh8eWw",
  name: "Cell Process Manager: Ancestor Processes Any In Step",
  description: "Returns Boolean true if request.context.apmBindingPath is a cell process with ancestor process(es) any of which are in the specified process step(s).",
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
          filterBy: cellProcessQueryRequestFilterBySpec,
          ancestorProcessesAnyInStep: {
            ____types: "jsObject",
            apmStep: {
              // If apmStep is a single step name (string) then all child cell processes must be in that step.
              // If apmStep is an array of step names (strings), then all child cell processes must be in any of the indicated steps.
              ____types: ["jsString", "jsArray"],
              stepName: {
                ____accept: "jsString"
              }
            },
            omitCellProcessor: {
              ____label: "Omit CellProcessor",
              ____description: "Exclude the CellProcessor's Cell Process Manger process step.",
              ____accept: "jsBoolean",
              ____defaultValue: true
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

      var prologueData = cpmLibResponse.result;
      cpmLibResponse = cpmLib.getProcessAncestorDescriptors.request({
        cellProcessID: prologueData.resolvedCellCoordinates.cellPathID,
        filterBy: messageBody.query.filterBy,
        ocdi: request_.context.ocdi,
        treeData: prologueData.ownedCellProcessesData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      } // By definition there's always at least one ancestor descriptor.


      var ancestorCellProcessDescriptors = cpmLibResponse.result;
      var operatorRequest = {
        or: []
      };
      var queryBody = messageBody.query.ancestorProcessesAnyInStep;
      ancestorCellProcessDescriptors.forEach(function (ancestorCellProcessDescriptor_) {
        // Alias the anonymous root namespace to the Cell Process Manger (CPM).
        if (ancestorCellProcessDescriptor_.apmBindingPath === "~") {
          if (queryBody.omitCellProcessor) {
            return;
          }

          ancestorCellProcessDescriptor_.apmBindingPath = cpmApmBindingPath;
        }

        if (!Array.isArray(queryBody.apmStep)) {
          operatorRequest.or.push({
            CellProcessor: {
              cell: {
                cellCoordinates: ancestorCellProcessDescriptor_.apmBindingPath,
                query: {
                  inStep: {
                    apmStep: queryBody.apmStep
                  }
                }
              }
            }
          });
        } else {
          var suboperatorRequest = {
            or: []
          };
          queryBody.apmStep.forEach(function (stepName_) {
            suboperatorRequest.or.push({
              CellProcessor: {
                cell: {
                  cellCoordinates: ancestorCellProcessDescriptor_.apmBindingPath,
                  query: {
                    inStep: {
                      apmStep: stepName_
                    }
                  }
                }
              }
            });
          });
          operatorRequest.or.push(suboperatorRequest);
        }
      });
      var transitionRequest = {
        context: {
          apmBindingPath: "~",
          // CellProcessor
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

if (!transitionOperator.isValid()) {
  throw new Error(transitionOperator.toJSON());
}

module.exports = transitionOperator;