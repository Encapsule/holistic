// http-integration-filters-factory.js

const arccore = require("@encapsule/arccore");
const httpIntegrationFiltersFactoryRequestSpec = require("./iospecs/http-integration-filters-factory-request-spec");
const httpIntegrationFiltersFactoryResultSpec = require("./iospecs/http-integration-filters-factory-result-spec");

const httpServerAgentResultSpec = require("./iospecs/http-server-agent-result-spec");
const httpRequestDescriptorSpec = require("./iospecs/http-service-filter-request-descriptor-spec");

var factoryResponse = arccore.filter.create({
    operationID: "-vrBoPbbRYqzTbV3YdYdug",
    operationName: "HTTP Server Integration Filters Factory",
    operationDescription: "Constructs a collection of filter objects that wrap developer-defined accessor and action functions " +
        "required by a HTTP server and service filters.",
    inputFilterSpec: httpIntegrationFiltersFactoryRequestSpec,
    outputFilterSpec: httpIntegrationFiltersFactoryResultSpec,
    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        var innerFactoryResponse = { error: null };
        while (!inBreakScope) {
            inBreakScope = true;

            // ----------------------------------------------------------------------
            // Instantiate optional HTTP preprocessor output redirector
            // ----------------------------------------------------------------------
            var httpRequestRedirectorFilter = null;
            if (request_.integrations.preprocessor.redirect) {

                const redirectorFilterMoniker = "HTTP Request Redirector";
                const redirectorFilterName = request_.name + "::" + redirectorFilterMoniker;
                const redirectorFilterDescription = "Implements application-specific logic to determine if an incoming HTTP request should be redirect based on " +
                      "examination of the output of @encapsule/holism HTTP request preprocessor.";
                const redirectorFilterID = arccore.identifier.irut.fromReference(request_.filter_id_seed + redirectorFilterMoniker).result;

                innerFactoryResponse = arccore.filter.create({
                    operationID: redirectorFilterID,
                    operationName: redirectorFilterName,
                    operationDescription: redirectorFilterDescription,
                    bodyFunction: request_.integrations.preprocessor.redirect,
                    outputFilterSpec: {
                        ____label: "HTTP Request Redirect Result",
                        ____description: "Message returned by application-specified HTTP request redirect integration filter plug-in.",
                        ____types: [ "jsNull" , "jsObject" ],
                        ____defaultValue: null,
                        locationURL: {
                            ____label: "Location URL",
                            ____description: "A string to use as the value of the Location HTTP header. Or, null to indicate that normal HTTP request processing should proceed.",
                            ____accept: "jsString"
                        },
                        httpCode: {
                            ____label: "HTTP Redirect Code",
                            ____description: "The specific HTTP 1.1 redirect code to send to the requesting client.",
                            ____accept: "jsNumber",
                            ____inValueSet: [ 301, 302, 303, 307, 308 ] // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
                        }
                    }
                });
                if (innerFactoryResponse.error) {
                    errors.push("While attempting to instantiate " + redirectorFilterName + " integration filter.");
                    errors.push(innerFactoryResponse.error);
                    break;
                }
                httpRequestRedirectorFilter = innerFactoryResponse.result;
            }

            // ----------------------------------------------------------------------
            // Instantiate organization metadata accessor filter
            // ----------------------------------------------------------------------
            const getOrgMetadataFilterMoniker = "Org Metadata Accessor";
            const getOrgMetadataFilterName = request_.name + "::" + getOrgMetadataFilterMoniker;
            const getOrgMetadataFilterDescription = "Retrieves metadata pertinent to the organization running this webserver.";
            const getOrgMetadataFilterID = arccore.identifier.irut.fromReference(request_.filter_id_seed + getOrgMetadataFilterMoniker).result;
            innerFactoryResponse = arccore.filter.create({
                operationID: getOrgMetadataFilterID,
                operationName: getOrgMetadataFilterName,
                operationDescription: getOrgMetadataFilterDescription,
                inputFilterSpec: {
                    ____label: "Organization Metadata Request",
                    ____description: "Data passed by an HTTP server filter to obtain data about the organization running this webserver.",
                    ____types: "jsObject",
                    appStateContext: httpIntegrationFiltersFactoryRequestSpec.appStateContext
                },
                outputFilterSpec: request_.integrations.metadata.org.get.outputFilterSpec,
                bodyFunction: request_.integrations.metadata.org.get.bodyFunction
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to instantiate " + getOrgMetadataFilterName + " integration filter.");
                break;
            }
            const getOrgMetadataFilter = innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate site metadata accessor filter
            // ----------------------------------------------------------------------
            const getSiteMetadataFilterMoniker = "Site Metadata Accessor";
            const getSiteMetadataFilterName = request_.name + "::" + getSiteMetadataFilterMoniker;
            const getSiteMetadataFilterDescription = "Retrieves metadata pertinent to the website being served by this webserver.";
            const getSiteMetadataFilterID = arccore.identifier.irut.fromReference(request_.filter_id_seed + getSiteMetadataFilterMoniker).result;

            innerFactoryResponse = arccore.filter.create({
                operationID: getSiteMetadataFilterID,
                operationName: getSiteMetadataFilterName,
                operationDescription: getSiteMetadataFilterDescription,
                inputFilterSpec: {
                    ____label: "Site Metadata Request",
                    ____description: "Data passed by an HTTP server filter to obtain data about the website being served by this webserver.",
                    ____types: "jsObject",
                    appStateContext: httpIntegrationFiltersFactoryRequestSpec.appStateContext,
                    session: request_.integrations.metadata.session.get_session.response.client_spec
                },
                outputFilterSpec: request_.integrations.metadata.site.get.outputFilterSpec,
                bodyFunction: request_.integrations.metadata.site.get.bodyFunction
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to instantiate " + getSiteMetadataFilterName + " integration filter.");
                break;
            }
            const getSiteMetadataFilter = innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate page metadata accessor filter
            // ----------------------------------------------------------------------
            const getPageMetadataFilterMoniker = "Page Metadata Accessor";
            const getPageMetadataFilterName = request_.name + "::" + getPageMetadataFilterMoniker;
            const getPageMetadataFilterDescription = "Retrieves metadata pertinent to a specific page being served by this webserver.";
            const getPageMetadataFilterID = arccore.identifier.irut.fromReference(request_.filter_id_seed + getPageMetadataFilterMoniker).result;
            innerFactoryResponse = arccore.filter.create({
                operationID: getPageMetadataFilterID,
                operationName: getPageMetadataFilterName,
                operationDescription: getPageMetadataFilterDescription,
                inputFilterSpec: {
                    ____label: "Site Metadata Request",
                    ____description: "Request for a copy of the site's metadata descriptor.",
                    ____types: "jsObject",
                    http_code: {
                        ____label: "HTTP Status Code",
                        ____description: "HTTP response code associated with this query. Used by the app-specific filter to redirect e.g. errors.",
                        ____accept: "jsNumber",
                        ____defaultValue: 200
                    },
                    resource_uri: {
                        ____label: "Page URI",
                        ____description: "The URI of the page to retrieve metadata for. This corresponds to the pathname portion of the HTTP " +
                            "request URL.",
                        ____accept: "jsString"
                    },
                    appStateContext: httpIntegrationFiltersFactoryRequestSpec.appStateContext
                },
                outputFilterSpec: request_.integrations.metadata.page.get.outputFilterSpec,
                bodyFunction: request_.integrations.metadata.page.get.bodyFunction
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to instantiate " + getPageMetadataFilterName + " integration filter.");
                break;
            }
            const getPageMetadataFilter = innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate user identity accessor filter
            // ----------------------------------------------------------------------
            const getUserIdentityMetadataFilterMoniker = "User Identity Accessor";
            const getUserIdentityMetadataFilterName = request_.name + "::" + getUserIdentityMetadataFilterMoniker;
            const getUserIdentityMetadataFilterDescription = "Retrieves unaunthenicated user identity from incoming HTTP request.";
            const getUserIdentityMetadataFilterID =
                  arccore.identifier.irut.fromReference(request_.filter_id_seed + getUserIdentityMetadataFilterMoniker).result;

            innerFactoryResponse = arccore.filter.create({
                operationID: getUserIdentityMetadataFilterID,
                operationName: getUserIdentityMetadataFilterName,
                operationDescription: getUserIdentityMetadataFilterDescription,
                inputFilterSpec: {
                    ____label: "Get User Identity Request",
                    ____description: "Information provided about an incoming request by the HTTP server filter.",
                    ____types: "jsObject",
                    request_descriptor: httpRequestDescriptorSpec,
                    appStateContext: httpIntegrationFiltersFactoryRequestSpec.appStateContext
                },
                outputFilterSpec: request_.integrations.metadata.session.get_identity.outputFilterSpec,
                bodyFunction: request_.integrations.metadata.session.get_identity.bodyFunction
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to instantiate " + getUserIdentityMetadataFilterName + " integration filter.");
                break;
            }
            const getUserIdentityMetadataFilter= innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate user session accessor filter
            // ----------------------------------------------------------------------
            const getUserSessionMetadataFilterMoniker = "User Session Accessor";
            const getUserSessionMetadataFilterName = request_.name + "::" + getUserSessionMetadataFilterMoniker;
            const getUserSessionMetadataFilterDescription =
                  "Authenicates a user/session identification assertion and returns the user's current session data.";
            const getUserSessionMetadataFilterID = arccore.identifier.irut.fromReference(
                request_.filter_id_seed + getUserSessionMetadataFilterMoniker).result;

            innerFactoryResponse = arccore.filter.create({
                operationID: getUserSessionMetadataFilterID,
                operationName: getUserSessionMetadataFilterName,
                operationDescription: getUserSessionMetadataFilterDescription,
                // TODO: Tighten this up once baseline requirements are clear.
                inputFilterSpec: {
                    ____label: "Get User Session Request",
                    ____description: "Authenicate and get the user's current session profile data.",
                    ____accept: "jsObject"
                },
                outputFilterSpec: { ____accept: "jsUndefined" },
                bodyFunction: request_.integrations.metadata.session.get_session.bodyFunction
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to instantiate " + getUserSessionMetadataFilterName);
                break;
            }
            const getUserSessionMetadataFilter= innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate user session accessor filter::response result
            // ----------------------------------------------------------------------
            const normalizeUserSessionResultFilterMoniker = "User Session Result";
            const normalizeUserSessionResultFilterName = request_.name + "::" + normalizeUserSessionResultFilterMoniker;
            const normalizeUserSessionResultFilterDescription = "Verifies/normalizes the format of a user session descriptor object.";
            const normalizeUserSessionResultFilterID = arccore.identifier.irut.fromReference(
                request_.filter_id_seed + normalizeUserSessionResultFilterMoniker).result;
            innerFactoryResponse = arccore.filter.create({
                operationID: normalizeUserSessionResultFilterID,
                operationName: normalizeUserSessionResultFilterName,
                operationDescription: normalizeUserSessionResultFilterDescription,
                outputFilterSpec: request_.integrations.metadata.session.get_session.response.result_spec,
                bodyFunction: function(request_) {
                    console.log("..... " + this.operationID + "::" + this.operationName);
                    return { error: null, result: request_ };
                }
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attemping to instantiate " + normalizeUserSessionResultFilterName);
                break;
            }
            const normalizeUserSessionResultFilter = innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate user session accessor filter:: response error
            // ----------------------------------------------------------------------
            const normalizeUserSessionErrorFilterMoniker = "User Session Error";
            const normalizeUserSessionErrorFilterName = request_.name + "::" + normalizeUserSessionErrorFilterMoniker;
            const normalizeUserSessionErrorFilterDescription = "Verifies/normalizes the format of a user session error report.";
            const normalizeUserSessionErrorFilterID = arccore.identifier.irut.fromReference(
                request_.filter_id_seed + normalizeUserSessionErrorFilterMoniker).result;
            innerFactoryResponse = arccore.filter.create({
                operationID: normalizeUserSessionErrorFilterID,
                operationName: normalizeUserSessionErrorFilterName,
                operationDescription: normalizeUserSessionErrorFilterDescription,
                inputFilterSpec: {
                    ____label: "User Session Error Report",
                    ____description: "A string indicating the fatal error that occurred while obtaining the user session descriptor.",
                    ____accept: "jsString"
                },
                bodyFunction: function(request_) {
                    console.log("..... " + this.operationID + "::" + this.operationName);
                    return { error: null, result: request_ };
                }
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                errors.unshift("While attempting to instantiate " + normalizeUserSessionErrorFilterName);
                break;
            }
            const normalizeUserSessionErrorFilter = innerFactoryResponse.result;

            // ----------------------------------------------------------------------
            // Instantiate HTML render integration filter
            // ----------------------------------------------------------------------
            const htmlRenderFilterMoniker = "HTML Render Engine";
            const htmlRenderFilterName = request_.name + "::" + htmlRenderFilterMoniker;
            const htmlRenderFilterDescription = "Transforms an application-specific in-memory data into a UTF8-encoded HTML string.";
            const htmlRenderFilterID = arccore.identifier.irut.fromReference(request_.filter_id_seed + htmlRenderFilterMoniker).result;
            innerFactoryResponse = arccore.filter.create({
                operationID: htmlRenderFilterID,
                operationName: htmlRenderFilterName,
                operationDescription: htmlRenderFilterDescription,
                inputFilterSpec: {
                    ____label: "HTML Render Request",
                    ____description: "Data passed into the HTML render filter to be transformed to a UTF8-encoded HTML string.",
                    ____types: "jsObject",
                    document: {
                        ____label: "Document Data",
                        ____description: "Document data and metadata to be rendered as an HTML document string.",
                        ____types: "jsObject",
                        content: {
                            ____label: "Document Content Render Options",
                            ____description: "Information used to customize the rendering of `document.data`.",
                            ____types: "jsObject",
                            ____defaultValue: {},
                            uri: {
                                ____label: "Content Render View URI",
                                ____description: "The URI of the view render function to be used to render `document.data`. Or, null (default) " +
                                    "to indicate that the base page URI, `document.metadata.page.uri`, should be used.",
                                ____accept: [ "jsNull", "jsString" ],
                                ____defaultValue: null
                            } // uri
                        }, // content
                        data: {
                            ____label: "Document Content Data",
                            ____description: "In-memory data to render as the main body content of the generated HTML document string.",
                            ____opaque: true // possible formats is set of HTTP server error response + all service filter results
                        },
                        metadata: {
                            ____label: "Document Metadata",
                            ____description: "Document Metadata",
                            ____types: "jsObject",
                            agent: httpServerAgentResultSpec,
                            org: request_.integrations.metadata.org.get.outputFilterSpec,
                            site: request_.integrations.metadata.site.get.outputFilterSpec,
                            page: request_.integrations.metadata.page.get.outputFilterSpec,
                            session: request_.integrations.metadata.session.get_session.response.client_spec
                        }
                    },
                    appStateContext: httpIntegrationFiltersFactoryRequestSpec.appStateContext
                },
                outputFilterSpec: {
                    ____label: "UTF8 HTML String",
                    ____description: "The input data object transformed into a UTF8-encoded HTML document string.",
                    ____accept: "jsString"
                },
                bodyFunction: request_.integrations.render.html.bodyFunction
            });
            if (innerFactoryResponse.error) {
                errors.unshift(innerFactoryResponse.error);
                break;
            }
            const htmlRenderFilter = innerFactoryResponse.result;

            // Prepare the response result. Note that the output is filtered
            // so you must update the result spec if you decide to change this.

            response.result = {
                filter_id_seed: request_.filter_id_seed,
                name: request_.name,
                version: request_.version,
                description: request_.description,
                platform: request_.platform,
                document_data_model: request_.document_data_model,
                filters: {
                    http_request_redirector: httpRequestRedirectorFilter,
                    html_render: htmlRenderFilter,
                    get_org_metadata: getOrgMetadataFilter,
                    get_site_metadata: getSiteMetadataFilter,
                    get_page_metadata: getPageMetadataFilter,
                    get_user_identity: getUserIdentityMetadataFilter,
                    get_user_session: getUserSessionMetadataFilter,
                    normalize_user_session_result: normalizeUserSessionResultFilter,
                    normalize_user_session_error: normalizeUserSessionErrorFilter
                },
                appStateContext: request_.appStateContext
            };
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
