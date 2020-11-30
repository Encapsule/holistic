"use strict";

// app-metadata-cellmodel-factory-input-spec.js
module.exports = {
  ____label: "App Metadata Declaration",
  ____types: "jsObject",
  ____defaultValue: {},
  inputFilterSpecs: {
    ____label: "App Metadata Input Filter Specs",
    ____description: "Optional filter specification extensions for each of holistic app platform's four predefined app metadata descriptor objects.",
    ____types: "jsObject",
    ____defaultValue: {},
    org: {
      ____label: "Org Metadata App-Specific Props Spec",
      ____description: "An optional input filter spec that defines app-specific properties to be added to the holistic app platform's org metadata descriptor object.",
      ____accept: "jsObject",
      ____defaultValue: {
        ____types: "jsObject"
      }
    },
    app: {
      ____label: "Org Metadata App-Specific Props Spec",
      ____description: "An optional input filter spec that defines app-specific properties to be added to the holistic app platform's org metadata descriptor object.",
      ____accept: "jsObject",
      ____defaultValue: {
        ____types: "jsObject"
      }
    },
    page: {
      ____label: "Org Metadata App-Specific Props Spec",
      ____description: "An optional input filter spec that defines app-specific properties to be added to the holistic app platform's org metadata descriptor object.",
      ____accept: "jsObject",
      ____defaultValue: {
        ____types: "jsObject"
      }
    },
    hashroute: {
      ____label: "Org Metadata App-Specific Props Spec",
      ____description: "An optional input filter spec that defines app-specific properties to be added to the holistic app platform's hashroute metadata descriptor object.",
      ____accept: "jsObject",
      ____defaultValue: {
        ____types: "jsObject"
      }
    }
  },
  inputValues: {
    ____label: "App Metadata Buildtime Values",
    ____description: "Values provided to the holistic app common runtime by the derived app build process to be used as static app metadata throughout the derived app server and app client service processes.",
    ____types: "jsObject",
    ____defaultValue: {},
    org: {
      ____label: "Org Metadata Descriptor Object",
      ____description: "Information about the organziation, entity, or company that owns this app or service.",
      ____accept: "jsObject"
    },
    app: {
      ____label: "App Metadata Descriptor Object",
      ____description: "Information about this specific app or service.",
      ____accept: "jsObject"
    },
    pages: {
      ____label: "Page Metadata Descriptor Object Map",
      ____description: "A map (dictionary) of page URI string to page metadata descriptor objects that detail the HTML5 page view display supported by this app.",
      ____types: "jsObject",
      ____asMap: true,
      ____defaultValue: {},
      pageURI: {
        ____label: "Page Metadata Descriptor Object",
        ____description: "Information about a specific HTML5 page view display supported by this app.",
        ____accept: "jsObject"
      }
    },
    hashroutes: {
      ____label: "Hashroute Metadata Descriptor Object Map",
      ____description: "A map (dictionary) of hashroute URI to hashroute metadata descriptor objects that detail the synthesized client-side-only HTML5 page view displays supported by this app.",
      ____types: "jsObject",
      ____asMap: true,
      ____defaultValue: {},
      hashrouteURI: {
        ____label: "Hashroute Metadata Descriptor Object",
        ____description: "Information about a specific synthesized client-side-only HTML5 page view display supported by this app.",
        ____accept: "jsObject"
      }
    }
  }
};