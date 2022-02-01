"use strict";

/*
  O       o O       o O       o
  | O   o | | O   o | | O   o |
  | | O | | | | O | | | | O | |
  | o   O | | o   O | | o   O |
  o       O o       O o       O
*/
// @encapsule/holarcy - the keystone of holistic app platform
// Copyright (C) 2021 Christopher D. Russell for Encapsule Project
var arccore = require("@encapsule/arccore");

var SimpleStopwatch = require("../util/SimpleStopwatch");

var logger = require("../util/holarchy-logger-filter");

var opcMethodActInputSpec = require("./iospecs/opc-method-act-input-spec");

var opcMethodActOutputSpec = require("./iospecs/opc-method-act-output-spec");

var factoryResponse = arccore.filter.create({
  operationID: "PgH0_QIhSs2c6nsw53uCjQ",
  operationName: "OPC Act Filter",
  operationDescription: "Implements OPC's algorithm for routing an action request from an actor through to a specific ControllerAction based on request signature. And, for then orchestrating the cellular processes hosted in the OPC so that they can respond to the action.",
  inputFilterSpec: opcMethodActInputSpec,
  outputFilterSpec: opcMethodActOutputSpec,
  bodyFunction: function bodyFunction(request_) {
    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;
    var initialActorStackDepth = 0; // default

    var stopwatch = new SimpleStopwatch("OPC::act");
    var opcRef = request_.opcRef;

    try {
      while (!inBreakScope) {
        inBreakScope = true;

        if (!opcRef.isValid()) {
          // Retrieve just the error string, not the entire response.
          errors.push("Zombie instance:");
          errors.push(opcRef.toJSON().error);
          break;
        } // If the specified apmBinding path is a cell process coordinate descriptor object
        // then we need to convert it the equivalent ObservableControllerData (ObservableCellData)
        // path string before we attempt to dispatch the actual action request.


        var apmBindingPath = request_.apmBindingPath;
        var innerResponse = arccore.types.check.inTypeSet({
          value: apmBindingPath,
          types: "jsObject"
        });

        if (innerResponse.error) {
          errors.push("Internal error: ".concat(innerResponse.error));
          break;
        }

        if (innerResponse.result) {
          // We have a winner.
          // We have been passed a cell process coordinate descriptor object that we need to convert to an
          // ObservableControllerData (OCD) dot-delimited path string. But, this is ObservableProcessController
          // (OPC) level code that sits below the CellProcessor (CP) and its CellProcessManager (CPM) that calculates
          // and caches various OCD path values used by cell processes. So, we leverage the OPC action dispatcher
          // to call a CPM-defined action in order to convert the cell process coordinate descriptor to a OCD path.
          // For this we do not push/pop the actor stack; we just make the call.
          var innerActionMessage = {
            context: {
              apmBindingPath: "~",
              ocdi: opcRef._private.ocdi,
              act: opcRef.act
            },
            actionRequest: {
              CellProcessor: {
                cell: {
                  query: {},
                  cellCoordinates: {
                    apmID: apmBindingPath.apmID,
                    instanceName: apmBindingPath.instanceName
                  }
                }
              }
            }
          };
          innerResponse = opcRef._private.actionDispatcher.request(innerActionMessage);

          if (innerResponse.error) {
            errors.push("Internal error: ".concat(innerResponse.error));
            break;
          }

          innerResponse = innerResponse.result.request(innerActionMessage);

          if (innerResponse.error) {
            errors.push("Internal error: ".concat(innerResponse.error));
            break;
          }

          apmBindingPath = innerResponse.result.query.apmBindingPath;
        } // end if
        // Prepare the controller action plug-in filter request descriptor object.


        var controllerActionRequest = {
          context: {
            apmBindingPath: apmBindingPath,
            ocdi: opcRef._private.ocdi,
            act: opcRef.act
          },
          actionRequest: request_.actionRequest
        }; // Push the actor stack.

        initialActorStackDepth = opcRef._private.opcActorStack.length; // save the initial stack depth

        opcRef._private.opcActorStack.push({
          actorName: request_.actorName,
          actorTaskDescription: request_.actorTaskDescription
        });

        if (initialActorStackDepth === 0) {
          console.log("\nEXTERNAL ACTOR -->");
          console.log("O       o O       o O       o");
          console.log("| O   o | | O   o | | O   o |");
          console.log("| | O | | | | O | | | | O | |");
          console.log("| o   O | | o   O | | o   O |");
          console.log("o       O o       O o       O");
        } // Log the start of the action.


        logger.request({
          opc: {
            id: opcRef._private.id,
            iid: opcRef._private.iid,
            name: opcRef._private.name,
            evalCount: opcRef._private.evalCount,
            frameCount: 0,
            actorStack: opcRef._private.opcActorStack
          },
          subsystem: "opc",
          method: "act",
          phase: "prologue",
          message: "START ACTION..."
        });
        logger.request({
          opc: {
            id: opcRef._private.id,
            iid: opcRef._private.iid,
            name: opcRef._private.name,
            evalCount: opcRef._private.evalCount,
            frameCount: 0,
            actorStack: opcRef._private.opcActorStack
          },
          subsystem: "opc",
          method: "act",
          phase: "body",
          message: request_.actorTaskDescription
        }); // Dispatch the action on behalf of the actor.

        var actionResponse = null;
        var actionFilter = null;

        try {
          // Dispatch the actor's requested action.
          actionResponse = opcRef._private.actionDispatcher.request(controllerActionRequest);

          if (actionResponse.error) {
            actionResponse = {
              error: "Invalid action request cannot be routed to any registered ControllerAction plug-in."
            };
          } else {
            actionFilter = actionResponse.result;
            logger.request({
              opc: {
                id: opcRef._private.id,
                iid: opcRef._private.iid,
                name: opcRef._private.name,
                evalCount: opcRef._private.evalCount,
                frameCount: 0,
                actorStack: opcRef._private.opcActorStack
              },
              subsystem: "opc",
              method: "act",
              phase: "body",
              message: "... action request routed to [".concat(actionFilter.filterDescriptor.operationID, "::").concat(actionFilter.filterDescriptor.operationName, "].")
            });
            actionResponse = actionFilter.request(controllerActionRequest);

            if (actionResponse.error) {
              actionResponse = {
                error: "Invalid action request rejected by selected ControllerAction plug-in with error: ".concat(actionResponse.error)
              };
            }
          }
        } catch (actionCallException_) {
          actionResponse = {
            error: "An exception occurred inside the [".concat(actionFilter.filterDescriptor.operationID, "::").concat(actionFilter.filterDescriptor.operationName, "] ControllerAction plug-in: ").concat(actionCallException_.message)
          };
        } // If a transport error occurred dispatching the controller action,
        // skip any futher processing (including a possible evaluation)
        // and return. Transport errors represent serious flaws in a derived
        // app/service that must be corrected. We skip possible evaluation
        // that would normally occur to make it simpler for developers to diagnose
        // the transport error.


        if (actionResponse.error) {
          errors.push(actionResponse.error);

          if (opcRef._private.opcActorStack.length === 1) {
            console.log("> Informing Cell Process Manager of external actor request error."); // Best effort here...

            opcRef.act({
              actorName: "OPC::act Error Handler",
              actorTaskDescription: "Informing Cell Process Manager about the error that occurred processing action request from external actor.",
              actionRequest: {
                CellProcessor: {
                  _private: {
                    opcCellPlaneErrorNotification: {
                      errorType: "action-error",
                      opcActResponse: actionResponse
                    }
                  }
                }
              }
            });
          } // if last actor on the actor stack


          break;
        } // If no errors have occurred then there's by definition at least
        // one pending action on the actor stack. This is so because
        // controller actions may delegate to other controller actions via
        // re-entrant calls to ObservableProcessController.act method.
        // Such delegations are non-observable, i.e. they are atomic
        // with respect to OPC evaluation. So, we only re-evaluate when
        // we have finished the last of >= 1 controller action plug-in
        // filter delegations. And, this propogates the net effects of
        // the controller action as observed in the contained ocdi according


        var evaluateResponse = {
          error: null
        };

        if (opcRef._private.opcActorStack.length === 1) {
          logger.request({
            opc: {
              id: opcRef._private.id,
              iid: opcRef._private.iid,
              name: opcRef._private.name,
              evalCount: opcRef._private.evalCount,
              frameCount: 0,
              actorStack: opcRef._private.opcActorStack
            },
            subsystem: "opc",
            method: "act",
            phase: "body",
            message: "Propogating the affects of the external actor's action across the runtime cell plane..."
          }); // Evaluate is an actor too. It adds itself to the OPC actor stack.
          // And is responsible itself for ensuring that it cleans up after
          // itself no matter how it may fail.

          evaluateResponse = opcRef._evaluate();
          logger.request({
            opc: {
              id: opcRef._private.id,
              iid: opcRef._private.iid,
              name: opcRef._private.name,
              evalCount: opcRef._private.evalCount,
              frameCount: 0,
              actorStack: opcRef._private.opcActorStack
            },
            subsystem: "opc",
            method: "act",
            phase: "body",
            message: "The affect(s) of the external actor's action have been propogated across the runtime cell plane."
          });
          logger.request({
            opc: {
              id: opcRef._private.id,
              iid: opcRef._private.iid,
              name: opcRef._private.name,
              evalCount: opcRef._private.evalCount,
              frameCount: 0,
              actorStack: opcRef._private.opcActorStack
            },
            subsystem: "opc",
            method: "act",
            phase: "body",
            message: "CellProcessor will now go back to sleep and wait for another external actor to act..."
          });

          if (evaluateResponse.error) {
            errors.push("Unable to evaluate OPC state after executing controller action due to error:");
            errors.push(evaluateResponse.error); // a literal failure in the evaluate algorithm is promoted to transport error

            break;
          }
        }

        response.result = {
          actionResult: actionResponse.result,
          lastEvaluation: evaluateResponse.result
        };

        if (!evaluateResponse.error && response.result.lastEvaluation && response.result.lastEvaluation.summary.counts.errors !== 0) {
          // There are transport error(s) occurring during OPC evaluation that indicate (typically) bug(s) in registered CellModel(s).
          console.log("> Informing Cell Process Manager about transport error(s) that occurred during post-action evaluation of the cell plane."); // Best effort here...

          opcRef.act({
            actorName: "OPC::act Error Handler",
            actorTaskDescription: "Informing Cell Process Manager about the transport error(s) that occurred during post-action evaluation of cell plane.",
            actionRequest: {
              CellProcessor: {
                _private: {
                  opcCellPlaneErrorNotification: {
                    errorType: "evaluation-error",
                    opcActResponse: response
                  }
                }
              }
            }
          });
        } // if last actor on the stack and transport error(s)


        break;
      } // while (!inBreakScope)


      if (errors.length) {
        response.error = errors.join(" ");
      }
    } catch (exception_) {
      response.error = "ObservableProcessController.act (no-throw) caught an unexpected exception: ".concat(exception_.message);
    }

    var timings = stopwatch.stop();

    if (!response.error) {
      logger.request({
        opc: {
          id: opcRef._private.id,
          iid: opcRef._private.iid,
          name: opcRef._private.name,
          evalCount: opcRef._private.evalCount,
          frameCount: 0,
          actorStack: opcRef._private.opcActorStack
        },
        subsystem: "opc",
        method: "act",
        phase: "epilogue",
        message: "ACTION COMPLETE in ".concat(timings.totalMilliseconds, " ms")
      });
    } else {
      logger.request({
        logLevel: "error",
        opc: {
          id: opcRef._private.id,
          iid: opcRef._private.iid,
          name: opcRef._private.name,
          evalCount: opcRef._private.evalCount,
          frameCount: 0,
          actorStack: opcRef._private.opcActorStack
        },
        subsystem: "opc",
        method: "act",
        phase: "epilogue",
        message: "ERROR in ".concat(timings.totalMilliseconds, " ms: ").concat(response.error)
      });
    } // Check and maintain the OPC actor stack.


    if (opcRef.isValid()) {
      if (initialActorStackDepth !== opcRef._private.opcActorStack.length) {
        // Check and maintain the OPC actor stack.
        if (initialActorStackDepth + 1 !== opcRef._private.opcActorStack.length) {
          response.error = "Invariant assertion error: OPC.act actor stack depth off by ".concat(opcRef._private.opcActorStack.length - initialActorStackDepth - 1, "."); // Nope
        } else {
          opcRef._private.opcActorStack.pop();
        }
      }
    }

    return response;
  } // bodyFunction

});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;