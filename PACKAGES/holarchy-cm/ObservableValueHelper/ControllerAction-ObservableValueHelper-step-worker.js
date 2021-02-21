"use strict";

// ControllerAction-ObservableValueHelper-step-worker.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var cmasResponse = cmasHolarchyCMPackage.makeSubspaceInstance({
    spaceLabel: cmLabel
  });

  if (cmasResponse.error) {
    throw new Error(cmasResponse.error);
  }

  var cmasObservableValueHelper = new holarchy.CellModelArtifactSpace(cmasResponse.result);
  var actionName = "".concat(cmLabel, "::stepWorker");

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasObservableValueHelper.mapLabels({
      ACT: "stepWorker"
    }).result.ACTID,
    name: actionName,
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
        var libResponse = lib.getStatus.request(actionRequest_.context);

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var cellMemory = libResponse.result.cellMemory;
        console.log("> Dispatching ".concat(actionName, " action ").concat(messageBody.action, "..."));
        var actResponse = void 0,
            ocdResponse = void 0;

        switch (messageBody.action) {
          case "noop":
            break;

          case "apply-configuration":
            actResponse = actionRequest_.context.act({
              actorName: actionName,
              actorTaskDescription: "Activating an ObservableValueWorker cell to maintain the link.",
              actionRequest: {
                CellProcessor: {
                  process: {
                    processCoordinates: {
                      apmID: cmasHolarchyCMPackage.mapLabels({
                        APM: "ObservableValueWorker"
                      }).result.APMID,
                      instanceName: actionRequest_.context.apmBindingPath // We know this is unique within the neighborhood of cells that may occupy our CellProcessor's cellplane. So this guarantees that the ObversableValueWorker instance is unique and dedicated to serving this ObservableValueHelper cell.

                    },
                    activate: {
                      processData: {
                        configuration: {
                          observableValueHelper: {
                            apmBindingPath: actionRequest_.context.apmBindingPath
                          }
                        }
                      }
                    }
                  }
                }
              }
            });

            if (actResponse.error) {
              errors.push(actResponse.error);
              break;
            }

            ocdResponse = actionRequest_.context.ocdi.writeNamespace({
              apmBindingPath: actionRequest_.context.apmBindingPath,
              dataPath: "#._private.observableValueWorker"
            });

            if (ocdResponse.error) {
              errors.push(ocdResponse.error);
              break;
            }

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