"use strict";

// ControllerAction-ObservableValueHelper-read-value.js

/*
  This action reads the actual type-specialized Observable Value cell's value and version mailbox.
  The action will return response.error if:
  - The ObservableValueHelper cell is not linked (configured) so that it can communicate w/whichever cell process provides the ObservableValue of interest.
  - The ObservableValue of interest has actually been activated by its providing cell process.
*/
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var actionName = "".concat(cmLabel, " Read Value");

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: "readValue"
    }).result.ACTID,
    name: actionName,
    description: "Reads the type-specialized ObservableValue cell's value and version mailbox descriptor value.",
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____label: "".concat(actionName, " Request"),
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValueHelper: {
              ____types: "jsObject",
              readValue: {
                ____types: "jsObject",
                path: {
                  ____accept: "jsString",
                  ____defaultValue: "#"
                }
              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____label: "".concat(actionName, " Result"),
      ____types: "jsObject",
      value: {
        ____label: "Value",
        ____opaque: true // We do not know and we do not care at this level if this valid or what it even means.

      },
      revision: {
        ____label: "Revision",
        ____accept: "jsNumber"
      }
    },
    bodyFunction: function bodyFunction(actionRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = actionRequest_.actionRequest.holarchy.common.actions.ObservableValueHelper.readValue;
        var ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "".concat(messageBody.path, ".__apmiStep")
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var ovhStep = ocdResponse.result;

        if (ovhStep !== "observable-value-helper-linked") {
          response.result = {
            revision: -3
            /* not linked */

          };
          break;
        }

        ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "".concat(messageBody.path, ".observableValueWorkerProcess.apmBindingPath")
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var ovwProcessCoordinates = ocdResponse.result;
        var actResponse = actionRequest_.context.act({
          actorName: actionName,
          actorTaskDescription: "Delegating the ObservableValue read request to our ObservableValueWorker cell process instance...",
          actionRequest: {
            holarchy: {
              common: {
                actions: {
                  ObservableValueWorker: {
                    _private: {
                      readValue: {}
                    }
                  }
                }
              }
            }
          },
          apmBindingPath: ovwProcessCoordinates
        });

        if (actResponse.error) {
          errors.push(actResponse.error);
          break;
        }

        response.result = actResponse.result.actionResult;
        break;
      }

      if (errors.length) {
        response.error = errors.join(" ");
      }

      return response;
    }
  });

  if (!action.isValid()) {
    throw new Error(action.toJSON());
  }

  module.exports = action;
})();