// sources/server/services/service-data-gateway.js

const httpServiceFilterFactory = require("./http-service-filter-factory");

var factoryResponse = httpServiceFilterFactory.request({
    id: "5GJ8LaKGShCXySL1OvA2Qw",
    name: "Data Gateway Service",
    description: "This service filter implements a generic message-based routing system for AJAX request.",

    constraints: {
        request: {
            content: { encoding: "utf8", type: "application/json" }, // request must be UTF8-encoded JSON content
            query_spec: { ____opaque: true }, // accept any or none URL-encoded query parmaters and pass them through the data gateway
            request_spec: { ____opaque: true }, // accept any or none valid JSON deserialization of the incoming HTTP request body
            options_spec: {
                ____types: "jsObject",
                ____defaultValue: {},
                router: {
                    ____label: "Data Gateway Router",
                    ____description: "An arccore.discriminator used to route incoming POST messages to an appropriate data gateway filter implementation for processing.",
                    ____accept: [ "jsNull", "jsObject" ],
                    ____defaultValue: null
                }
            }
        }, // request

        response: {
            content: { encoding: "utf8", type: "application/json" }, // response is always UTF8-encoded JSON content
            error_context_spec: { ____opaque: true }, // error specification is defined by individual data gateway filters - not the data gateway service
            result_spec: { ____opaque: true } // result specification is defined by individual data gateway filters - not the data gateway service
        } // response

    }, // constraints

    handlers: {
        request_handler: function(request_) {

            var response = { error: null, result: null };
            var errors = [];
            var inBreakScope = false;
            while (!inBreakScope) {
                inBreakScope = true;

                if (request_.options.router === null) {

                    let response = request_.response_filters.error.request({
                        streams: request_.streams,
                        integrations: request_.integrations,
                        request_descriptor: request_.request_descriptor,
                        error_descriptor: {
                            http: { code: 500 },
                            content: { encoding: "utf8", type: "application/json" },
                            data: {
                                error_message: "Developer configuration error processing data gateway request.",
                                error_context: {
                                    error:[
                                        "The application server data gateway service is incorrectly configured.",
                                        "You need to pass a reference to a pre-constructed data gateway router via registration options."
                                    ].join(" "),
                                    source_tag: "itObkMeLQaaTn9HAKh7aBg"

                                }
                            }
                        }
                    });
                    if (response.error) {
                        errors.push("Developer error detected. Unable to compensate.");
                        errors.push(response.error);
                    }
                    break;

                } // end if

                var routerResponse = request_.options.router.request(request_);

                console.log(JSON.stringify(routerResponse));

                if (routerResponse.error) {

                    let response = request_.response_filters.error.request({
                        streams: request_.streams,
                        integrations: request_.integrations,
                        request_descriptor: request_.request_descriptor,
                        error_descriptor: {
                            http: { code: 400 },
                            content: { encoding: "utf8", type: "application/json" },
                            data: {
                                error_message: "Error processing data gateway request.",
                                error_context: {
                                    error: routerResponse.error,
                                    gatewayMessage: request_.request_descriptor.data.body,
                                    source_tag: "NFibKPPVSfuXA9wnhSQN9w",

                                }
                            }
                        }
                    });
                    if (response.error) {
                        errors.push("The data gateway router is upset.");
                        errors.push(response.error);
                    }
                    break;
                }

                // We're done. It's the responsibility of the data gateway filter to complete successfully serviced requests.
                // We just mop up the errors _that may happen on the synchronous portion of the request initiation_.
                // If the data gateway filter itself performs async operations, then it has to communicate these errors
                // back to Encapsule/holism by calling the provided response filters.

                break;
            }
            if (errors.length) {
                response.error = errors.join(" ");
            }
            return response;
        } // request_handler
    } // handlers
}); // httpServiceFilterFactory.create

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
