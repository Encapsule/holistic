// http-response-write-request-spec.js

const arccore = require("@encapsule/arccore");

const httpServiceFilterRequestSpec = require("./http-service-filter-request-spec");
const httpResponseBaseSpec = require("./http-response-base-spec");

var spec = arccore.util.clone(httpServiceFilterRequestSpec);
spec.____label = "HTTP Response Write Request";
spec.____description = "Specifies the format of a low-level HTTP response write request.";
spec.response_descriptor = arccore.util.clone(httpResponseBaseSpec);

delete spec.integrations; // We do not need server integrations at this level of abstraction.
delete spec.request_descriptor.data;// We do not need any request data at this level of abstraction.

module.exports = spec;
