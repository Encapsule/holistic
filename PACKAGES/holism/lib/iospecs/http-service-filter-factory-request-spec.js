// http-service-filter-factory-request-spec.js

const contentTypeSpec = require("./content-type-spec");
const contentEncodingSpec = require("./content-encoding-spec");

module.exports = {
    ____label: "Service Filter Factory Request",
    ____description: "Constructs an HTTP server service filter plug-in.",
    ____types: "jsObject",
    id: {
        ____label: "Service Filter Identifier",
        ____description: "22-character IRUT identifier string to assign to the constructed service filter.",
        ____accept: "jsString"
    },
    name: {
        ____label: "Name",
        ____accept: "jsString"
    },
    description: {
        ____label: "Description",
        ____accept: "jsString"
    },

    constraints: {
        ____label: "Service Plugin Constraints",
        ____types: "jsObject",
        request: {
            ____label: "Request Constraints",
            ____description: "Information used validate/normalize runtime data passed into the generated plugin server filter by the HTTP server.",
            ____types: "jsObject",
            content: {
                ____label: "Content Constraints",
                ____types: "jsObject",
                type: contentTypeSpec,
                encoding: contentEncodingSpec
            },
            query_spec: {
                ____label: "Query Data Format Specification",
                ____description: "A filter specification object defining the acceptable format of deserialized URL-encoded query data.",
                ____accept: "jsObject"
            },
            request_spec: {
                ____label: "Request Data Format Specification",
                ____description: "A filter specification object defining the acceptable format of deserialized HTTP request data.",
                ____accept: "jsObject"
            },
            options_spec: {
                ____label: "Request Options Format Specification",
                ____description: "A filter specification object defining the acceptable format of service filter registration options.",
                ____accept: "jsObject",
                ____defaultValue: {
                    ____label: "Default Service Filter Options Policy",
                    ____description: "Allows any options to be registered for a service filter.",
                    ____opaque: true
                }
            }
        }, // request
        response: {
            ____label: "Response Contraints",
            ____description: "Information used to validate/normalize the server's response to a request prior to writing it to the HTTP response stream.",
            ____types: "jsObject",
            content: {
                ____label: "Content Constraints",
                ____description: "Flags indicating encoding and content type of the response.",
                ____types: "jsObject",
                encoding: contentEncodingSpec,
                type: contentTypeSpec
            },
            result_spec: {
                ____label: "Service-Specific Result Data Format Specification",
                ____description: "Filter specification document constraining the format of a valid HTTP server result response.",
                ____accept: "jsObject"
            },
            error_context_spec: {
                ____label: "Service-Specific Error Context Data Format Specification",
                ____description: "Filter specification document constraining the format of a valid HTTP server error response.",
                ____accept: "jsObject"
            }
        } // response
    }, // constraints
    handlers: {
        ____label: "Callback Handlers",
        ____description: "Function callbacks made by the generated service filter to perform the service's underlying function.",
        ____types: "jsObject",
        request_handler: {
            ____label: "Service Request Handler",
            ____description: "A function that is called by the service filter to perform the specific function of the service.",
            ____accept: "jsFunction"
        }
    } // handlers
};
