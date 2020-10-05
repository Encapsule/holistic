"use strict";

// TransitionOperator-cpm-child-processes-all-in-step.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../../TransitionOperator");

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec");

module.exports = new TransitionOperator({
  id: "5P2MHjL4TXCqScp_xNrJyA",
  name: "Cell Process Manager: Child Processes All In Step",
  description: "Returns Boolean true request.context.apmBindingPath is a cell process whose child processes are all in the specified process step.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        childProcessesAllInStep: {
          ____types: "jsObject",
          apmStep: {
            // If apmStep is a single step name (string) then all child cell processes must be in that step.
            // If apmStep is an array of step names (strings), then all child cell processes must be in any of the indicated steps.
            ____types: ["jsString", "jsArray"],
            stepName: {
              ____accept: "jsString"
            }
          },
          filterBy: cellProcessQueryRequestFilterBySpec
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
      var message = request_.operatorRequest.holarchy.CellProcessor.childProcessesAllInStep;
      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var ownedCellProcessesData = cpmDataDescriptor.data.ownedCellProcesses;
      cpmLibResponse = cpmLib.getProcessChildrenDescriptors.request({
        cellProcessID: arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result,
        filterBy: message.filterBy,
        ocdi: request_.context.ocdi,
        treeData: ownedCellProcessesData
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      }

      var childCellProcessDescriptors = cpmLibResponse.result;

      if (!childCellProcessDescriptors.length) {
        return "break";
      }

      var operatorRequest = {
        and: []
      };
      childCellProcessDescriptors.forEach(function (childCellProcessDescriptor_) {
        if (!Array.isArray(message.apmStep)) {
          operatorRequest.and.push({
            holarchy: {
              cm: {
                operators: {
                  cell: {
                    atStep: {
                      step: message.apmStep,
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
          message.apmStep.forEach(function (stepName_) {
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
          operatorRequest.and.push(suboperatorRequest);
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