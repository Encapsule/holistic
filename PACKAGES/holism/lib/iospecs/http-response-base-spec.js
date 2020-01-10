// http-response-base-spec.js
//
// Various levels of the HTTP response filter chain specialize the semantics
// of the data namespace that is specified as opaque because we're unsure at
// a low-level of abstraction if the data is a UTF8 string (e.g. HTML or JSON),
// or some binary buffer (e.g. an image).

const contentTypeSpec = require("./content-type-spec");
const contentEncodingSpec = require("./content-encoding-spec");

module.exports = {
    ____label: "Server Response Descriptor",
    ____description: "Data to be written to HTTP response stream.",
    ____types: "jsObject",
    http: {
        ____label: "HTTP Status",
        ____description: "HTTP status code and optional status message.",
        ____types: "jsObject",
        code: {
            ____label: "HTTP Status Code",
            ____description: "The numerical HTTP 1.1 status code to return to the remote HTTP client.",
            ____accept: "jsNumber"
        },
        message: {
            ____label: "HTTP Status Message",
            ____description: "Optional HTTP 1.1 status message to include with status code returned to client.",
            ____accept: [ "jsUndefined", "jsString" ]
        },
    }, // http
    content: {
        ____label: "Content Constraints",
        ____description: "Flags indicating encoding and content type of the response.",
        ____types: "jsObject",
        encoding: contentEncodingSpec,
        type: contentTypeSpec
    },
    headers: {
        ____label: "Response Headers",
        ____description: "Deserialized and parsed HTTP response headers map.",
        ____types: "jsObject",
        ____asMap: true,
        ____defaultValue: {},
        header_name: {
            ____label: "HTTP Response Header Value",
            ____description: "The value associated with header_name in the headers map.",
            ____accept: [ "jsString", "jsNumber" ]
        }
    }, // headers
    data: {
        ____label: "Response Data",
        ____description: "Optional data to transmit to the requesting HTTP client.",
        ____opaque: true
    } // data
};
