"use strict";

// ControllerAction-dom-location-processor-configure.js
(function () {
  var holarchy = require("@encapsule/holarchy");

  var cmasHolisticHTML5ServicePackage = require("../cmasHolisticHTML5ServicePackage");

  var dlpLib = require("./lib");

  var cmLabel = require("./cm-label");

  var actLabel = "".concat(cmLabel, "::configure");
  var action = new holarchy.ControllerAction({
    id: cmasHolisticHTML5ServicePackage.mapLabels({
      CM: cmLabel,
      ACT: actLabel
    }).result.ACTID,
    name: actLabel,
    description: "Used to set the runtime configuration of the process during service boot.",
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
                configure: {
                  ____types: "jsObject",
                  httpResponseCode: {
                    ____accept: "jsNumber"
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
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var messageBody = request_.actionRequest.holistic.app.client.domLocation._private.configure; // Save the HTTP response code forwarded by HolistcHTML5Service_Kernel cell process.
        // Currently, this is the only observable indication of how the DOMLocation cell has configured its event listener.

        var ocdResponse = request_.context.ocdi.writeNamespace({
          apmBindingPath: request_.context.apmBindingPath,
          dataPath: "#.httpResponseCode"
        }, messageBody.httpResponseCode);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        switch (messageBody.httpResponseCode) {
          case 200:
            // The HTML5 document synthesized by HolisticNodeService is a correctly serialized HolisticHTML5Service instance.
            // Parse the initial window.location.href string that the HolisticNodeService responded to.
            var libResponse = dlpLib.parseLocation.request({
              actor: "server",
              href: window.location.href
            });

            if (libResponse.error) {
              errors.push(libResponse.error);
              break;
            }

            var routerEventDescriptor = libResponse.result; // If there is no hash string currently, replace add one, reparse, and call window.location.replace to inform the DOM (and update the displayed URL).

            if (!routerEventDescriptor.hashrouteString) {
              var hrefReplace = "".concat(routerEventDescriptor.hrefParse.href, "#");
              window.location.replace(hrefReplace); // We have a correctly serialized HolisticHTML5Service instance. But, no hashroute specified in the original server router event descriptor.

              libResponse = dlpLib.parseLocation.request({
                actor: "app",
                href: hrefReplace
              });

              if (libResponse.error) {
                errors.push(libResponse.error);
                break;
              }

              routerEventDescriptor = libResponse.result;
            } // Write our output ObservableValue w/the initial route parse descriptor.


            var actResponse = request_.context.act({
              actorName: actLabel,
              actorTaskDescription: "Write the initial router event descriptor to our ObservableValue output mailbox.",
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
            }

            setTimeout(function () {
              console.log("> HolisticHTML5Service_DOMLocation configure action hashchange event configured act on HolisticHTML5Service_DOMLocation cell via action request.");
              window.addEventListener("hashchange", function (event_) {
                request_.context.act({
                  apmBindingPath: request_.context.apmBindingPath,
                  actorName: "".concat(actLabel, "::hashchange Event Handler"),
                  actorTaskDescription: "Notifying the DOM Location Processor of hashchange/location update.",
                  actionRequest: {
                    holistic: {
                      app: {
                        client: {
                          domLocation: {
                            _private: {
                              notifyEvent: {
                                hashchange: {
                                  event: event_
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                });
                event_.preventDefault();
              });
            }, 0); // execute immediately after unwinding the current synchronous call stack (i.e. next JS clock tick).

            break;

          default:
            // TODO Move this into an even registration action for clarity.
            setTimeout(function () {
              console.log("> HolisticHTML5Service_DOMLocation configure action hashchange event configured reload the HTML5 document from HolisticNodeService on any change to window.location.href.");
              window.addEventListener("hashchange", function (event_) {
                window.location.reload();
                event_.preventDefault();
              });
            }, 0); // execute immediately after unwinding the current synchronous call stack (i.e. next JS clock tick).

            break;
        } // switch


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