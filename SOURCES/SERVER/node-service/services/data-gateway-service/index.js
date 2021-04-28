"use strict";

var holism = require("@encapsule/holism"); // Aggregate a set of @encapsule/holism service plug-ins into a single DMR (discriminated message routing)
// plug-in for the @encapsule/holism data gateway service. In viewpath5, this manifests as POST:/data
// that accepts JSON-encoded request documents from authenticated user agents. And, that returns JSON-encoded
// response documents to those user agents (typically our HTML5 client app running in a user's browser tab).


var factoryResponse = holism.filters.factories.serviceRouter.request({
  serviceFilters: [require("./read-org-resource-definitions-gateway-service"), require("./read-org-resource-reservations-gateway-service"), require("./read-org-projects-report-gateway-service"), require("./read-org-project-definitions-gateway-service"), require("./read-org-profile-definition-gateway-service"), require("./read-org-summary-report-gateway-service"), require("./write-org-data-updates-gateway-service")]
});

if (factoryResponse.error) {
  throw new Error(factoryResponse.error);
}

var router = factoryResponse.result;
module.exports = {
  // JSON POST:/data
  authentication: {
    required: true
  },
  filter: holism.service.library.dataGateway,
  request_bindings: {
    method: "POST",
    uris: ["/data"]
  },
  response_properties: {
    contentEncoding: "utf8",
    contentType: "application/json"
  },
  options: {
    router: router
  }
};