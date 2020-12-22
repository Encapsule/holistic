// http-integration-filters-factory-result-spec.js

const arccore = require("@encapsule/arccore");
const httpIntegrationFiltersFactoryRequestSpec = require("./http-integration-filters-factory-request-spec");

var spec = arccore.util.clone(httpIntegrationFiltersFactoryRequestSpec);
delete spec.integrations;
spec.____label = "HTTP Server Integrations Descriptor";
spec.____description = "A collection of integration filters wrapping developer-defined accessor and action functions that are " +
    "leveraged by an HTTP server and service filter runtimes to affect HTTP request and response processing.";
spec.filters = {
    ____label: "HTTP Server Integration Filters",
    ____description: "A collection of filter objects that abstract access to specific classes of application-specific data and functionality.",
    ____types: "jsObject",
    http_request_redirector: {
        ____label: "HTTP Request Redirector Filter",
        ____description: "Optional filter that affects HTTP redirection based on analysis of @encapsule/holism HTTP request preprocessor output.",
        ____types: [ "jsNull", "jsObject" ],
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },
    html_render: {
        ____label: "HTML Render Filter",
        ____description: "HTML render filter responsible for converting in-memory JavaScript data into a UTF8-encoded HTML string.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },
    get_org_metadata: {
        ____label: "Organization Metadata Access Filter",
        ____description: "Metadata access filter that retrieves data pertinent to the organization running the webserver.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },
    get_site_metadata: {
        ____label: "Site Metadata Access Filter",
        ____description: "Metadata access filter that retrieves data pertinent to the site being served by this webserver.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },
    get_page_metadata: {
        ____label: "Page Metadata Access Filter",
        ____description: "Metadata access filter that retrieves data pertinent to a specific page in the website running on this webserver.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },
    get_user_identity: {
        ____label: "User Identity Access Filter",
        ____description: "Metadata access filter that retrieves user identity assertion from incoming HTTP requests if present.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },
    get_user_session: {
        ____label: "User Session Access Filter",
        ____description: "Metadata access filter that retrieves user session given user/session identity descriptor.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },
    normalize_user_session_result: {
        ____label: "Normalize User Session Result Filter",
        ____description: "Filter used to validate/normalize a user session descriptor result object.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    },
    normalize_user_session_error: {
        ____label: "Normalize User Session Error Filter",
        ____description: "Filter used to validate/normalize a user session error report.",
        ____types: "jsObject",
        filterDescriptor: { ____accept: "jsObject" },
        request: { ____accept: "jsFunction" }
    }
}; // filters

spec.htmlRenderOptions = httpIntegrationFiltersFactoryRequestSpec.integrations.render.html.renderOptions;

module.exports = spec;

