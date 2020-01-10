// http-request-transport-for-node.js
//
// This module depends on the `request` package: https://github.com/request/request#examples
//

const arccore = require("@encapsule/arccore");
const queryString = require("query-string");
const httpRequestTransportSpecs = require("./http-request-transport-iospecs");
const httpRequest = require("request");

var filterFactoryResponse = arccore.filter.create({
    operationName: "HTTP Request Transport For Node.js",
    operationDescription: "Filter wrapper around the request module for use in Node.js clients.",
    operationID: "2zvzciQcQg-SifqIQrbnUg",
    inputFilterSpec: httpRequestTransportSpecs.inputFilterSpec,
    outputFilterSpec: httpRequestTransportSpecs.outputFilterSpec,
    bodyFunction: function(request_) {
        var requestContext = request_;

        var serializedQueryString = undefined;

        if (requestContext.query !== undefined)
            serializedQueryString = queryString.stringify(requestContext.query);

        var options = {
            url: requestContext.url,
            method: requestContext.method,
            qs: serializedQueryString,
            json: requestContext.request
        };

        // Copy options from incoming filter reuqest to options object passed to `request` module.
        if (request_.options)
            for (var key in request_.options)
                options[key] = request_.options[key];

        httpRequest(
            options,
            function(error_, response_, deserializedJSON_) {
                if (error_) {
                    var errorDescriptor = {
                        httpStatus: 0,
                        appStatus: 500,
                        message: ("Request module reported an exception: '" + error_.toString() + "'")
                    };
                    requestContext.errorHandler(JSON.stringify(errorDescriptor));
                    return;
                }
                if (response_.statusCode !== 200) {
                    errorDescriptor = {
                        httpStatus: response_.statusCode,
                        appStatus: 0,
                        message: ("HTTP Error " + response_.statusCode + " " + response_.statusMessage)
                    };
                    requestContext.errorHandler(JSON.stringify(errorDescriptor));
                    return;
                }
                requestContext.resultHandler(deserializedJSON_);
            }
        );
        // Synchronous result is meaningless.
        return { error: null, result: undefined };
    }
});

if (filterFactoryResponse.error)
    throw new Error(filterFactoryResponse.error);

module.exports = filterFactoryResponse.result;
