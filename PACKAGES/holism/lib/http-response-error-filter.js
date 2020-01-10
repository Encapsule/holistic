// http-response-error-filter.js

const http = require("http");
const arccore = require("@encapsule/arccore");
const serializeResponseFilter = require("./http-response-serialize-filter");
const httpResponseErrorRequestSpec = require("./iospecs/http-response-error-request-spec");

var factoryResponse = arccore.filter.create({
    operationID: "XoyKovKcQ-i-Pwy5PSrn1Q",
    operationName: "HTTP Error Responder",
    operationDescription: "Sends a normalized error response to a remote HTTP client.",
    inputFilterSpec: httpResponseErrorRequestSpec,
    bodyFunction: function(request_) {
        console.log("..... " + this.operationID + "::" + this.operationName);
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            // Wrap the output in an IRUT-tagged namespace object so that it can be
            // easily discriminated from other application and 3rd-party message
            // signatures by derived applications.

            // Send the request information to console.error.
            console.error(JSON.stringify(request_.request_descriptor));

            if (!request_.error_descriptor.http.message) {
                request_.error_descriptor.http.message = http.STATUS_CODES[request_.error_descriptor.http.code];
            }

            request_.error_descriptor.data.http = request_.error_descriptor.http;
            request_.error_descriptor.data = { "ESCW71rwTz24meWiZpJb4A": request_.error_descriptor.data };

            var innerResponse = serializeResponseFilter.request({
                integrations: request_.integrations,
                streams: request_.streams,
                request_descriptor: request_.request_descriptor,
                response_descriptor: request_.error_descriptor
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
