// client-hrequest-factory.js
// Constructs a client-side-specific Hrequest filter object that wraps an `XMLHttpRequest` call.

const arccore = require("@encapsule/arccore");
const HttpRequestBrowserTransport = require("./lib/http-request-transport-for-browser");
const HttpRequestFilterFactory = require("./lib/http-request-filter-factory");
const httpRequestFilterFactoryUserSpec = require("./lib/http-request-filter-factory-user-spec");
var factoryResponse = arccore.filter.create({
    operationID: "B5dMHTIAQD2pjmji8kp_FA",
    operationName: "Client Hrequest Filter Factory",
    operationDescription: "Constructs a client-side Hrequest filter object.",
    inputFilterSpec: httpRequestFilterFactoryUserSpec,
    outputFilterSpec: {
        ____accept: "jsObject",
        ____label: "Browser HTTP Request Filter"
    },
    bodyFunction: function(request_) {
        request_["requestTransportFilter"] = HttpRequestBrowserTransport;
        return HttpRequestFilterFactory.request(request_);
    }
});
if (factoryResponse.error)
    throw new Error(factoryResponse.error);
module.exports = factoryResponse.result;
