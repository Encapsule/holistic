// http-server-integrations-descritpr-spec.js

// Extends the developer-specified integration filter set with
// additional integration filters allocated by the HTTP server filter
// and service filter factories.

const arccore = require("@encapsule/arccore");

const httpIntegrationFiltersFactoryResultSpec = require("./http-integration-filters-factory-result-spec");

var spec = arccore.util.clone(httpIntegrationFiltersFactoryResultSpec);
spec.filters.get_server_agent_info = {
    ____label: "Server Agent Information Access Filter",
    ____description: "Retrieves data pertinent to the application server and infrastructure software packages.",
    ____types: "jsObject",
    filterDescriptor: { ____accept: "jsObject" },
    request: { ____accept: "jsFunction" }
};

spec.filters.get_server_context = {
    ____label: "Server Intropsection Context Access Filter",
    ____description: "Retrieves a reference to the HTTP server filter's private runtime context. Used for advanced server introspection.",
    ____types: "jsObject",
    filterDescriptor: { ____accept: "jsObject" },
    request: { ____accept: "jsFunction" }
};

module.exports = spec;

