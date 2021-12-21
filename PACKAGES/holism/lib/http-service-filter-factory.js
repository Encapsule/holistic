// http-service-filter-factory.js

const http = require("http");
const arccore = require("@encapsule/arccore");
const serializeResponseFilter = require("./http-response-serialize-filter");
const errorResponseFilter = require("./http-response-error-filter");
const httpServiceFilterFactoryRequestSpec = require("./iospecs/http-service-filter-factory-request-spec");
const httpServiceFilterRequestSpec = require("./iospecs/http-service-filter-request-spec");
const httpResponseSerializeRequestSpec = require("./iospecs/http-response-serialize-request-spec");
const httpResponseErrorRequestSpec = require("./iospecs/http-response-error-request-spec");

var factoryResponse = arccore.filter.create({
    operationID: "UPcDuywgSZe67-ZdFkXxog",
    operationName: "HTTP Server Service Filter Factory",
    operationDescription: "Creates a new HTTP server plugin filter object.",

    // The input filter specification declares the format of the developer-supplied request
    // object passed to this filter in order to obtain a 'service filter' object.
    inputFilterSpec: httpServiceFilterFactoryRequestSpec,
    outputFilterSpec: {
        ____label: "Service Filter Object",
        ____description: "A service filter object manufactured by the service filter factory.",
        ____accept: "jsObject"
    },

    bodyFunction: function(request_) {
        const serviceFactoryRequest = request_;
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            const serviceFilterID = serviceFactoryRequest.id;
            const requestProcessorFilterID = arccore.identifier.irut.fromReference("s39zW8zuRfS96k2nK4D2ew" + serviceFilterID).result;
            const errorResponseFilterID = arccore.identifier.irut.fromReference("bLcjeD0jRUWx9sDwMdCj4g" + serviceFilterID).result;
            const resultResponseFilterID = arccore.identifier.irut.fromReference("DX7Gv5AAT8Gglni-EHKmkw" + serviceFilterID).result;

            var innerFactoryResponse;

            // ----------------------------------------------------------------------
            // Instantiate the inner error response filter.
            // ----------------------------------------------------------------------
            var serviceErrorResponseRequestSpec = arccore.util.clone(httpResponseErrorRequestSpec);
            serviceErrorResponseRequestSpec.request_descriptor.data.query = serviceFactoryRequest.constraints.request.query_spec;
            serviceErrorResponseRequestSpec.request_descriptor.data.body = serviceFactoryRequest.constraints.request.request_spec;
            serviceErrorResponseRequestSpec.error_descriptor.data.error_context = serviceFactoryRequest.constraints.response.error_context_spec;
            innerFactoryResponse = arccore.filter.create({
                operationID: errorResponseFilterID,
                operationName: serviceFactoryRequest.name + "::Error Response Processor",
                operationDescription: "Validates the service-specific format of an error response message and delegates to the global error responder.",
                inputFilterSpec: serviceErrorResponseRequestSpec,
                bodyFunction: function(serviceErrorResponseRequest_) {
                    console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
                    if (!serviceErrorResponseRequest_.error_descriptor.http.message) {
                        serviceErrorResponseRequest_.error_descriptor.http.message = http.STATUS_CODES[serviceErrorResponseRequest_.error_descriptor.http.code];
                    }
                    var response = errorResponseFilter.request(serviceErrorResponseRequest_);
                    return response;
                }
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to construct inner error response filter:");
                break;
            }
            var innerErrorResponseFilter = innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate the inner result response filter.
            // ----------------------------------------------------------------------
            var serviceResultResponseRequestSpec = arccore.util.clone(httpResponseSerializeRequestSpec);
            serviceResultResponseRequestSpec.response_descriptor.data = serviceFactoryRequest.constraints.response.result_spec;
            innerFactoryResponse = arccore.filter.create({
                operationID: resultResponseFilterID,
                operationName: serviceFactoryRequest.name + "::Result Response Processor",
                operationDescription: serviceFactoryRequest.name + " : Result Response Processor",
                inputFilterSpec: serviceResultResponseRequestSpec,
                bodyFunction: function(serviceResultResponseRequest_) {
                    console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
                    if (!serviceResultResponseRequest_.response_descriptor.http.message) {
                        serviceResultResponseRequest_.response_descriptor.http.message = http.STATUS_CODES[serviceResultResponseRequest_.response_descriptor.http.code];
                    }
                    var response = serializeResponseFilter.request(serviceResultResponseRequest_);
                    return response;
                }
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to construct inner result response filter:");
                break;
            }
            var innerResultResponseFilter = innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate the inner request processor filter.
            // ----------------------------------------------------------------------
            var innerRequestProcessorInputSpec = arccore.util.clone(httpServiceFilterRequestSpec);
            // Replace the base request format constraints with service-specific constraints.
            innerRequestProcessorInputSpec.request_descriptor.data.query = serviceFactoryRequest.constraints.request.query_spec;
            innerRequestProcessorInputSpec.request_descriptor.data.body = serviceFactoryRequest.constraints.request.request_spec;
            innerRequestProcessorInputSpec.options = serviceFactoryRequest.constraints.request.options_spec;
            innerRequestProcessorInputSpec.response_filters = {
                ____label: "Response Filters",
                ____description: "References to error and result responder filters.",
                ____types: "jsObject",
                error: {
                    ____label: "Error Response Filter",
                    ____accept: "jsObject"
                },
                result: {
                    ____label: "Result Response Filter",
                    ____accept: "jsObject"
                }
            };
            innerFactoryResponse = arccore.filter.create({
                operationID: requestProcessorFilterID,
                operationName: serviceFactoryRequest.name + "::Request Processor",
                operationDescription: "Validates and normalizes incoming request message, caller-specified request handler, " +
                    "and routes the result to appropriate response handler.",
                inputFilterSpec: innerRequestProcessorInputSpec,
                outputFilterSpec: {
                    ____opaque: true
                },
                bodyFunction: function(serviceRequest_) {
                    console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
                    return serviceFactoryRequest.handlers.request_handler(serviceRequest_);
                }
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to construct inner request filter:");
                errors.push("Check to ensure that your service's input request and query format constraints are specified correctly.");
                break;
            }
            var innerRequestFilter = innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate the main service filter.
            // ----------------------------------------------------------------------
            innerFactoryResponse = arccore.filter.create({
                operationID: serviceFilterID,
                operationName: serviceFactoryRequest.name,
                operationDescription: serviceFactoryRequest.description,
                // This input filter specification defines the format of data passed to
                // this service filter instance by a hosting HTTP server instance.
                inputFilterSpec:  httpServiceFilterRequestSpec,
                outputFilterSpec: {
                    ____opaque: true
                },
                bodyFunction: function(request_) {
                    console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
                    var response = { error: null, result: null };
                    var errors = [];
                    var inBreakScope = false;

                    while (!inBreakScope) {
                        inBreakScope = true;

                        // Override the HTTP server's response filters which are generic
                        // with service-specific response filters that verify service-specific
                        // error and result data signatures. And, that ultimately delegate back
                        // to the HTTP server's base handlers.
                        request_.response_filters = {
                            error: innerErrorResponseFilter,
                            result: innerResultResponseFilter
                        };

                        // A service filter's inner request filter accepts a reference to an
                        // in-memory data structure deserialized from a UTF8 string. The functions
                        // in the following dictionary are used to deserialize specific known
                        // combination of content encoding and type.
                        const bodyParseFunctionTable = {
                            "utf8::application/json": function() {
                                request_.request_descriptor.data.body =
                                    (request_.request_descriptor.data.body !== "")?JSON.parse(request_.request_descriptor.data.body):undefined;
                            },
                            "utf8::text/plain": function() {
                                // NOOP
                                return;
                            }
                        };

                        var contentEncodingTypeKey =
                            serviceFactoryRequest.constraints.request.content.encoding +
                            "::" +
                            serviceFactoryRequest.constraints.request.content.type;

                        var bodyParseFunction = bodyParseFunctionTable[contentEncodingTypeKey];
                        if (!bodyParseFunction) {
                            errors.unshift(`Unable to to deserialize request body content. Unrecognized content encoding/type '${contentEncodingTypeKey}'.`);
                            break;
                        }

                        // This is a little hack to make it possible to call a service from within a service.
                        if (!request_.request_descriptor.data.bodyParsed) {
                            bodyParseFunction();
                            request_.request_descriptor.data.bodyParsed = true;
                        }

                        // Delegate further processing to the inner request processor filter.
                        var requestProcessorResponse = innerRequestFilter.request(request_);
                        if (requestProcessorResponse.error) {
                            errors.unshift(requestProcessorResponse.error);
                            break;
                        }
                        break;
                    }
                    if (errors.length) {
                        response.error = errors.join(" ");
                    }
                    return response;
                } // bodyFunction
            }); // arccore.filter.create
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to construct the main service filter:");
                break;
            }

            var serviceFilter = innerFactoryResponse.result;
            serviceFilter.implementation = {
                innerRequestFilter: innerRequestFilter,
                innerErrorResponseFilter: innerErrorResponseFilter,
                innerResultResponseFilter: innerResultResponseFilter,
            };
            response.result = serviceFilter;
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    } // factory bodyFunction
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
