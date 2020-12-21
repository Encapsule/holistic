"use strict";

// SOURCES/COMMON/vp5/models/view/ViewpathPageView/AbstractProcessModel-viewpath-page-view.js
var holarchy = require("@encapsule/holarchy");

var apm = new holarchy.AbstractProcessModel({
  id: "t2enVksXSqmytntLA5KVzA",
  name: "Viewpath Page View Process",
  description: "Encapsules the details of layout and subsequent update of dynamic content in the app client display process via d2r2. And, encapsulates high-level routing of calls from the display process back to this view process (e.g. in response to user action).",
  ocdDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    routerEventNumber: {
      ____label: "DOMLocationProcessor Router Event Number",
      ____description: "The last routerEventDescriptor.routerEventNumber received via our update action. If this specific ViewpathPageView cell activation cares about hashrouteQueryParse map values, then the map values should be evaluated and lastProcessedEventNumber set to routerEventNumber when routerEventNumber !== lastProcessedEventNumber.",
      ____accept: "jsNumber"
    },
    lastProcessedEventNumber: {
      ____label: "Last Processed Event Number",
      ____description: "A specific activation of ViewpathPageView cell may wish to react (as in somehow customize its unique behaviors) based on URL-encoded query map values parsed from the browser's current hashroute string.",
      ____accept: "jsNumber",
      // The app client kernel process signals that it has completed its boot sequence
      // and is handing off control to the derived app client process by calling the
      // derived app client's start lifecycle action.
      //
      // The kernel then calls the derived app client's hashroute lifecycle action
      // always sending routerEventNumber === 0 to indicate the initial starting hashroute
      //
      ____defaultValue: -1 // So, this means we will affect a re-evaluation of our activation's data upon activation. And, thereafter if the two counts are not identical.

    },
    hashroutePathname: {
      ____label: "Hashroute Pathname",
      ____description: "The hashroute pathname that this ViewpathPageView cell corresponds to.",
      ____accept: "jsString"
    },
    hashrouteQueryParse: {
      ____label: "Hashroute Query Parse Map",
      ____types: "jsObject",
      ____asMap: true,
      queryPropName: {
        ____label: "Unparsed Query Prop Value",
        ____accept: ["jsNull", "jsString"]
      }
    },
    metadata: {
      ____label: "App Metadata Values",
      ____description: "A copy of the app metadata values. Not sure this is right; efficient or 100% necessary. It is expediant for now...",
      ____types: "jsObject",
      org: {
        ____accept: "jsObject" // TODO: During grand unification we need to synthesize this correctly.

      },
      app: {
        ____accept: "jsObject" // TODO: As above

      },
      hashroute: {
        ____accept: "jsObject" // TODO: As above

      }
    }
  },
  // ocdDataSpec
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "viewpath-page-view-initialize"
      }]
    },
    "viewpath-page-view-initialize": {
      description: "Initializing a newly-activated ViewpathPageView cell.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "viewpath-page-view-perform-initial-display-update"
      }],
      actions: {
        exit: [{
          holistic: {
            service: {
              view: {
                page: {
                  _private: {
                    stepWorker: {
                      action: "process-hashroute-query-map-values"
                    }
                  }
                }
              }
            }
          }
        }]
      }
    },
    "viewpath-page-view-perform-initial-display-update": {
      description: "Performing the initial post page view cell activation display update via the app client display adapter.",
      actions: {
        exit: [{
          holistic: {
            service: {
              view: {
                page: {
                  _private: {
                    stepWorker: {
                      action: "perform-initial-display-update"
                    }
                  }
                }
              }
            }
          }
        }]
      },
      transitions: [{
        transitionIf: {
          always: true
          /* for now - WIP */

        },
        nextStep: "viewpath-page-view-wait-for-inputs"
      }]
    },
    "viewpath-page-view-wait-for-inputs": {
      description: "Waiting for inputs to update.",
      transitions: [{
        transitionIf: {
          not: {
            holarchy: {
              cm: {
                operators: {
                  ocd: {
                    compare: {
                      values: {
                        a: {
                          path: "#.routerEventNumber"
                        },
                        b: {
                          path: "#.lastProcessedEventNumber"
                        },
                        operator: "==="
                      }
                    }
                  }
                }
              }
            }
          }
        },
        nextStep: "viewpath-page-view-process-query-options-update"
      }]
    },
    "viewpath-page-view-process-query-options-update": {
      description: "Processing an update to this page view's query options value(s).",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "viewpath-page-view-wait-for-inputs"
      }],
      actions: {
        exit: [{
          holistic: {
            service: {
              view: {
                page: {
                  _private: {
                    stepWorker: {
                      action: "process-hashroute-query-map-values"
                    }
                  }
                }
              }
            }
          }
        }, {
          holistic: {
            service: {
              view: {
                page: {
                  _private: {
                    stepWorker: {
                      action: "perform-display-update"
                    }
                  }
                }
              }
            }
          }
        }]
      }
    } // THERE ARE MORE STEPS TO HANDLE OTHER PAGE VIEW INPUTS THAT CHANGE! WIP....

  } // steps

});

if (!apm.isValid()) {
  throw new Error(apm.toJSON());
}

module.exports = apm;