"use strict";

// TransitionOperator-cpm-child-processes-any-in-step.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../../TransitionOperator");

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec");

module.exports = new TransitionOperator({
  id: "esuJGgmERrSV3AFvFOMyhw",
  name: "Cell Process Manager: Child Processes Any In Step",
  description: "Returns Boolean true request.context.apmBindingPath is a cell process with any child cell process in the specified process step.",
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
          childProcessesAnyInStep: {
            ____types: "jsObject",
            apmStep: {
              ____accept: "jsString"
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
      inBreakScope = true;
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
      cpmLibResponse = cpmLib.getProcessChildrenDescriptors.request({
        cellProcessID: prologueData.resolvedCellCoordinates.cellPathID,
        filterBy: messageBody.query.filterBy,
        ocdi: request_.context.ocdi,
        treeData: prologueData.ownedCellProcessesData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      }

      var childCellProcessDescriptors = cpmLibResponse.result;

      if (!childCellProcessDescriptors.length) {
        response.result = false;
        return "break";
      }

      var operatorRequest = {
        or: []
      };
      var queryBody = messageBody.query.childProcessesAnyInStep;
      childCellProcessDescriptors.forEach(function (childCellProcessDescriptor_) {
        if (!Array.isArray(queryBody.apmStep)) {
          operatorRequest.or.push({
            holarchy: {
              cm: {
                operators: {
                  cell: {
                    atStep: {
                      step: queryBody.apmStep,
                      path: childCellProcessDescriptor_.apmBindingPath
                    }
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
            subOperatorRequest.or.push({
              holarchy: {
                cm: {
                  operators: {
                    cell: {
                      atStep: {
                        step: stepName_,
                        path: childCellProcessDescriptor_.apmBindingPath
                      }
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