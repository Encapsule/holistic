"use strict";

// ControllerAction-DisplayViewBase-link-display-process.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolarchyCMPackage = require("../../cmasHolarchyCMPackage");

  var cmLabel = require("./cell-label");

  var actionLabel = "linkDisplayProcess";
  var actionName = "".concat(cmLabel, "::").concat(actionLabel);

  var lib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasHolarchyCMPackage.mapLabels({
      CM: cmLabel,
      ACT: actionLabel
    }).result.ACTID,
    name: actionName,
    description: "Allows a mounted React.Element (what we call a display process) to communicate back to DisplayView family cell that manages the root of the VDOM React.Element tree they're mounted in.",
    actionRequestSpec: {
      ____types: "jsObject",
      ____description: "Sent from React.Component::didComponentMount/componentWillUnmount method implementation back to CellProcessor::act method using this.props.renderContext.apmBindingPath as the cell process target of the action request.",
      holistic: {
        ____types: "jsObject",
        common: {
          ____types: "jsObject",
          actions: {
            ____types: "jsObject",
            service: {
              ____types: "jsObject",
              html5: {
                ____types: "jsObject",
                display: {
                  ____types: "jsObject",
                  view: {
                    ____types: "jsObject",
                    linkDisplayProcess: {
                      ____types: "jsObject",
                      notifyEvent: {
                        ____accept: "jsString",
                        ____inValueSet: ["display-process-activated", "display-process-deactivating"]
                      },
                      reactElement: {
                        ____types: "jsObject",
                        displayName: {
                          ____accept: "jsString"
                        },
                        thisRef: {
                          ____accept: "jsObject"
                        } // The React.Element sets thisRef to `this` inside its onComponentDidMount and componentWillUnmount methods.

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
    actionResultSpec: {
      ____accept: "jsString",
      ____defaultValue: "okay"
    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var libResponse = lib.getStatus.request(request_.context);

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var _libResponse$result = libResponse.result,
            cellMemory = _libResponse$result.cellMemory,
            cellProcess = _libResponse$result.cellProcess;
        var messageBody = request_.actionRequest.holistic.common.actions.service.html5.display.view.linkDisplayProcess;

        switch (messageBody.notifyEvent) {
          case "display-process-activated":
            if (cellMemory.core.displayProcessLink) {
              errors.push("DisplayView cell at apmBindingPath=\"".concat(request_.context.apmBindingPath, "\" is already linked to a display process with React.Element.displayName=\"").concat(cellMemory.core.displayProcessLink.reactElement.displayName, "\". We presume you did not intend to do this?"));
              break;
            }

            cellMemory.core.displayProcessLink = {
              reactElement: messageBody.reactElement
            };
            break;

          case "display-process-deactivated":
            if (!cellMemory.core.displayProcessLink) {
              errors.push("DisplayView cell at apmBindingPath=\"".concat(request_.context.apmBindingPath, "\" is not currently linked to a display process. We presume you did not intend to do this?"));
              break;
            }

            cellMemory.core.displayProcessLink = undefined; // reset to default

            break;

          default:
            errors.push("INTERNAL ERROR - unhandled switch case.");
            break;
        }

        if (errors.length) {
          break;
        }

        var ocdResponse = request_.context.ocdi.writeNamespace({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: "#.core.displayProcessLink"
        }, cellMemory.core.displayProcessLink);

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