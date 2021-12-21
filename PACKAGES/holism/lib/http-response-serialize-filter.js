// http-response-serialize-filter.js

const arccore = require("@encapsule/arccore");
const httpResponseSerializeRequestSpec = require("./iospecs/http-response-serialize-request-spec");

// This filter ultimately delegates to writeResponseFilter that is responsible for writing to the ServerResponse stream.
const writeResponseFilter = require("./http-response-write-filter");

var factoryResponse = arccore.filter.create({
    operationID: "MCNT7LgfTH-XulKeh0fUMQ",
    operationName: "HTTP Response Serializer",
    operationDescription: "Encapsulates transformation of in-memory data to desired response content encoding and type.",
    inputFilterSpec: httpResponseSerializeRequestSpec,
    bodyFunction: function(request_) {
        console.log("..... " + this.filterDescriptor.operationID + "::" + this.filterDescriptor.operationName);
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            var responseDescriptor = request_.response_descriptor;
            const responseDataType = Object.prototype.toString.call(responseDescriptor.data);
            const contentEncoding = responseDescriptor.content.encoding;
            const contentType = responseDescriptor.content.type;

            const initialState = responseDataType + "::" + contentEncoding + "::" + contentType;

            switch (initialState) {

            case "[object Null]::utf8::application/json":
            case "[object Boolean]::utf8::application/json":
            case "[object Number]::utf8::application/json":
            case "[object String]::utf8::application/json":
            case "[object Object]::utf8::application/json":
            case "[object Array]::utf8::application/json":
                responseDescriptor.data = JSON.stringify(responseDescriptor.data);
                break;

                // RENDER HTML5 DOCUMENT
            case "[object Object]::utf8::text/html":
                var integrationFilters = request_.integrations.filters;
                var appStateContext = request_.integrations.appStateContext;
                var integrationResponse;

                // Ask the application for a copy of the publishing organization's metdata.
                integrationResponse = integrationFilters.get_org_metadata.request({ appStateContext: appStateContext });
                if (integrationResponse.error) {
                    errors.unshift(integrationResponse.error);
                    errors.unshift("While attempting to retrieve organizational metadata from the application.");
                    break;
                }
                var orgMetadata = integrationResponse.result;

                // Ask the application for a copy of the site's metadata.
                integrationResponse = integrationFilters.get_site_metadata.request({ appStateContext: appStateContext, session: request_.request_descriptor.session });
                if (integrationResponse.error) {
                    errors.unshift(integrationResponse.error);
                    errors.unshift("While attempting to retrieve site metdata from the application.");
                    break;
                }
                var siteMetadata = integrationResponse.result;

                // Ask the application for a copy of the page's metadata.
                integrationResponse = integrationFilters.get_page_metadata.request({
                    http_code: responseDescriptor.http.code,
                    http_message: responseDescriptor.http.message,
                    resource_uri: request_.request_descriptor.url_parse.pathname,
                    appStateContext: appStateContext
                });
                if (integrationResponse.error) {
                    errors.unshift(integrationResponse.error);
                    errors.unshift("While attempting to retrieve page metadata from the application.");
                    break;
                }
                var pageMetadata = integrationResponse.result;

                integrationResponse = integrationFilters.get_server_agent_info.request();
                if (integrationResponse.error) {
                    errors.unshift(integrationResponse.error);
                    errors.unshift("While attempting to retrieve server agent information.");
                    break;
                }
                var agentInfo = integrationResponse.result;

                // Render the HTML document via the registered integration filter.
                integrationResponse = integrationFilters.html_render.request({
                    appStateContext: appStateContext,
                    appServiceRoute: request_.request_descriptor.route_method_name,
                    appServiceContext: {
                        httpContext: {
                            httpRequest: {
                                parsedURL: request_.request_descriptor.url_parse,
                                headers: request_.request_descriptor.headers
                            },
                            httpResponse: {
                                disposition: request_.response_descriptor.http
                            }
                        }, // httpContext
                        metadataContext: {
                            common: {
                                org: orgMetadata,
                                site: siteMetadata,
                                page: pageMetadata
                            },
                            server: {
                                agent: agentInfo,
                                environment: agentInfo.instance.environment
                            }
                        }
                    },
                    appServiceRequest: {
                        userLoginSessionData: request_.request_descriptor.session, // This is filtered per constraints defined by HolisticServiceCore instance.
                        renderData: request_.response_descriptor.data,
                        renderOptions: request_.integrations.htmlRenderOptions
                    }
                });
                if (integrationResponse.error) {
                    errors.unshift(integrationResponse.error);
                    errors.unshift("While delegating to the application's HTML render engine.");
                    break;
                }
                responseDescriptor.data = integrationResponse.result; // HTML document

                // Simple test to supress all caching of HTML rendered by the server (NEVER DO THIS!)
                // responseDescriptor.headers['Cache-Control'] = 'no-store'; // no-cache requires ETag?

                break;
            default:
                break;
            }
            if (errors.length) {
                break;
            }

            var innerResponse = writeResponseFilter.request(request_);
            if (innerResponse.error) {
                errors.unshift(innerResponse.error);
                break;
            }
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    }
});
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}
module.exports = factoryResponse.result;
