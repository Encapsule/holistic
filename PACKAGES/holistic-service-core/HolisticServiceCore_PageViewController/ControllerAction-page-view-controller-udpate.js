"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holarchy = require("@encapsule/holarchy");

(function () {
  // Note that this action binds to the Page View Controller cell process (always a singleton) wherever it resides in the cellplane.
  // We do not know where it is initially. So, we query CellProcessor and cache the response result for reuse (because it never changes).
  var cachedPageViewControllerProcessQuery = null;
  var cachedAppMetadata = {
    org: null,
    app: null,
    hashroutes: {}
  };
  var action = new holarchy.ControllerAction({
    id: "-Qq4BFlUQIWysNMe6z_ucw",
    name: "PageViewController Update",
    description: "Tell the PageViewController process to udpate the active PageView process and hand responsibility for calling app client display update off to the new PageView process.",
    actionRequestSpec: {
      ____types: "jsObject",
      holistic: {
        ____types: "jsObject",
        service: {
          ____types: "jsObject",
          view: {
            ____types: "jsObject",
            controller: {
              ____types: "jsObject",
              update: {
                ____types: "jsObject",
                hrefParse: {
                  ____accept: "jsObject" // TODO - this is a service core-defined common filter spec for holistic platform TODO

                },
                hashroutePathname: {
                  ____accept: ["jsNull", "jsString"] // corresponds to routerEventDescriptor.hashrouteParse.pathname which is also the string key format to access hashroute app metadata

                },
                hashrouteQueryParse: {
                  ____types: ["jsNull", "jsObject"],
                  ____asMap: true,
                  paramName: {
                    ____label: "Unparsed Param Value",
                    ____accept: ["jsNull", "jsString"]
                  }
                },
                routerEventNumber: {
                  ____label: "DOMLocationProcessor Router Event Number",
                  ____description: "The last routerEventDescriptor.routerEventNumber received via our update action. This count is stored to allow this process to quickly determine if hashrouteQueryParse has been updated by PageViewController while this derived app service is active.",
                  ____accept: "jsNumber"
                }
              }
            }
          }
        }
      }
    },
    actionResultSpec: {
      ____accept: "jsObject" // think we'll return the newly activate ViewpathPageView process coordinates here.
      // TODO: lock this down

    },
    bodyFunction: function bodyFunction(request_) {
      var response = {
        error: null,
        result: {}
      };
      var errors = [];
      var inBreakScope = false;

      while (!inBreakScope) {
        inBreakScope = true;
        var actorName = "[".concat(this.operationID, "::").concat(this.operationName, "]"); // Cache miss? Where is the PageViewController cell process in the cellplane?

        if (!cachedPageViewControllerProcessQuery) {
          var actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Obtaining the process coordinates of the singleton process.",
            actionRequest: {
              CellProcessor: {
                cell: {
                  cellCoordinates: {
                    apmID: "AZaqZtWRSdmHOA6EbTr9HQ"
                  },
                  query: {}
                }
              }
            }
          });

          if (actResponse.error) {
            errors.push(actResponse.error);
            break;
          }

          cachedPageViewControllerProcessQuery = actResponse.result.actionResult.query;
        } // if cache miss
        // Now read the Viewpath Page View Controller cell memory.


        var ocdResponse = request_.context.ocdi.readNamespace(cachedPageViewControllerProcessQuery.apmBindingPath);

        if (ocdResponse.error) {
          errors.push(ocdResponse.error);
          break;
        }

        var pageViewControllerMemory = ocdResponse.result;
        var messageBody = request_.actionRequest.holistic.service.view.controller.update; // Use the pageViewPathname string that derives from the hashroute to query the app metadata process for corresponding hashroute metadata.
        // TODO: We can also cache hashroute metadata by hashroute pathname to speed this action up (at the expense of some small memory replication overhead) in this module scope.

        var hashrouteMetadata = cachedAppMetadata.hashroutes[messageBody.hashroutePathname];

        if (!hashrouteMetadata) {
          // cache miss
          var _actResponse = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Querying the app metadata process to retrieve metadata for hashroute pathname \"".concat(messageBody.hashroutePathname, "\"."),
            actionRequest: {
              holistic: {
                app: {
                  metadata: {
                    query: {
                      type: "hashroute",
                      uri: messageBody.hashroutePathname
                    }
                  }
                }
              }
            }
          });

          if (_actResponse.error) {
            // TODO: We really do not want to crash the app client here do we :-)
            errors.push(_actResponse.error);
            break;
          }

          hashrouteMetadata = cachedAppMetadata.hashroutes[messageBody.hashroutePathname] = _actResponse.result.actionResult;
        }

        var orgMetadata = cachedAppMetadata.org;

        if (!orgMetadata) {
          var _actResponse2 = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Querying the app metadata process to retrieve metadata for hashroute pathname \"".concat(messageBody.hashroutePathname, "\"."),
            actionRequest: {
              holistic: {
                app: {
                  metadata: {
                    query: {
                      type: "org"
                    }
                  }
                }
              }
            }
          });

          if (_actResponse2.error) {
            errors.push(_actResponse2.error);
            break;
          }

          orgMetadata = cachedAppMetadata.org = _actResponse2.result.actionResult;
        }

        var appMetadata = cachedAppMetadata.app;

        if (!appMetadata) {
          var _actResponse3 = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Querying the app metadata process to retrieve metadata for hashroute pathname \"".concat(messageBody.hashroutePathname, "\"."),
            actionRequest: {
              holistic: {
                app: {
                  metadata: {
                    query: {
                      type: "app"
                    }
                  }
                }
              }
            }
          });

          if (_actResponse3.error) {
            errors.push(_actResponse3.error);
            break;
          }

          appMetadata = cachedAppMetadata.app = _actResponse3.result.actionResult;
        }

        console.log("hashrouteMetadata for pathname \"".concat(messageBody.hashroutePathname, "\"=\"").concat(JSON.stringify(hashrouteMetadata, undefined, 4), "\"")); // Now we have enough information to activate a ViewpathPageView cell process that takes care of the many
        // details pertaining to monitoring data processes for change. And, reacting to those changes by applying
        // layout and/or data updates to the app client display processes.
        // Note that in the future we may decide to look at the selected hashroute metadata and do something
        // differently wrt activating the new page view process. But, for now it's straight-forward; we just pass
        // in the hashroute metadata + the hashroute pathname that is also used as the instanceName of the activated
        // page view process.
        // For example: We might decide is makes a lot a sense not to try to replace the active view on every hashchange event
        // forwarded along some delegate path to us from DOMLocationProcessor. Specifically, we will receive DOMLocationProcess
        // hashchange signal via app client kernel lifecycle hashroute action when _any_ portion of the hashroute string is modified.
        // And, because we support URL-encoded query parameter decoding from a UTF-8 hashroute string this means we need to treat
        // updates to query parameters differently than we would treat an update to the hashroute basename (which would select
        // a different view entirely as opposed to changing the query params/options values passed to ViewpathPageView process.
        // So...

        if (pageViewControllerMemory.activeHashroutePathname !== messageBody.hashroutePathname) {
          // Okay - this is an update request that specifies a hashroute pathname that's different than that last selected.
          // Activate the new incoming ViewpathPageView process.
          var _actResponse4 = request_.context.act({
            actorName: actorName,
            actorTaskDescription: "Attempting to activate a new page view cell process for view pathname \"".concat(messageBody.hashroutePathname, "\"."),
            actionRequest: {
              CellProcessor: {
                process: {
                  processCoordinates: {
                    apmID: "t2enVksXSqmytntLA5KVzA",
                    instanceName: messageBody.hashroutePathname
                  },
                  activate: {
                    processData: {
                      hashroutePathname: messageBody.hashroutePathname,
                      hashrouteQueryParse: messageBody.hashrouteQueryParse,
                      routerEventNumber: messageBody.routerEventNumber,
                      metadata: {
                        org: orgMetadata,
                        app: appMetadata,
                        hashroute: hashrouteMetadata
                      }
                    }
                  }
                }
              }
            },
            apmBindingPath: cachedPageViewControllerProcessQuery.apmBindingPath
          });

          if (_actResponse4.error) {
            errors.push(_actResponse4.error);
            break;
          } // New ViewpathPageView process created.


          var newPageViewProcess = _actResponse4.result.actionResult;
          console.log("New ViewpathPageView cell process activated=\"".concat(JSON.stringify(newPageViewProcess, undefined, 4), "\"")); // Deactivate the old outgoing ViewpathPageView process (if this is not the first update).

          if (pageViewControllerMemory.activePageViewCellProcess) {
            _actResponse4 = request_.context.act({
              actorName: actorName,
              actorTaskDescription: "Attempting to deactivate the previously active ViewpathPageView process.",
              actionRequest: {
                CellProcessor: {
                  process: {
                    deactivate: {},
                    processCoordinates: pageViewControllerMemory.activePageViewCellProcess.cellProcessID
                  }
                }
              }
            });

            if (_actResponse4.error) {
              errors.push(_actResponse4.error);
              break;
            }
          } // if we have previously activated a page view process


          ocdResponse = request_.context.ocdi.writeNamespace(cachedPageViewControllerProcessQuery.apmBindingPath, _objectSpread(_objectSpread({}, pageViewControllerMemory), {}, {
            activeHashroutePathname: messageBody.hashroutePathname,
            activePageViewCellProcess: newPageViewProcess
          }));

          if (ocdResponse.error) {
            errors.push(ocdResponse.error);
            break;
          }
        } // activate a new ViewpathPageView and deactivate the currently-active ViewpathPageView (always at difference cellplane coordinates).
        else {
            // update the active ViewpathPageView's query map values
            // Okay - this an update request that specifies a hashroute pathname that's the same as that last selected.
            // i.e. there's already an activated ViewpathPageView process. Per our hashroute string parsing conventions
            // we know that if the pathname did not change then the query changed.
            // So, tell the active ViewpathPageView process to update its query/option values per the new
            // values encoded in the hashroute string and passed along as hashrouteQueryParse map.
            var _actResponse5 = request_.context.act({
              actorName: actorName,
              actorTaskDescription: "Attempting to notify the active ViewpathPageView process of a change in current hashroute query parameter value(s).",
              actionRequest: {
                viewpath: {
                  ViewpathPageView: {
                    updateQuery: {
                      hashrouteQueryParse: messageBody.hashrouteQueryParse,
                      routerEventNumber: messageBody.routerEventNumber
                    }
                  }
                }
              },
              apmBindingPath: pageViewControllerMemory.activePageViewCellProcess.apmBindingPath
            });

            if (_actResponse5.error) {
              errors.push(_actResponse5.error);
              break;
            }
          } // else tell the currently active ViewpathPageView to udpate its query map values.


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