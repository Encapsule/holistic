"use strict";

var holarchy = require("@encapsule/holarchy");

var lib = require("./lib");

var action = new holarchy.ControllerAction({
  id: "V6Oul4CQQtGAIRnERme2qQ",
  name: "Viewpath Page View Step Worker",
  description: "Performs actions on behalf of the ViewpathPageView cell's APM.",
  actionRequestSpec: {
    ____types: "jsObject",
    holistic: {
      ____types: "jsObject",
      service: {
        ____types: "jsObject",
        view: {
          ____types: "jsObject",
          page: {
            ____types: "jsObject",
            _private: {
              ____types: "jsObject",
              stepWorker: {
                ____types: "jsObject",
                action: {
                  ____accept: "jsString",
                  ____inValueSet: ["noop", // do nothing,
                  "perform-initialization", // ?
                  "perform-initial-display-update", "process-hashroute-query-map-values", "perform-display-update"]
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
    ____defaultValue: "Okay"
  },
  bodyFunction: function bodyFunction(request_) {
    var _this = this;

    var response = {
      error: null
    };
    var errors = [];
    var inBreakScope = false;

    var _loop = function _loop() {
      inBreakScope = true;
      var libResponse = lib.getStatus.request({
        context: request_.context
      });

      if (libResponse.error) {
        errors.push(libResponse.error);
        return "break";
      }

      var cellStatus = libResponse.result;
      var messageBody = request_.actionRequest.holistic.service.view.page._private.stepWorker;
      var actorName = "[".concat(_this.filterDescriptor.operationID, "::").concat(_this.filterDescriptor.operationName);
      var actResponse = void 0;
      var ocdResponse = void 0; // Alias for act returns response --- This is probably not going to work well long-term. But, it allows us to call from two different steps and maintain one request signature.
      // BE CAREFUL...

      function performDisplayUpdate(taskDescription_) {
        var viewContext = {
          routerEventNumber: cellStatus.cellMemory.lastProcessedEventNumber,
          hashroutePathname: cellStatus.cellMemory.hashroutePathname,
          hashrouteQueryParse: cellStatus.cellMemory.hashrouteQueryParse,
          metadata: cellStatus.cellMemory.metadata // You'll need session too. But this will always be via act.

        };
        return request_.context.act({
          actorName: actorName,
          actorTaskDescription: taskDescription_,
          actionRequest: {
            holistic: {
              app: {
                client: {
                  display: {
                    update: {
                      // <= Display adapter update takes the data required to render the entire page view via the PageView.jsx React component.
                      renderContext: {
                        apmBindingPath: cellStatus.activationProcess.query.apmBindingPath
                      },
                      thisProps: {
                        // <= ... by sending this value through <ComponentRouter/>
                        viewContext: viewContext,
                        // <= ... data about the page view process (the "display driver") that "owns" the display process
                        renderData: {
                          // <= ... Select via d2r2 and render via top-level PageView.jsx React component
                          // CHRIS ATTEMPT #2: DISPLAY PROCESS LAYER INTEGRATION.

                          /*
                          holistic: {
                              app: {
                                  display: {
                                      PageView: {
                                      }
                                  }
                              }
                          }
                          */
                          //  CHRIS ATTEMPT #1 AT "DISPLAY PROCESS LAYER" INTEGRATION. MEH.
                          viewpath: {
                            pageview: {
                              Template: {
                                // <= ... and PageView_Template this.props.renderData starts here
                                pageViewLayoutAspects: {
                                  // PageView_Template.jsx spreads its this.props over the three primary rows that comprise any page view
                                  // i.e. this.props.viewContext is passed through automatically.
                                  staticHeaderRenderData: {
                                    viewpath: {
                                      pageview: {
                                        panel: {
                                          Header: {}
                                        }
                                      }
                                    }
                                  },
                                  staticFooterRenderData: {
                                    viewpath: {
                                      pageview: {
                                        panel: {
                                          Footer: {}
                                        }
                                      }
                                    }
                                  },
                                  dynamicContentRenderData: {
                                    viewpath: {
                                      widget: {
                                        Flexbox: {
                                          divID: "idFlexbox_Content",
                                          divClass: "content",
                                          flexWrap: "nowrap",
                                          // The "boxes on the screen" magic comes when we synthesize this request from metadata
                                          items: [{
                                            divClass: "panel panel-navtree",
                                            flexItemRenderData: {
                                              viewpath: {
                                                widget: {
                                                  NavTree: {}
                                                }
                                              }
                                            }
                                          }, {
                                            divClass: "section",
                                            flexGrow: 1,
                                            flexItemRenderData: {
                                              viewpath: {
                                                pageview: {
                                                  Content: {}
                                                }
                                              }
                                            }
                                          }]
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          } // */

                        }
                      }
                    }
                  }
                }
              }
            }
          }
        });
      } // performDisplayUpdatge


      switch (messageBody.action) {
        case "noop":
          break;

        case "perform-initialization":
          // We need to process the initial query map values here.
          break;

        case "perform-initial-display-update":
          actResponse = performDisplayUpdate("Attempting to perform initial display update for this newly activated ViewpathPageView cell.");

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          break;

        case "process-hashroute-query-map-values":
          // TODO: We need to do something here. How best to allow developers to extend?
          ocdResponse = request_.context.ocdi.writeNamespace({
            apmBindingPath: request_.context.apmBindingPath,
            dataPath: "#.lastProcessedEventNumber"
          }, cellStatus.cellMemory.routerEventNumber);

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }

          break;

        case "perform-display-update":
          // Really, the fewer number of times we hit this code path the better the UX will be...
          // d2r2 layout is currently a very expensive process that cannot support (generally) complex layouts at any rate above several frames / second.
          // If you want to animate, d2r2 is not the correct tool. The MAJORITY of the overhead is React itself.
          actResponse = performDisplayUpdate("Attempting to perform initial display update for this newly activated ViewpathPageView cell.");

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          break;

        default:
          errors.push("Internal error unrecogized step work action \"".concat(messageBody.action, "\"."));
          break;
      } // switch


      return "break";
    };

    while (!inBreakScope) {
      var _ret = _loop();

      if (_ret === "break") break;
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