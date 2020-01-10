// http-request-filter-factory.js

const arccore = require("@encapsule/arccore");
const filter = arccore.filter;
const identifier = arccore.identifier;

// Make a deep copy of the public, developer-facing inputFilterSpec
const inputFilterSpec = arccore.util.clone(require("./http-request-filter-factory-user-spec"));

// Add the client vs server-specific transport object to this filter's input spec.
inputFilterSpec["requestTransportFilter"] = {
    ____label: "HTTP Transport Filter",
    ____description: "A reference to a a HTTP Request Transport Filter object allocated by either the client or server-specific factory.",
    ____accept: "jsObject"
};

var filterFactoryResponse = filter.create({
    operationID: "tUksFcVLReWXPbci8NzAKQ",
    operationName: "HTTP Request Filter Factory",
    operationDescription: "Generates a filter object wrapped around an asynchronous HTTP request that strongly validates its input request, "+
        "and output response data using Encapsule Project filter specification declarations provided to the factory at construction time.",
    inputFilterSpec: inputFilterSpec,

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;

        var factoryRequest = request_;

        while (!inBreakScope) {
            inBreakScope = true;

            // makeName utility function used to construct the name of implementation filters constructed inline below.
            const makeName = function (filterType_) {
                return ("HTTP " + factoryRequest.method + " " + factoryRequest.url + " " + filterType_ + " Processor");
            };

            // ----------------------------------------------------------------------
            // RESULT FILTER
            // Normalizes result data upon successful HTTP request completion.

            var resultFilterName = makeName("Result");
            var resultFilterID = identifier.irut.fromReference(resultFilterName).result;
            var resultFilterDesc = "Verifies/normalizes result data returned by the local HTTP transport filter.";
            var filterFactoryResponse = filter.create({
                operationID: resultFilterID,
                operationName: resultFilterName,
                operationDescription: resultFilterDesc,
                outputFilterSpec: factoryRequest.resultSpec,
            });
            if (filterFactoryResponse.error) {
                errors.unshift(filterFactoryResponse.error);
                errors.unshift("While attempting to construct inner result processor filter:");
                errors.push("Check to ensure that you have correctly specified the format of a successful HTTP request result.");
                break;
            }
            var resultEgressFilter = filterFactoryResponse.result;

            // ----------------------------------------------------------------------
            // ERROR FILTER
            // Normalizes error data upon failed HTTP request completion.

            var errorFilterName = makeName("Error");
            var errorFilterID = identifier.irut.fromReference(errorFilterName).result;
            var errorFilterDesc = "Verifies/normalizes error data returned by the local HTTP transport filter.";
            filterFactoryResponse = filter.create({
                operationID: errorFilterID,
                operationName: errorFilterName,
                operationDescription: errorFilterDesc,
                outputFilterSpec: { ____accept: "jsString" }
            });
            if (filterFactoryResponse.error) {
                errors.unshift(filterFactoryResponse.error);
                break;
            }
            var errorEgressFilter = filterFactoryResponse.result;

            // ----------------------------------------------------------------------
            // REQUEST FILTER
            // Normalizes data passed to the HTTP request transport filter.
            // And, orchestrates normalization of error and callback data returned
            // by the HTTP request transport.
            var requestFilterName = makeName("Request");
            var requestFilterID = identifier.irut.fromReference(requestFilterName).result;
            // unused? var requestFilterDesc = "Verifies/normalizes input to HTTP request transport filter.";
            filterFactoryResponse = filter.create({
                operationID: requestFilterID,
                operationName: requestFilterName,
                operationDescription: factoryRequest.description,
                inputFilterSpec: {
                    ____label: "HTTP Request Descriptor",
                    ____description: "Deserialized request and query parameter data descriptor object to be validated and passed through to the underlying HTTP request transport filter.",
                    ____types: "jsObject",
                    ____defaultValue: {},
                    request: factoryRequest.requestSpec,
                    query: factoryRequest.querySpec,
                    options: {
                        ____label: "Request Object",
                        ____description: "Runtime request options object.",
                        ____accept: [ "jsObject", "jsUndefined" ]
                    },
                    resultHandler: {
                        ____label: "HTTP Result Handler",
                        ____description: "A JavaScript function to be called by the generated HTTP request filter when the request completes successfully. This function is always passed a single in-parameter, request, that is filtered by the resultSpec.",
                        ____accept: [ "jsUndefined", "jsFunction" ]
                    },
                    errorHandler: {
                        ____label: "HTTP Response Error Handler",
                        ____description: "A JavaScript function to be called by the generated HTTP request filter if the request fails. This function is always passed a single in-parameter of type string that explains what went wrong.",
                        ____accept: [ "jsUndefined", "jsFunction" ]
                    }
                },
                bodyFunction: function(httpRequest_) {

                    var response = { error: null, result: undefined };
                    var errors = [];

                    var inBreakScope = false;
                    while (!inBreakScope) {
                        inBreakScope = true;

                        var resultHandlerCallback = (httpRequest_.resultHandler?httpRequest_.resultHandler:factoryRequest.resultHandler);
                        var errorHandlerCallback = (httpRequest_.errorHandler?httpRequest_.errorHandler:factoryRequest.errorHandler);

                        if (!resultHandlerCallback) {
                            errors.push("No result handler callback function was specified. Unable to initiate request.");
                            break;
                        }

                        if (!errorHandlerCallback) {
                            errors.push("No error handler callback function was specified. Unable to initiate request.");
                            break;
                        }

                        factoryRequest.requestTransportFilter.request({
                            url: factoryRequest.url,
                            method: factoryRequest.method,
                            query: httpRequest_.query,
                            request: httpRequest_.request,
                            options: httpRequest_.options,
                            resultHandler: function(resultResponse_) {
                                var resultFilterResponse = resultEgressFilter.request(resultResponse_);
                                if (resultFilterResponse.error)
                                    return errorHandlerCallback([
                                        "The HTTP request completed without error but the data returned by the endpoint does not have the expected signature.",
                                        resultFilterResponse.error
                                    ].join(" "));
                                return resultHandlerCallback(resultFilterResponse.result);
                            },
                            errorHandler: function(errorResponse_) {
                                var errorFilterResponse = errorEgressFilter.request(errorResponse_);
                                if (errorFilterResponse.error) {
                                    // This is a developer error hit during bring-up of a new hrequest handler typically. And, it's fatal.
                                    throw new Error(errorFilterResponse.error);
                                }
                                return errorHandlerCallback(errorFilterResponse.result);
                            }

                        });
                        break;
                    }

                    if (errors.length)
                        response.error = errors.join(" ");

                    return response;

                },
                outputFilterSpec: { ____accept: "jsUndefined" }
            });
            if (filterFactoryResponse.error) {
                errors.unshift(filterFactoryResponse.error);
                errors.unshift("While attempting to construct the main HTTP request filter:");
                errors.unshift("Check to ensure that you have correctly specified the format of the HTTP request and query.");
                break;
            }
            factoryRequest.requestFilter = filterFactoryResponse.result;

            response.result = factoryRequest.requestFilter;
            break;

        } // end while (!inBreakScope)

        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    },

    outputFilterSpec: {
        ____accept: "jsObject",
        ____label: "HTTP Request Filter"
    }
});

if (filterFactoryResponse.error) {
    throw new Error(filterFactoryResponse.error);
}

module.exports = filterFactoryResponse.result;
