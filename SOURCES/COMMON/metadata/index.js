"use strict";

// SOURCES/COMMON/vp5/kernel/metadata/index.js

/*
  This module exports Viewpath5-specific constraints and values
  for "holistic app metadata" - a convention for labeling four
  categories of static information shared by a derived app server
  and app client process.

  As of @encapsule/holistic v0.0.47-alexadrite:

  Derived app client process:

  Returns the derived app's static app metadata constraints and values to the
  holistic app kernel in its response to lifecycle action query.

  Derived app server process:

  Is not currently symetric w/the app client and currently duplicates in the vp5
  application some logic that has migrated into @encapsule/holistic-app-common-cm RTL.

*/
module.exports = {
  constraints: {
    // i.e. filter specs used to constrain the format of Viewpath5's app metadata values.
    org: require("./iospecs/app-metadata-org-spec"),
    app: require("./iospecs/app-metadata-app-spec"),
    page: require("./iospecs/app-metadata-page-spec"),
    hashroute: require("./iospecs/app-metadata-hashroute-spec")
  },
  values: {
    // i.e. our actual app metadata
    org: require("./app-metadata-org-values"),
    app: require("./app-metadata-app-values"),
    pages: require("./app-metadata-page-values"),
    // a map of "GET:/URI" -> page-format metadata descriptor object
    hashroutes: require("./app-metadata-hashroute-values") // a map of hashroute pathname strings "#dashboard/drill-down" -> hashroute-format metadata descriptor object

  }
};