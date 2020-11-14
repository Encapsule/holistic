// service-health-check.js

const httpServiceFilterFactory = require("@encapsule/holism").service;

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

                const agentMetadataResponse = request_.integrations.filters.get_server_agent_info.request();
                if (agentMetadataResponse.error) {
                    errors.push(agentMetadataResponse.error);
                    break;
                }

                const agentMetadata = agentMetadataResponse.result;

                const responderResponse = request_.response_filters.result.request({
                    streams: request_.streams,
                    integrations: request_.integrations,
                    request_descriptor: request_.request_descriptor,
                    response_descriptor: {
                        http: { code: 200, message: "Okay" },
                        content: { encoding: "utf8", type: "application/json" },
                        data: agentMetadata
                    }
                });
                if (responderResponse.error) {
                    errors.push(responderResponse.error);
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
