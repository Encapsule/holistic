// http-response-error-request-spec.js
//
// Inherits from service request. Extends with required error-specific request input contraints.

(function() {

    const httpServiceFilterRequestSpec = require("./http-service-filter-request-spec");
    const httpResponseBaseSpec = require("./http-response-base-spec");

    let httpResponseErrorRequestSpec = {
        ...httpServiceFilterRequestSpec,
        ____label: "HTTP Error Response Request",
        ____description: "Specifies the format of an error response request message.",
    };

    httpResponseErrorRequestSpec.error_descriptor = {
        ...httpResponseBaseSpec,
        ____label: "Server Error Response Descriptor",
        ____description: "Data to be passed to a service filter's error responder filter to complete an HTTP request w/with an HTTP error response.",
        data: {
            ____label: "Error Data",
            ____description: "Details error/fault information.",
            ____types: "jsObject",
            error_message: {
                ____label: "Error Message",
                ____description: "Optional error message string summarizing the failure.",
                ____accept: "jsString",
                ____defaultValue: "No additional information available."
            },
            error_context: {
                ____label: "Error Context",
                ____description: "Optional subsystem/service-specific context data provided application-level error handling.",
                ____accept: "jsObject",
                ____defaultValue: {}
            }
        }
    };

    module.exports = httpResponseErrorRequestSpec;

})();

