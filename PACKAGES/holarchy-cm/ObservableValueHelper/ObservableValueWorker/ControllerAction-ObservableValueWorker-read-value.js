"use strict";

// ControllerAction-ObservableValueWorker-read.js

/*
  This action reads the actual type-specialized Observable Value cell's value and version mailbox.
  The action will return response.error if:
  - The ObservableValueHelper cell is not linked (configured) so that it can communicate w/whichever cell process provides the ObservableValue of interest.
  - The ObservableValue of interest has actually been activated by its providing cell process.
*/
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasObservableValueWorker = require("./cmasObservableValueWorker");

  var cmLabel = require("./cell-label");

  var actionName = "".concat(cmLabel, " Read Value");

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasObservableValueWorker.mapLabels({
      CM: cmLabel,
      ACT: "read"
    }).result.ACTID,
    name: actionName,
    description: "Reads the type-specialized ObservableValue cell's value and version mailbox descriptor value.",
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
                readValue: {
                  ____types: "jsObject"
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
        var ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "#.__apmiStep"
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var apmiStep = ocdResponse.result;

        if (apmiStep !== "observable-value-worker-proxy-connected") {
          response.result = {
            revision: -3
            /* not linked */

          };
          break;
        }

        ocdResponse = actionRequest_.context.ocdi.readNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "#.ovCell"
        });

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var _ocdResponse$result = ocdResponse.result,
            path = _ocdResponse$result.path,
            lastReadRevision = _ocdResponse$result.lastReadRevision; // Now, actually query the ObservableValue cell for its current value mailbox descriptor.

        var actResponse = actionRequest_.context.act({
          actorName: actionName,
          actorTaskDescription: "Delegating the ObservableValue read request to the target ObservableValue cell...",
          actionRequest: {
            // <- start CellProcessor delegate request
            CellProcessor: {
              cell: {
                cellCoordinates: "#.ovcpProviderProxy",
                delegate: {
                  actionRequest: {
                    // <- start CellProcessProxy action request
                    holarchy: {
                      CellProcessProxy: {
                        proxy: {
                          actionRequest: {
                            // <- start the request to send to the cell process the proxy is connected to, the provider cell process...
                            holarchy: {
                              common: {
                                actions: {
                                  ObservableValue: {
                                    readValue: {
                                      path: path
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          apmBindingPath: actionRequest_.context.apmBindingPath
        });

        if (actResponse.error) {
          errors.push(actResponse.error);
          break;
        }

        response.result = actResponse.result.actionResult; // Update the ObservableValueWorker cell's lastReadRevision value.

        ocdResponse = actionRequest_.context.ocdi.writeNamespace({
          apmBindingPath: actionRequest_.context.apmBindingPath,
          dataPath: "#.ovCell.lastReadRevision"
        }, response.result.revision);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
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