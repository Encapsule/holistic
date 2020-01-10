// http-response-error-result-spec.js
//
// Inherits from http-response-error-request-spec.js.
// Wraps the error_descriptor.data specification in an IRUT object namespace.
// This specification is not actually applied (i.e. there's no filter that uses
// this specification inside of the holism codebase; the actual wrapping
// operation is inlined in the implementation and is not subject to change.
//
// The purpose of this is seemingly odd pattern is to allow derived applications
// to easily discriminate Encapsule/holism error content from any other type of
// content that may need to get routed in the application layer. Although a bit
// abstruse, this is highly scalable as messages that follow encoding conventions
// can be routed with densely packed, highly tested generic code.

const arccore = require("@encapsule/arccore");
const httpResponseErrorRequestSpec = require("./http-response-error-request-spec");

const spec = arccore.util.clone(httpResponseErrorRequestSpec);
spec.error_descriptor.data.http = spec.error_descriptor.http;

var holismErrorMessageSpec = {
    ____label: "Holism Error Message",
    ____description: "An IRUT wrapped message desriptor sent to indicate that a runtime error has occurred in the holism server instance.",
    ____types: "jsObject",
    "ESCW71rwTz24meWiZpJb4A": spec.error_descriptor.data
};

spec.error_descriptor.data = holismErrorMessageSpec;

module.exports = spec;





