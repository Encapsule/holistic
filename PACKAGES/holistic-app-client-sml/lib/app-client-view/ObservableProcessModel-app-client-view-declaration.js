"use strict";

// ObservableProcessModel-app-client-view-declaration.js
module.exports = {
  id: "Hsu-43zBRgqHItCPWPiBng",
  name: "Holistic Client App View Processor",
  description: "Encapsulates the high-level details of selecting, creating, and updating d2r2/React Client Display Adaptor update signals.",
  opmDataSpec: {
    ____types: "jsObject",
    ____defaultValue: {},
    "Hsu-43zBRgqHItCPWPiBng": {
      ____types: "jsObject",
      ____defaultValue: {},
      inputs: {
        ____types: "jsObject",
        ____defaultValue: {}
      },
      _private: {
        ____types: "jsObject",
        ____defaultValue: {}
      },
      outputs: {
        ____types: "jsObject",
        ____defaultValue: {}
      }
    }
  },
  steps: {
    uninitialized: {
      description: "Default starting process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "initialize"
      }]
    },
    initialize: {
      description: "Performing initialization actions.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "wait_invariants"
      }]
    },
    wait_invariants: {
      description: "Waiting for invariant inputs to be satisfied.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "wait_app_config"
      }]
    },
    wait_app_config: {
      description: "Waiting for the client application runtime to be configured.",
      transitions: [{
        transitionIf: {
          holarchy: {
            sml: {
              operators: {
                opmi: {
                  path: "~.vp5.client",
                  step: "boot1_query_derived_app_config"
                }
              }
            }
          }
        },
        nextStep: "wait_server_route"
      }]
    },
    wait_server_route: {
      description: "Waiting for the DOM Location Processor to signal the client application's server-specified route (location.href)."
    },
    wait_app_resume: {
      description: "Waiting for the App Client Runtime to resume the client application runtime.",
      transitions: [{
        transitionIf: {
          holarchy: {
            sml: {
              operators: {
                opmi: {
                  path: "~.vp5.client",
                  step: "boot1_query_derived_app_config"
                }
              }
            }
          }
        },
        nextStep: "wait_server_route"
      }]
    },
    rehydrate: {
      description: "Use data from the server to rehydate the server-rendered d2r2/React view."
    },
    ready: {
      description: "View is interactive and up-to-date."
    },
    update: {
      description: "Update the client application's view model to incorporate changes in underlying data and model state."
    },
    render: {
      description: "Send the updated view to the d2r2/React Display Adaptor."
    }
  }
};