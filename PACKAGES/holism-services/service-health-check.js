// service-health-check.js

const arccore = require("@encapsule/arccore");
const httpServiceFilterFactory = require("@encapsule/holism").service;

const arccoreMeta = require("@encapsule/arccore/package");

var factoryResponse = httpServiceFilterFactory.create({
    id: "6sHrn7n8QaSqb9Sv9gt4Ug",
    name: "Health check service filter",
    description: "Passes the value registration-time options object through to the HTML render subsystem.",
    constraints: {
        request: {
            content: { encoding: "utf8", type: "text/plain" },
            query_spec: {
                ____types: "jsObject",
                ____defaultValue: {},
                format: {
                    ____accept: "jsString",
                    ____defaultValue: "json",
                }
            },
            request_spec: { ____opaque: true },
        },
        response: {
            content: { encoding: "utf8", type: "text/html" },
            error_context_spec: { ____opaque: true },
            result_spec: { ____opaque: true }
        }
    },
    handlers: {
        request_handler: function(request_) {

            let response = { error: null, result: undefined };
            let errors = [];
            let inBreakScope = false;
            while (!inBreakScope) {
                inBreakScope = true;

                // Get the data we need from our @encapsule/holism server instance by accessing the not-so-well-understood integration filters registered on every derived app server instance.

                // TODO: Really this should be all that we need.
                const siteMetadataResponse = request_.integrations.filters.get_site_metadata.request({ appStateContext: request_.integrations.appStateContext });
                if (siteMetadataResponse.error) {
                    // Handle this error outside of the inBreakScope loop.
                    errors.push(siteMetadataResponse.error);
                    break;
                }

                // TODO: Really hate the current implementation of this agent crap. Refactor this and rename to get_app_server_metadata or something.
                const agentMetadataResponse = request_.integrations.filters.get_server_agent_info.request();
                if (agentMetadataResponse.error) {
                    // Handle this error outside of the inBreakScope loop.
                    errors.push(agentMetadataResponse.error);
                    break;
                }

                const serverContextResponse = request_.integrations.filters.get_server_context.request();
                if (serverContextResponse.error) {
                    // Handle this error outside of the inBreakScope loop.
                    errors.push(serverContextResponse.error);
                    break;
                }

                const siteMetadata = siteMetadataResponse.result; siteMetadata;

                // Keep this as it is. However, don't be too much of a schill.
                let appPlatformMetadata = arccore.util.clone(siteMetadata.build.platform);
                delete appPlatformMetadata.copyright;
                delete appPlatformMetadata.contributors;

                const agentMetadata = agentMetadataResponse.result; agentMetadata;
                const serverContext = serverContextResponse.result; serverContext;

                // Create our response descriptor object sticking together information from the two integration filter calls above.
                const healthCheckData = {
                    online: true,
                    copyright: `Copyright (C) ${siteMetadata.build.app.buildYear} ${siteMetadata.build.app.author}`,
                    service: {
                        app: siteMetadata.build.app,
                        platform: {
                            app: appPlatformMetadata,
                            data: {
                                name: arccoreMeta.name,
                                description: arccoreMeta.description,
                                version: arccoreMeta.version,
                                codename: arccoreMeta.codename,
                                author: arccoreMeta.author,
                                license: arccoreMeta.license,
                                buildID: arccoreMeta.buildID,
                                buildSource: arccoreMeta.ARC_master,
                                buildTime: arccoreMeta.buildTime,
                                buildTimeISO: (new Date(arccoreMeta.buildTime * 1000)).toISOString()
                            },
                            view: {
                                name: agentMetadata.platform.document.name,
                                version: agentMetadata.platform.document.version
                            }
                        },
                        runtime: {
                            instance: {
                                id: serverContext.context.instanceID,
                                // TODO: Look into what's going on in @encapsule/holism response/error stats. These would useful for testing and don't seem to be working in v0.0.21 eureka builds.
                                stats: serverContext.context.stats
                            },
                            host: agentMetadata.platform.runtime
                        }
                    }
                    /*
                    sources: {
                        siteMetadata: siteMetadata,
                        agentMetadata: agentMetadata,
                        serverContext: serverContext
                    }
                    */
                };

                const resultResponse = request_.response_filters.result.request({
                    streams: request_.streams,
                    integrations: request_.integrations,
                    request_descriptor: request_.request_descriptor,
                    response_descriptor: {
                        http: { code: 200, message: "Ok" },
                        content: { encoding: "utf8", type: "application/json" },
                        data: healthCheckData
                    }
                });
                if (resultResponse.error) {
                    errors.push(resultResponse.error);
                    break;
                }

                break;

            } // end while !inBreakScope

            if (errors.length) {
                response.error = errors.join(" ");
                let errorResponse = request_.response_filters.error.request({
                    streams: request_.streams,
                    integrations: request_.integrations,
                    request_descriptor: request_.request_descriptor,
                    error_descriptor: {
                        http: { code: 500 },
                        content: { encoding: "utf8", type: "application/json" },
                        data: {
                            online: false,
                            error: response.error
                        }
                    }
                });
                if (errorResponse.error) {
                    errors.push("And... while attempting to report the original failure:");
                    errors.push(errorResponse.error);
                    response.error = errors.join(" ");
                }
            }
            return response;
        }
    }
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
