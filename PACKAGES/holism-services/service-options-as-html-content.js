// service-options-as-html-content-no-auth.js
//
// See <service-options-as-html-content-.js>
//
// options as content service filter to be used for routes
// that do not require authorization and will never return
// a redirect.

const httpServiceFilterFactory = require("@encapsule/holism").service;

/**
 Common things used by options as content.
 **/

const contentTypeLUT = {
    html: "text/html",
    json: "application/json"
};

const constraints = {
    request: {
        content: {encoding: "utf8", type: "text/plain"},
        query_spec: {
            ____types: "jsObject",
            ____defaultValue: {},
            format: {
                ____accept: "jsString",
                ____defaultValue: "html",
                ____inValueSet: ["html", "json"]
            }
        },
        request_spec: {____opaque: true},
        options_spec: {
            ____label: "HTML Content Render Request Descriptor",
            ____description: "A HTML content render request descriptor to be passed directly to the HTML rendering subsystem at runtime.",
            ____accept: "jsObject",
            ____defaultValue: {"uURRenqiTtmzrce5eRXARQ": {message: "YOU MUST SPECIFY AN SERVICE OPTIONS OBJECT!"}}
        }
    },
    response: {
        content: {encoding: "utf8", type: "text/html"},
        error_context_spec: {____opaque: true},
        result_spec: {____opaque: true}
    }
};

var factoryResponse = httpServiceFilterFactory.create({
    id: "RwX7E6RuQq-oJeihidQrfw",
    name: "Options As HTML Content",
    description: "Passes the service filter registration options object to response_descriptor.data w/UTF8 and HTML contentthe value registration-time options object through to the HTML render subsystem.",
    constraints: constraints,
    handlers: {
        request_handler: function(request_) {
            console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);

            var errors = [];
            var inBreakScope = false;

            while (!inBreakScope) {
                inBreakScope = true;

                request_.response_filters.result.request({
                    streams: request_.streams,
                    integrations: request_.integrations,
                    request_descriptor: request_.request_descriptor,
                    response_descriptor: {
                        http: { code: 200, message: "React!" },
                        content: { encoding: "utf8", type: contentTypeLUT[request_.request_descriptor.data.query.format] },
                        data: request_.options // <--- options value from service filter registration passed through to HTML render subsystem as static content
                    }
                });
                // Here, response.error === null.
                break;
            }

            if (errors.length) {
                var message = errors.join(" ");
                var errorAttempt = request_.response_filters.error.request({
                    streams: request_.streams,
                    integrations: request_.integrations,
                    request_descriptor: request_.request_descriptor,
                    error_descriptor: {
                        http: { code: 500 },
                        content: { encoding: "utf8", type: "text/html" },
                        data: {
                            error_message: message,
                            error_context: {
                                source_tag:  "rainier-ux-base-error-nMCofa58QZqm28kkYjDMvw"
                            }
                        }
                    }
                });

                if (errorAttempt.error) {
                    return { error: errorAttempt.error };
                }
            }
            return { error: null, result: null };
        }
    }
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
