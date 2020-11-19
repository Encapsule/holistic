"use strict";

// AbstractProcessModel-app-metadata.js
var holarchy = require("@encapsule/holarchy");

var apm = new holarchy.AbstractProcessModel({
  id: "srjZAO8JQ2StYj07u_rgGg",
  name: "Holistic App Common Kernel: App Metadata Process",
  description: "Encapsulates query/read access to developer-specified holistic application static metadata digraph data for active cells in either server or client cellplanes.",
  ocdDataSpec: {
    ____label: "Holistic App Metadata",
    ____types: "jsObject",
    ____defaultValue: {},
    // toJSON: { ____accept: "jsFunction", ____defaultValue: function() { return { noSerialize: true }; } },
    construction: {
      ____types: ["jsUndefined", "jsObject"],
      constraints: {
        ____types: "jsObject",
        org: {
          ____accept: "jsObject"
        },
        app: {
          ____accept: "jsObject"
        },
        page: {
          ____accept: "jsObject"
        },
        hashroute: {
          ____accept: "jsObject"
        }
      },
      values: {
        ____types: "jsObject",
        org: {
          ____accept: "jsObject"
        },
        app: {
          ____accept: "jsObject"
        },
        pages: {
          ____accept: "jsObject"
        },
        hashroutes: {
          ____accept: "jsObject"
        }
      }
    },
    appMetadataDigraph: {
      ____accept: ["jsUndefined", "jsObject"] // TODO

    }
  },
  steps: {
    uninitialized: {
      description: "Default cell process step.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "app-metadata-initialize"
      }]
    },
    "app-metadata-initialize": {
      description: "Intialize the holistic app metadata digraph containing the developer-defined metadata values filtered by the developer-defined constraints.",
      transitions: [{
        transitionIf: {
          always: true
        },
        nextStep: "app-metadata-active"
      }],
      actions: {
        exit: [{
          holistic: {
            app: {
              metadata: {
                _private: {
                  initialize: {}
                }
              }
            }
          }
        }]
      }
    },
    "app-metadata-active": {
      description: "App metadata process has initialized and is ready to service queries."
    }
  }
});

if (!apm.isValid()) {
  throw new Error(apm.toJSON());
}

module.exports = apm;