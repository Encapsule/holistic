// server-hrequest-factory.js
// Constructs a server-side-specific Hrequest object that wraps a call to the `request` HTTP request library package.

const arccore = require("@encapsule/arccore");
const HttpRequestNodeTransport = require("./lib/http-request-transport-for-node");
const HttpRequestFilterFactory = require("./lib/http-request-filter-factory");
const httpRequestFilterFactoryUserSpec = require("./lib/http-request-filter-factory-user-spec");
var factoryResponse = arccore.filter.create({
    operationID: "Kw7BO6DPSH2XZF-2vItnZA",
    operationName: "Server Hrequest Filter Factory",
    operationDescription: "Constructs a server-side Hrequest filter object.",
    inputFilterSpec: httpRequestFilterFactoryUserSpec,
    outputFilterSpec: {
        ____accept: "jsObject",
        ____label: "Server HTTP Request Filter"
    },
    bodyFunction: function(request_) {
        request_["requestTransportFilter"] = HttpRequestNodeTransport;
        return HttpRequestFilterFactory.request(request_);
    }
});
if (factoryResponse.error)
    throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;
