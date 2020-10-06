"use strict";

// TransitionOperator-cpm-parent-process-in-step.js
var arccore = require("@encapsule/arccore");

var cpmLib = require("./lib");

var TransitionOperator = require("../../../TransitionOperator");

var cpmMountingNamespaceName = require("../../filters/cpm-mounting-namespace-name");

var cpmApmBindingPath = "~.".concat(cpmMountingNamespaceName);

var cellProcessQueryRequestFilterBySpec = require("./lib/iospecs/cell-process-query-request-filterby-spec");

module.exports = new TransitionOperator({
  id: "PHPSWivjRyK80Gtymsp-pA",
  name: "Cell Process Manager: Parent Process In Step",
  description: "Returns Boolean true request.context.apmBindingPath is a cell process whose parent cell process is in the specified process step.",
  operatorRequestSpec: {
    ____types: "jsObject",
    holarchy: {
      ____types: "jsObject",
      CellProcessor: {
        ____types: "jsObject",
        parentProcessInStep: {
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
      var message = request_.operatorRequest.holarchy.CellProcessor.parentProcessInStep; // This is all we can ever be 100% sure about based on the apmBindingPath.

      if (request_.context.apmBindingPath === "~") {
        return "break"; // response.result === false
      } // So, we have to query the CPM process tree.


      var cpmLibResponse = cpmLib.getProcessManagerData.request({
        ocdi: request_.context.ocdi
      });

      if (cpmLibResponse.error) {
        errors.push(cpmLibResponse.error);
        return "break";
      }

      var cpmDataDescriptor = cpmLibResponse.result;
      var ownedCellProcessesData = cpmDataDescriptor.data.ownedCellProcesses; // Get the parent process descriptor.

      cpmLibResponse = cpmLib.getProcessParentDescriptor.request({
        cellProcessID: arccore.identifier.irut.fromReference(request_.context.apmBindingPath).result,
        filterBy: message.filterBy,
        ocdi: request_.context.ocdi,
        treeData: ownedCellProcessesData
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

      if (!Array.isArray(message.apmStep)) {
        operatorRequest.holarchy = {
          cm: {
            operators: {
              cell: {
                atStep: {
                  step: message.apmStep,
                  path: parentCellProcessDescriptor.apmBindingPath
                }
              }
            }
          }
        };
      } else {
        operatorRequest.or = [];
        message.apmStep.forEach(function (stepName_) {
          operatorRequest.or.push({
            holarchy: {
              cm: {
                operators: {
                  cell: {
                    atStep: {
                      step: stepName_,
                      path: parentCellProcessDescriptor.apmBindingPath
                    }
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