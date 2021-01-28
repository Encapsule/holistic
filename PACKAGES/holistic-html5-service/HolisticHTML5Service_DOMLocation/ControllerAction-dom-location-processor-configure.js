"use strict";

// ControllerAction-dom-location-processor-configure.js
var holarchy = require("@encapsule/holarchy");

var dlpLib = require("./lib");

(function () {
  var action = new holarchy.ControllerAction({
    id: "9s71Ju3pTBmYwCe_Mzfkuw",
    name: "HolisticHTML5Service_DOMLocation Configure",
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
        var messageBody = request_.actionRequest.holistic.app.client.domLocation._private.configure;
        var libResponse = dlpLib.getStatus.request(request_.context);

        if (libResponse.error) {
          errors.push(libResponse.error);
          break;
        }

        var _libResponse$result = libResponse.result,
            cellMemory = _libResponse$result.cellMemory,
            cellProcess = _libResponse$result.cellProcess;
        cellMemory.httpResponseCode = messageBody.httpResponseCode;

        switch (cellMemory.httpResponseCode) {
          case 200:
            // The HTML5 document synthesized by HolisticNodeService is a correctly serialized HolisticHTML5Service instance.
            var serverRouterEvent = cellMemory.locationHistory[0];

            if (!serverRouterEvent.hashrouteString) {
              var hrefReplace = "".concat(serverRouterEvent.hrefParse.href, "#"); // We have a correctly serialized HolisticHTML5Service instance. But, no hashroute specified in the original server router event descriptor.

              libResponse = dlpLib.parseLocation.request({
                actor: "app",
                href: hrefReplace,
                routerEventNumber: 0
              });

              if (libResponse.error) {
                errors.push(libResponse.error);
                break;
              }

              cellMemory.locationHistory[0] = libResponse.result;
              window.location.replace(hrefReplace);
            }

            setTimeout(function () {
              console.log("> HolisticHTML5Service_DOMLocation configure action hashchange event configured act on HolisticHTML5Service_DOMLocation cell via action request.");
              window.addEventListener("hashchange", function (event_) {
                request_.context.act({
                  apmBindingPath: request_.context.apmBindingPath,
                  actorName: "DOMLocationProcessor:hashchange Event Handler",
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
            }, 0);
            break;

          default:
            // TODO Move this into an even registration action for clarity.
            setTimeout(function () {
              console.log("> HolisticHTML5Service_DOMLocation configure action hashchange event configured reload the HTML5 document from HolisticNodeService on any change to window.location.href.");
              window.addEventListener("hashchange", function (event_) {
                window.location.reload();
                event_.preventDefault();
              });
            }, 0); // next tick.

            break;
        } // switch


        if (errors.length) {
          break;
        }

        var ocdResponse = request_.context.ocdi.writeNamespace(cellProcess.apmBindingPath, cellMemory);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }
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