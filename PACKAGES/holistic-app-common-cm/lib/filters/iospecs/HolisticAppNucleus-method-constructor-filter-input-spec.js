"use strict";

// HolisticAppNucleus-method-constructor-filter-input-spec.js
module.exports = {
  ____label: "HolisticAppNucleus::constructor Request Object",
  ____types: "jsObject",
  ____defaultValue: {},
  appBuildMetadata: {
    ____label: "Holistic App Build Metadata",
    ____description: "A reference to the app-build.json manifest created by the app Makefile.",
    ____accept: "jsObject",
    // TODO: schematize this slippery sucker once and for all and be done with it.
    ____defaultValue: {} // TODO: remove this escape hatch - this is required a value

  },
  appMetadata: {
    ____label: "Application Metadata",
    ____description: "Holistic app platform defines four extensible application metadata categories. App-specific type definition extension + all of your static build-time app metadata values are passed in here.",
    ____types: "jsObject",
    ____defaultValue: {},
    specs: {
      ____label: "App Metadata Extension Props Specs",
      ____description: "Optional filter specifications that add properties to holistic platform-defined base objects defined for each of the four metadata categories.",
      ____types: "jsObject",
      ____defaultValue: {},
      org: {
        ____label: "Org Metadata Extension Props Spec",
        ____description: "An optional filter spec that defines top-level properties to be added to organization metadata base spec to ensure platform + app-specific org metadata property values are available consistently throughout the app runtime.",
        ____accept: "jsObject",
        // This is an arccore.filter specification
        ____defaultValue: {} // no app-specific extension properties

      },
      app: {
        ____label: "App Metadata Extension Props Spec",
        ____description: "An optional filter spec that defines top-level properties to be added to app metadata base spec to ensure platform + app-specific app metadata property values are available consistently throughout the app runtime.",
        ____accept: "jsObject",
        // This is an arccore.filter specification
        ____defaultValue: {} // no app-specific extension properties

      },
      page: {
        ____label: "Page Metadata Extension Props Spec",
        ____description: "An optional filter spec that defines top-level properties to be added to page metadata base sepc to ensure platform + app-specific page metadata property values are available consistently throughout the app runtime.",
        ____types: "jsObject",
        ____defaultValue: {}
      },
      hashroute: {
        ____label: "Hashroute Metadata Extension Props Spec",
        ____description: "An optional filter spec that defined top-level properties to be added to hashroute metadata base spec to ensure platform + app-specific hashroute metadata property values are available consistently through the app runtime.",
        ____types: "jsObject",
        ____defaultValue: {}
      }
    },
    // ~.apppMetadata.filterSpecs
    values: {
      ____label: "App Metadata Data Values",
      ____description: "App metadata runtime property values by holistic platform-defined metadata category.",
      ____accept: "jsObject",
      // TODO
      ____defaultValue: {} // WIP.....

    }
  }
};