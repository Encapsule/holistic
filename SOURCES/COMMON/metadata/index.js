"use strict";

module.exports = {
  constraints: {
    org: require("./iospecs/app-metadata-org-spec"),
    app: require("./iospecs/app-metadata-app-spec"),
    page: require("./iospecs/app-metadata-page-spec"),
    hashroute: require("./iospecs/app-metadata-hashroute-spec")
  },
  values: {
    org: require("./app-metadata-org-values"),
    app: require("./app-metadata-app-values"),
    pages: require("./app-metadata-page-values"),
    // a map of "GET:/URI" -> page-format metadata descriptor object
    hashroutes: require("./app-metadata-hashroute-values") // a map of hashroute pathname strings "#dashboard/drill-down" -> hashroute-format metadata descriptor object

  }
};