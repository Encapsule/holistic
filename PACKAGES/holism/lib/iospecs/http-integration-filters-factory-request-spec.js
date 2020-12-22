// http-integration-filters-factory-request-spec.js

const httpServerRenderHTML5OptionsSpec = require("./http-server-render-html5-options-spec");

module.exports = {
    ____label: "HTTP Server Integrations Factory Request",
    ____description: "Information used to construct HTTP server integration filters.",
    ____types: "jsObject",

    filter_id_seed: {
        ____label: "Filter Identifier Seed",
        ____description: "A 22-character IRUT identifier as a seed when creating integration filter ID's.",
        ____accept: "jsString",
        ____defaultValue: "YsPXb5gIT1OLNnNdTn-Hvg" // the seed value does not generally matter if you're using a single @encapsule/holism server instance
    },

    name: {
        ____label: "Integration Filters Name",
        ____description: "A short name or moniker used to refer to refer to this set of application data and function contracts.",
        ____accept: "jsString"
    },

    description: {
        ____label: "Integration Filters Description",
        ____description: "A description of this set of application data and function contracts.",
        ____accept: "jsString"
    },

    version: {
        ____label: "Integration Filters Version",
        ____description: "A semantic version string associated with this set of application data and function contracts.",
        ____accept: "jsString"
    },

    integrations: {
        ____label: "Application Integrations",
        ____description: "Defines format and access functions used by HTTP server and service filters to access application resources.",
        ____types: "jsObject",

        preprocessor: {
            ____label: "HTTP Request Preprocessor",
            ____description: "Format and functions for affecting custom per-HTTP-request message preprocessing.",
            ____types: "jsObject",
            ____defaultValue: {},

            redirect: {
                ____label: "HTTP Request Redirect Preprocessor",
                ____description: "Optional function callback that allows an application to affect HTTP redirection based on the output of the HTTP request preprocessor.",
                ____accept: [ "jsNull" /*NOOP*/, "jsFunction" /*App-redirector - primary use case is redirection (e.g. http:// to https:// */ ],
                ____defaultValue: null
            } // redirect

        }, // preprocessor

        metadata: {
            ____label: "Metadata Integrations",
            ____description: "Format and functions for generic access to metadata.",
            ____types: "jsObject",

            org: {
                ____label: "Organization Metadata Integrations",
                ____description: "Format and functions for generic access to organization metadata.",
                ____types: "jsObject",
                get: {
                    ____label: "Get Organization Metadata Integration Declaration",
                    ____description: "Developer-defined access function (filter body function), and object format (filter output spec).",
                    ____types: "jsObject",
                    bodyFunction: {
                        ____label: "Get Organization Metadata",
                        ____description: "Developer-defined callback function responsible for retrieving organization metadata.",
                        ____accept: "jsFunction"
                    },
                    outputFilterSpec: {
                        ____label: "Organization Metadata Spec",
                        ____description: "A filter specification object defining the format of organization metadata.",
                        ____accept: "jsObject"
                    },
                } // get
            }, // org

            site: {
                ____label: "Site Metadata Integrations",
                ____description: "Format and functions for generic access to site metadata.",
                ____types: "jsObject",
                get: {
                    ____label: "Get Site Metadata Integration Declaration",
                    ____description: "Developer-defined access function (filter body function), and object format (filter output spec).",
                    ____types: "jsObject",
                    bodyFunction: {
                        ____label: "Get Site Metadata",
                        ____description: "Developer-defined callback function responsible for retrieving site metadata.",
                        ____accept: "jsFunction"
                    },
                    outputFilterSpec: {
                        ____label: "Site Metadata Spec",
                        ____description: "A filter specification object defining the format of site metadata.",
                        ____accept: "jsObject"
                    },
                } // get
            }, // site

            page: {
                ____label: "Page Metadata Integrations",
                ____description: "Format and functions for generic access to page metadata.",
                ____types: "jsObject",
                get: {
                    ____label: "Get Page Metadata Integration Declaration",
                    ____description: "Developer-defined access function (filter body function), and object format (filter output spec).",
                    ____types: "jsObject",
                    bodyFunction: {
                        ____label: "Get Page Metadata Function",
                        ____description: "Developer-defined callback function responsible for retrieving page metadata.",
                        ____accept: "jsFunction"
                    },
                    outputFilterSpec: {
                        ____label: "Page Metadata Spec",
                        ____description: "A filter specification object defining the format of page metadata.",
                        ____accept: "jsObject"
                    },
                } // get
            }, // page

            session: {
                ____label: "User Session Integrations",
                ____description: "Format and functions for generic access to user identification and session metadata.",
                ____types: "jsObject",

                get_identity: {
                    ____label: "Get User Identity",
                    ____description: "Allows the HTTP server to generically obtain the user identity descriptor from an HTTP request.",
                    ____types: "jsObject",
                    bodyFunction: {
                        ____label: "Get User Identity Function",
                        ____description: "Developer-defined callback function with synchronous response semantics responsible for " +
                            "retrieving user identity data from HTTP request.",
                        ____accept: "jsFunction"
                    },
                    outputFilterSpec: {
                        ____label: "User Identification Descriptor Spec",
                        ____description: "A filter specification object defining the format of a user identification descriptor.",
                        ____accept: "jsObject"
                    }
                }, // get_identity

                // Used to generate an asynchronous filter
                get_session: {
                    ____label: "Get User Session",
                    ____description: "Allows the HTTP server to generically request a user session auth token from the app.",
                    ____types: "jsObject",
                    bodyFunction: {
                        ____label: "Get User Session Function",
                        ____description: "Developer-defined callback function with asynchronous response semantics " +
                            "responsible for retrieving a session auth token given user id.",
                        ____accept: "jsFunction"
                    },
                    response: {
                        ____label: "Async Response Filters",
                        ____description: "Information used to generate response filters passed to the main request filter's request function.",
                        ____types: "jsObject",
                        result_spec: {
                            ____label: "User Session Result (Server)",
                            ____description: "User session format as returned by the application-specific get_session integration filter.",
                            ____accept: "jsObject"
                        },
                        client_spec: {
                            ____label: "User Session Result (Client)",
                            ____description: "User session format used to prune sensitive information from the server user session prior to sharing w/clients of the app server.",
                            ____accept: "jsObject"
                        }
                    }
                } // get_session

            } // user

        }, // metadata

        render: {
            ____label: "Render Integrations",
            ____description: "Defines access functions for transforming, or rendering, application-specific data to various formats.",
            ____types: "jsObject",

            html: {
                ____label: "HTML Rendering Engine",
                ____description: "Registration of external HTML rendering engine.",
                ____types: "jsObject",

                bodyFunction: {
                    ____label: "HTML Render Function",
                    ____description: "Developer-defined callback function responsible for rendering HTML documents.",
                    ____accept: "jsFunction"
                },

                renderOptions: {
                    ...httpServerRenderHTML5OptionsSpec
                }


            } // html

        } // render

    }, // integrations

    appStateContext: {
        ____label: "Application State Context",
        ____description: "In-memory data object shared by the @encapsule/holism app server instance and other app subsystems.",
        ____accept: "jsObject" // accept any object in its entirety without filtering
    } // appStateContext

};
