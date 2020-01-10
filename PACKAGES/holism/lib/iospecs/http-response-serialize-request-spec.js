// http-response-render-request-spec.js
//
// TODO: should be renamed to http-response-serialize-request-spec.js
//

const arccore = require("@encapsule/arccore");

const httpServiceFilterRequestSpec = require("./http-service-filter-request-spec");
const httpResponseBaseSpec = require("./http-response-base-spec");

var spec = arccore.util.clone(httpServiceFilterRequestSpec);
spec.____label = "HTTP Response Serialize Request";
spec.____description = "Specifies the format of a request to the main response serializer filter.";
spec.response_descriptor = arccore.util.clone(httpResponseBaseSpec);
spec.response_descriptor.____label = "Serialize Response Request";
spec.response_descriptor.____description = "Response data to be serialized.";

delete spec.request_descriptor.data; // We do not need any request data at this level of abstraction.

module.exports = spec;
