"use strict";

// ObservableValueHelper/ObservableValueWorker/ControllerAction-ObservableValueWorker-step-worker.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmasObservableValueWorker = require("./cmasObservableValueWorker");

  var cmLabel = require("./cell-label");

  var actionName = "".concat(cmLabel, "::stepWorker");

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasObservableValueWorker.mapLabels({
      CM: cmLabel,
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
            ObservableValueWorker: {
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
        var messageBody = actionRequest_.actionRequest.holarchy.common.actions.ObservableValueWorker._private.stepWorker;
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
            // Read the configuration data from our parent ObservableValueHelper cell (who activated us).
            ocdResponse = actionRequest_.context.ocdi.readNamespace({
              apmBindingPath: cellMemory.configuration.observableValueHelper.apmBindingPath,
              dataPath: "#.configuration.observableValue"
            });

            if (ocdResponse.error) {
              errors.push(ocdResponse.error);
              break;
            }

            var observableValueConfig = ocdResponse.result;
            actResponse = actionRequest_.context.act({
              actorName: actionName,
              actorTaskDescription: "Attempting to connect proxy helper to the cell process that owns the ObservableValue family member cell we're attempting to link to.",
              actionRequest: {
                CellProcessor: {
                  proxy: {
                    proxyCoordinates: "#.ovcpProviderProxy",
                    connect: {
                      processCoordinates: observableValueConfig.processCoordinates
                    }
                  }
                }
              },
              apmBindingPath: actionRequest_.context.apmBindingPath
            });

            if (actResponse.error) {
              ocdResponse = actionRequest_.context.ocdi.writeNamespace({
                apmBindingPath: actionRequest_.context.apmBindingPath,
                dataPath: "#.ovcpProviderProxyError"
              }, actResponse.error);

              if (ocdResponse.error) {
                // Now actually report a transport error because this is FUBAR.
                errors.push("Internal error: Attempting to connect cell process proxy to requested provided coordinates failed w/error. And, our attempt to write the error to our cell memory failed!");
                errors.push(actResponse.error);
                errors.push(ocdResponse.error);
              } // No matter what we're done here.


              break;
            } // Okay - so the CellProcessProxy connected w/out error. That's good.


            var proxyConnectInfo = actResponse.result.actionResult; // We will need the relative OCD path beginning in # here in the context of the ObservableValueWorker
            // that indicates where inside of the provider cell process the target ObservableValue cell resides in
            // the cellplane.
            // We need the apmBindingPath of the actual target ObservableValue cell now.

            ocdResponse = holarchy.ObservableControllerData.dataPathResolve({
              apmBindingPath: proxyConnectInfo.connected.apmBindingPath,
              dataPath: observableValueConfig.path
            });

            if (ocdResponse.error) {
              errors.push(ocdResponse.error);
              break;
            }

            var ovCellPath = ocdResponse.result;
            ocdResponse = actionRequest_.context.ocdi.writeNamespace({
              apmBindingPath: actionRequest_.context.apmBindingPath,
              dataPath: "#.ovCell"
            }, {
              path: observableValueConfig.path,
              apmBindingPath: ovCellPath
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