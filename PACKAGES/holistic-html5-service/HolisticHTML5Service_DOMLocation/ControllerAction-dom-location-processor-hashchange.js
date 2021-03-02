"use strict";

// ControllerAction-dom-client-event-sink-hashchange.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolisticHTML5ServicePackage = require("../cmasHolisticHTML5ServicePackage");

  var cmLabel = require("./cm-label");

  var actLabel = "".concat(cmLabel, "::hashchange");

  var dlpLib = require("./lib");

  var action = new holarchy.ControllerAction({
    id: cmasHolisticHTML5ServicePackage.mapLabels({
      CM: cmLabel,
      ACT: actLabel
    }).result.ACTID,
    name: actLabel,
    description: "Processes hashchange events from the DOM on behalf of ".concat(cmLabel, " cell."),
    actionRequestSpec: {
      ____types: "jsObject",
      holistic: {
        ____types: "jsObject",
        app: {
          ____types: "jsObject",
          client: {
            ____types: "jsObject",
            domLocation: {
              ____types: "jsObject",
              _private: {
                ____types: "jsObject",
                notifyEvent: {
                  ____types: "jsObject",
                  hashchange: {
                    ____types: "jsObject",
                    event: {
                      ____opaque: true
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
      ____accept: "jsUndefined"
    },
    // action returns no response.result
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var libResponse = dlpLib.parseLocation.request({
          actor: "user",
          href: window.location.href
        });

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        ;
        var routerEventDescriptor = libResponse.result; // v0.0.51-ametrine
        // Write the newly parsed window.location.href string to our observable value output.

        var actResponse = request_.context.act({
          actorName: actLabel,
          actorTaskDescription: "Write the new router event descriptor to our ObservableValue output mailbox.",
          actionRequest: {
            holarchy: {
              common: {
                actions: {
                  ObservableValue: {
                    writeValue: {
                      value: routerEventDescriptor,
                      path: "#.outputs.domLocation" // Relative to apmBindingPath

                    }
                  }
                }
              }
            }
          },
          apmBindingPath: request_.context.apmBindingPath // Our binding path

        });

        if (actResponse.error) {
          errors.push(actResponse.error);
          break;
        } // ================================================================
        // v0.0.51-ametrine
        // In v0.0.50-crystallite holistic and before we have relied on so-called "lifecycle" actions to communicate
        // events such as hashchange via a "push" actor model. Specifically, here we "push" the event to the derived app's
        // synthesized service cell process via an action request. Generally, "push" actors are fairly simple to rationalize
        // and implement. But, their use must be very very carefully scoped to where this pattern is appropriate. And, this
        // is not such a case. Rather, what we desire is for DOMLocation processor present an encapsulation of the truth of
        // the matter (specifically here the currently-displayed DOM location, hashroute parsing details blah blah).
        // We do not want to know who cares about it, when they care about it, how to tell them, or any of that here however.
        // But, to "push" you need to know this information. And, unlike in this simple case it's very often true that
        // "who cares" is not one cell but rather many. So, push does not scale all that well as a compositional metaphor.
        // At least not at the level of abstraction where push is implemented with a delegated action request as is the
        // case here.

        /* v0.0.51-ametrine DISABLE THE PUSH
         // LEGACY
        let actResponse = request_.context.act({
        actorName: "DOMLocationProcessor",
        actionTaskDescription: "Informing the app client service of udpate to the current hashroute location data.",
        actionRequest: {
        CellProcessor: {
        cell: {
        delegate: {
        cell: cellMemory.derivedAppClientProcessCoordinates,
        actionRequest: { holistic: { app: { client: { lifecycle: { hashroute: { ...routerEventDescriptor } } } } } }
        }
        }
        }
        },
        apmBindingPath: request_.context.apmBindingPath
        });
        if (actResponse.error) {
        errors.push(actResponse.error);
        break;
        }
          *** DISABLE THE PUSH! */
        // ================================================================


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