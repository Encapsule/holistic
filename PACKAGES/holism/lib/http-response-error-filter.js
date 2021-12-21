// http-response-error-filter.js

const http = require("http");
const serializeResponseFilter = require("./http-response-serialize-filter");

// This is a effectively a service filter request with a specialized filter spec for error_descriptor.data
const httpResponseErrorRequestSpec = require("./iospecs/http-response-error-request-spec");

const arccore = require("@encapsule/arccore");

var factoryResponse = arccore.filter.create({
    operationID: "XoyKovKcQ-i-Pwy5PSrn1Q",
    operationName: "HTTP Error Responder",
    operationDescription: "Sends a normalized error response to a remote HTTP client.",
    inputFilterSpec: httpResponseErrorRequestSpec,
    bodyFunction: function(request_) {
        console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            let response_descriptor = {
                ...request_.error_descriptor,
                headers: {
                    ...request_.error_descriptor.headers,
                    "Cache-Control": "no-store, max-age=0"
                },
                http: {
                    code: request_.error_descriptor.http.code,
                    message: request_.error_descriptor.http.message?request_.error_descriptor.http.message:http.STATUS_CODES[request_.error_descriptor.http.code]
                },
                data: {
                    HolisticNodeService_HTTPErrorResponse: {
                        ...request_.error_descriptor.data,
                        http: {
                            code: request_.error_descriptor.http.code,
                            message: request_.error_descriptor.http.message?request_.error_descriptor.http.message:http.STATUS_CODES[request_.error_descriptor.http.code]
                        }
                    }

                }

            };

            let innerResponse = serializeResponseFilter.request({
                integrations: request_.integrations,
                streams: request_.streams,
                request_descriptor: request_.request_descriptor,
                response_descriptor
            });
            if (innerResponse.error) {
                errors.unshift(innerResponse.error);
                break;
            }
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
            console.error(response.error);
        }
        return response;
    }
});
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}
module.exports = factoryResponse.result;
