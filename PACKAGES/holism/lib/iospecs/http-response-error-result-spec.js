// http-response-error-result-spec.js
//
// To serialize an HTTP error response, a service filter will send an http-response-error-request
// to its error responder filter (passed to it by @encapsule/holism). The error responder "boxes"
// the error_descriptor.data value received via the error response request in a uniquely-named
// descriptor object (for d2r2 discrimination primarily althrough generally useful if you're
// looing at the JSON). Additionally, the error responder implementation splices the HTTP response
// disposition values carried in the error_descriptor into the boxed error data. This makes it
// simple to e.g. write an application-specific d2r2 component to display HTTP error responses
// from a HolisticNodeService instance.

(function() {

    const httpResponseErrorRequestSpec = require("./http-response-error-request-spec");

    let httpResponseErrorResultSpec = {
        ...httpResponseErrorRequestSpec,
        ____label: "HTTP Error Response Result",
        ____description: "Specifies the format of an error response result message.",
        error_descriptor: {
            ...httpResponseErrorRequestSpec.error_descriptor,
            ____label: "HTTP Error Result Descriptor",
            ____description: "Data serialized to the the HTTP response stream to indicate that that HTTP request failed with error.",
            data: {
                ____label: "HTTP Error Response Result Data",
                ____description: "A descriptor object routable via @encapsule/d2r2 that indicates that the HTTP request failed with error.",
                ____types: "jsObject",
                HolisticNodeService_HTTPErrorResponse: {
                    ...httpResponseErrorRequestSpec.error_descriptor.data,
                    http: {
                        ...httpResponseErrorRequestSpec.error_descriptor.http
                    }
                }
            }
        }
    };

    module.exports = httpResponseErrorResultSpec;

})();

