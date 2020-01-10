// http-server-generator-result-spec.js
//

module.exports = {
    ____types: "jsObject",
    http_server_context: {
        ____label: "HTTP Server Filter Context",
        ____description: "An in-memory namespace in which this HTTP server filter maintains its internal state.",
        ____accept: "jsObject" // leave this unschematized for now - it's massive and not relevant to most people.
    },
    http_server: {
        ____label: "HTTP Server",
        ____description: "Node.js http.Server object manufactured by the HTTP server filter factory.",
        ____accept: "jsObject"
    },
    listen: {
        ____label: "HTTP Server Listen",
        ____description: "Call this function with the port number to initiate HTTP socket listener.",
        ____accept: "jsFunction"
    }
};


