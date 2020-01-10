// http-server-filter-factory-request-spec.js

const contentTypeSpec = require("./content-type-spec");
const contentEncodingSpec = require("./content-encoding-spec");

const httpServerFilterResourceAuthentication = require("./http-server-filter-resource-authentication");
const httpIntegrationFiltersFactoryResultSpec = require("./http-integration-filters-factory-result-spec");

module.exports = {
    ____label: "Holism Application Server Factory Request",
    ____description: "Information used to generate an @encapsule/holism application server (HTTP 1.1) instance.",
    ____types: "jsObject",
    name: {
        ____label: "HTTP Server Name",
        ____description: "A short descriptive name of the HTTP server.",
        ____accept: "jsString"
    },
    description: {
        ____label: "HTTP Server Description",
        ____description: "A longer description of the purpose and functionality of this HTTP server.",
        ____accept: "jsString"
    },
    version: {
        ____label: "HTTP Server Version",
        ____description: "A Nodejs semantic version string. Typically is value is copied from the application's package.json.",
        ____accept: "jsString"
    },
    build: {
        ____label: "HTTP Server Build Info",
        ____description: "Metadata used to diagnose deployments of this application.",
        ____types: "jsObject",
        ____defaultValue: {},
        timestamp: {
            ____label: "HTTP Server Built Time",
            ____description: "The ISO-format time that this application server was built.",
            ____accept: "jsString"
        },
        commit: {
            ____label: "HTTP Server Sources Commit",
            ____description: "The git commit hash containing the source code used to build this application server.",
            ____accept: "jsString"
        }
    },
    integrations: httpIntegrationFiltersFactoryResultSpec,
    config: {
        ____label: "Resource Declarations",
        ____description: "A declaration of resources made available to clients of this HTTP server.",
        ____types: "jsObject",
        options: {
            ____label: "Configuration Options",
            ____description: "Optional configuration data.",
            ____types: "jsObject",
            ____defaultValue: {},
            max_input_characters: {
                ____label: "Maximum Allowed Input Characters",
                ____description: "The maximum number of characters the server is allowed to read from a ServerRequest stream.",
                ____accept: "jsNumber",
                ____defaultValue: 0x40000 // 262,144-characters allowed for per-request client data bufferred by on("data", fn) by default.
            },
            request_data_abuse_factor: {
                ____label: "Reqeust Data Abuse Factor",
                ____description: "Buffer incoming data up to max characters. Thereafter, drop data until the client finishes (and respond with HTTP 413). Or, until total request data received exceeds max chars * abuse factor in which case we close the request socket and effectively hangup on the client w/out a response.",
                ____accept: "jsNumber",
                ____inRangeInclusive: { begin: 0.0, end: 1.0 }, // i.e. accept at most 2x the max before hanging up
                ____defaultValue: 0.5 // by default accept 1.5 max before hanging up.
            }
        },
        files: {
            ____label: "Memory-Resident File Resources",
            ____description: "A collection memory-cached resources loaded from local filesystem.",
            ____types: "jsObject",
            ____asMap: true,
            ____defaultValue: {},
            local_filesystem_path: {
                ____label: "Static File Resource Descriptor",
                ____description: "Describes the attributes of a specific local file resource to expose via HTTP GET method.",
                ____types: "jsObject",
                authentication: httpServerFilterResourceAuthentication,
                request_bindings: {
                    ____label: "Request Bindings",
                    ____description: "Specifies how the plug-in service filter will be exposed by the HTTP server.",
                    ____types: "jsObject",
                    method: {
                        ____label: "HTTP Request Method",
                        ____description: "The specific HTTP request method to make requests with.",
                        ____accept: "jsString",
                        ____inValueSet: [ "GET" ], // GET only because mem-cached resources are immutable
                        ____defaultValue: "GET"
                    },
                    uris: {
                        ____label: "Server URI's",
                        ____description: "A list of server URI's (the pathname portion of the URL) to respond to.",
                        ____types: "jsArray",
                        uri: {
                            ____label: "Resource URI",
                            ____description: "A specific server URI to register for this resource.",
                            ____accept: "jsString"
                        }
                    } // uris
                },
                response_properties: {
                    ____label: "Response Properties",
                    ____description: "Flag values indicating desired response encoding.",
                    ____types: "jsObject",
                    contentEncoding: contentEncodingSpec,
                    contentType: contentTypeSpec
                }
            } // local_filesystem_path
        }, // files
        services: {
            ____label: "Programmatic Services",
            ____description: "HTTP server service filter registrations map an HTTP method/resource pathname to a specific filter object.",
            ____types: "jsArray",
            ____defaultValue: [],
            service: {
                ____label: "Service Provider Filter",
                ____description: "Registers a specific Service Provider Filter object to respond to incoming HTTP requests.",
                ____types: "jsObject",
                filter: {
                    ____label: "Service Provider Filter Reference",
                    ____description: "A reference to a previously-constructed service provider filter object.",
                    ____types: "jsObject",
                    filterDescriptor: { ____accept: "jsObject" },
                    implementation: { ____accept: "jsObject" },
                    request: { ____accept: "jsFunction" }
                },
                options: {
                    ____label: "Filter Options",
                    ____description: "A service-filter-defined options object declared in the service registration " +
                        "and passed back to the service filter on every HTTP request delegated to it by the holism server instance.",
                    ____opaque: true
                },
                authentication: httpServerFilterResourceAuthentication,
                request_bindings: {
                    ____label: "Request Bindings",
                    ____description: "Specifies how the plug-in service filter will be exposed by the HTTP server.",
                    ____types: "jsObject",
                    method: {
                        ____label: "HTTP Request Method",
                        ____description: "The specific HTTP request method to make requests with.",
                        ____accept: "jsString",
                        ____inValueSet: [ "GET", "POST" ]
                    },
                    uris: {
                        ____label: "Server URI's",
                        ____description: "A list of server URI's (the pathname portion of the URL) to respond to.",
                        ____types: "jsArray",
                        uri: {
                            ____label: "Resource URI",
                            ____description: "A specific server URI to register for this resource.",
                            ____accept: "jsString"
                        }
                    } // uris
                }, // request_bindings
                response_properties: {
                    ____label: "Response Properties",
                    ____description: "Flag values indicating desired response encoding.",
                    ____types: "jsObject",
                    contentEncoding: contentEncodingSpec,
                    contentType: contentTypeSpec
                }
            } // filter_identifier
        } // services
    } // config
};
