// http-service-filter-request-descriptor-spec.js
//
// Filter specification object defining the format of a request summary
// object derived from data extracted from the HTTP request stream by
// an HTTP server filter instance. This data is passed to registered
// integration and service filters by the HTTP server filter depending
// on a large number of factors.

module.exports =  {
    ____label: "Server Request Descriptor",
    ____description: "Information derived by the HTTP server from the incoming request stream. Most service filters " +
        "are able to perform their function accessing only the data in this namespace without need for access to " +
        "streams.request",
    ____types: "jsObject",
    url_parse: {
        ____label: "Parsed URL Descriptor",
        ____description: "Deserialized and parsed URL structure.",
        ____accept: "jsObject"
    },
    route_method_name: {
        ____label: "Route Method Name",
        ____description: "The HTTP server's primary routing key for this request composed of METHOD:pathname.",
        ____accept: "jsString",
    },
    headers: {
        ____label: "Request Headers",
        ____description: "Deserialized and parsed HTTP request headers map",
        ____types: "jsObject",
        ____asMap: true,
        header_name: {
            ____label: "HTTP Request Header Value",
            ____description: "The value associated with header_name in the headers map.",
            ____accept: [ "jsString", "jsNumber" ]
        }
    }, // headers
    session: {
        ____label: "User Session Data",
        ____description: "Current authenticated user session data. Or, the anonymous user's default session data.",
        ____accept: [ "jsNull", "jsObject" ]
    },
    data: {
        ____label: "Request Data",
        ____description: "Normalized but as-yet unprocessed request data passed to the service filter.",
        ____types: "jsObject",
        query: {
            ____label: "URL Query Map",
            ____description: "A map of name-value pairs deserialized from the query portion of the request URL.",
            ____accept: [ "jsUndefined", "jsObject" ] // HTTP server passes undefined iff no URL-encoded search/query in request URL
        },
        body: {
            ____label: "Request Body",
            ____description: "The body of the request (if any) extracted from the HttpRequest stream by holism, and passed on in serialized form.",
            // ____accept: "jsString"
            ____opaque: true
        },
        bodyParsed: {
            ____label: "Body Parsed Flag",
            ____description: "Flag set true to indicate that body has been parsed (e.g. deserialized from JSON string).",
            ____accept: "jsBoolean",
            ____defaultValue: false
        }
    } // data
}; // request_descriptor
