"use strict";

// ControllerAction-ObservableValueHelper-step-worker.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cm-label-string");

  var cmasResponse = cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: cmLabel
  });

  if (cmasResponse.error) {
    throw new Error(cmasResponse.error);
  }

  var cmasObservableValueHelper = new holarchy.CellModelArtifactSpace(cmasResponse.result);

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasObservableValueHelper.mapLabels({
      ACT: "stepWorker"
    }).result.ACTID,
    name: "".concat(cmLabel, " Step Worker"),
    description: "Private evaluation implementation action of ".concat(cmLabel, "."),
    actionRequestSpec: {
      ____types: "jsObject",
      holarchy: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            ObservableValueHelper: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                stepWorker: {
                  ____types: "jsObject",
                  action: {
                    ____accept: "jsString",
                    ____inValueSet: ["noop", "apply-configuration"]
                  }
                }
              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____accept: "jsString",
      ____defaultValue: "okay"
    },
    bodyFunction: function bodyFunction(actionRequest_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = actionRequest_.actionRequest.holarchy.common.actions.ObservableValueHelper._private.stepWorker;
        var actResponse = actionRequest_.context.act({
          actorName: "ObservableValueHelper",
          actorTaskDescription: "Attempting CPM cell query...",
          actionRequest: {
            CellProcessor: {
              cell: {
                query: {},
                cellCoordinates: actionRequest_.context.apmBindingPath
              }
            }
          },
          apmBindingPath: actionRequest_.context.apmBindingPath
        });

        if (actResponse.error) {
          console.log(actResponse.error);
        }

        var libResponse = lib.getStatus.request(actionRequest_.context);

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var cellMemory = libResponse.result.cellMemory;
        console.log("> Dispatching ObservableValueHelper::stepWorker action ".concat(messageBody.action, "..."));

        switch (messageBody.action) {
          case "noop":
            break;

          case "apply-configuration":
            break;

          default:
            errors.push("Internal error - unhandled switch case \"".concat(messageBody.action, "\"."));
            break;
        }

        if (errors.length) {
          break;
        }

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