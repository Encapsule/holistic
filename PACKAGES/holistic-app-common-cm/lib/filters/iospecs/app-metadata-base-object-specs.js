"use strict";

// app-metadata-base-object-specs.js
module.exports = {
  base: {
    // platform base definitions for app-extensible static metadata types.
    input: {
      org: {
        ____label: "Organization Metadata Input",
        ____description: "Information about the group/organization/company that produced this derived app service.",
        ____types: "jsObject"
      },
      app: {
        ____label: "App Metadata Input",
        ____description: "Information about this specific app service.",
        ____types: "jsObject"
      },
      page: {
        ____label: "App Page Metadata Input",
        ____description: "Information about a specific HTML5 document (aka derived app client) synthesized by the derived app server in response to a request to https://xyzzy.com/<URI>.",
        ____types: "jsObject"
      },
      hashroute: {
        ____label: "App Hashroute Metadata Input",
        ____description: "Information about a specific dynamically-generated browser page view that may be displayed to the user by the derived app client service under various programmatically-determined conditions.",
        ____types: "jsObject"
      }
    },
    output: {
      org: {
        ____label: "Organization Metadata Value",
        ____description: "Information about the group/organization/company that produced this derived app service.",
        ____types: "jsObject"
      },
      app: {
        ____label: "App Metadata Value",
        ____description: "Information about this specific app service.",
        ____types: "jsObject"
      },
      page: {
        ____label: "App Page Metadata Value",
        ____description: "Information about a specific HTML5 document (aka derived app client) synthesized by the derived app server in response to a request to https://xyzzy.com/<URI>.",
        ____types: "jsObject"
      },
      hashroute: {
        ____label: "App Hashroute Metadata Value",
        ____description: "Information about a specific dynamically-generated browser page view that may be displayed to the user by the derived app client service under various programmatically-determined conditions.",
        ____types: "jsObject"
      }
    }
  }
};