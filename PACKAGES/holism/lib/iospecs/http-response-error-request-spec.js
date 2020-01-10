// http-response-error-request-spec.js
//
// Inherits from service request.
// Extends with required error-specific request input contraints.
//

const arccore = require("@encapsule/arccore");

const httpServiceFilterRequestSpec = require("./http-service-filter-request-spec");
const httpResponseBaseSpec = require("./http-response-base-spec");

var spec = arccore.util.clone(httpServiceFilterRequestSpec);

spec.____label = "HTTP Error Response Request";
spec.____description = "Specifies the format of an error response request.";
spec.error_descriptor = arccore.util.clone(httpResponseBaseSpec);
spec.error_descriptor.____label = "Error Response Descriptor";
spec.error_descriptor.____description = "Additional information about the error, failure, or fault.";
spec.error_descriptor.data = {
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
}; // data specialization for error response

// ?
delete spec.request_descriptor.data.body; // We do not need any request data at this level of abstraction.

module.exports = spec;

