// http-service-filter-request-spec.js

const httpRequestDescriptorSpec = require("./http-service-filter-request-descriptor-spec");

const httpServerIntegrationsDescriptorSpec = require("./http-server-integrations-descriptor-spec");


module.exports = {
    ____label: "Plugin Service Request",
    ____description: "Runtime service request descriptor object passed by HTTP server.",
    ____types: "jsObject",
    streams: {
        ____label: "HTTP Server Stream Context",
        ____description: "Context exposed by the hosting HTTP server to a plugin service filter.",
        ____types: "jsObject",
        request: {
            ____label: "HTTP Request Stream",
            ____description: "A reference to an http.IncomingMessage stream passed from the HTTP server.",
            ____accept: "jsObject"
        },
        response: {
            ____label: "HTTP Response Stream",
            ____description: "A reference to an http.ServerResponse stream passed from the HTTP server.",
            ____accept: "jsObject"
        }
    },
    options: {
        ____label: "Service Filter Registration Options",
        ____description: "Service filter-specific options data declared by the developer, and passed to the service by holism server.",
        ____opaque: true
    },
    request_descriptor: httpRequestDescriptorSpec,
    integrations: httpServerIntegrationsDescriptorSpec,
};
