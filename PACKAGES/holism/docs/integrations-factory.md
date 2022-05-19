# Filter Object README

## [-vrBoPbbRYqzTbV3YdYdug::HTTP Server Integration Filters Factory]

**Constructs a collection of filter objects that wrap developer-defined integration filters that are required by @encapsule/holism HTTP server instance and its registered service filter plug-ins.**

### Operation

This operation is dispatched by calling the filter object's `request` method passing a single value `input`:

```JavaScript
var response = filter.request(input);
if (response.error) {
    throw new Error(response.error); // <- response.result invalid
}
var result = response.result; // <- response.result valid
```

### Request Input

This filter normalizes the value of `input` passed to its `request` method using the following filter spec contract:

```JavaScript
{
    "____label": "HTTP Server Integrations Factory Request",
    "____description": "Information used to construct HTTP server integration filters.",
    "____types": "jsObject",
    "filter_id_seed": {
        "____label": "Filter Identifier Seed",
        "____description": "A 22-character IRUT identifier as a seed when creating integration filter ID's.",
        "____accept": "jsString",
        "____defaultValue": "YsPXb5gIT1OLNnNdTn-Hvg"
    },
    "name": {
        "____label": "Integration Filters Name",
        "____description": "A short name or moniker used to refer to refer to this set of application data and function contracts.",
        "____accept": "jsString"
    },
    "description": {
        "____label": "Integration Filters Description",
        "____description": "A description of this set of application data and function contracts.",
        "____accept": "jsString"
    },
    "version": {
        "____label": "Integration Filters Version",
        "____description": "A semantic version string associated with this set of application data and function contracts.",
        "____accept": "jsString"
    },
    "integrations": {
        "____label": "Application Integrations",
        "____description": "Defines format and access functions used by HTTP server and service filters to access application resources.",
        "____types": "jsObject",
        "preprocessor": {
            "____label": "HTTP Request Preprocessor",
            "____description": "Format and functions for affecting custom per-HTTP-request message preprocessing.",
            "____types": "jsObject",
            "____defaultValue": {},
            "redirect": {
                "____label": "HTTP Request Redirect Preprocessor",
                "____description": "Optional function callback that allows an application to affect HTTP redirection based on the output of the HTTP request preprocessor.",
                "____accept": [
                    "jsNull",
                    "jsFunction"
                ],
                "____defaultValue": null
            }
        },
        "metadata": {
            "____label": "Metadata Integrations",
            "____description": "Format and functions for generic access to metadata.",
            "____types": "jsObject",
            "org": {
                "____label": "Organization Metadata Integrations",
                "____description": "Format and functions for generic access to organization metadata.",
                "____types": "jsObject",
                "get": {
                    "____label": "Get Organization Metadata Integration Declaration",
                    "____description": "Developer-defined access function (filter body function), and object format (filter output spec).",
                    "____types": "jsObject",
                    "bodyFunction": {
                        "____label": "Get Organization Metadata",
                        "____description": "Developer-defined callback function responsible for retrieving organization metadata.",
                        "____accept": "jsFunction"
                    },
                    "outputFilterSpec": {
                        "____label": "Organization Metadata Spec",
                        "____description": "A filter specification object defining the format of organization metadata.",
                        "____accept": "jsObject"
                    }
                }
            },
            "site": {
                "____label": "Site Metadata Integrations",
                "____description": "Format and functions for generic access to site metadata.",
                "____types": "jsObject",
                "get": {
                    "____label": "Get Site Metadata Integration Declaration",
                    "____description": "Developer-defined access function (filter body function), and object format (filter output spec).",
                    "____types": "jsObject",
                    "bodyFunction": {
                        "____label": "Get Site Metadata",
                        "____description": "Developer-defined callback function responsible for retrieving site metadata.",
                        "____accept": "jsFunction"
                    },
                    "outputFilterSpec": {
                        "____label": "Site Metadata Spec",
                        "____description": "A filter specification object defining the format of site metadata.",
                        "____accept": "jsObject"
                    }
                }
            },
            "page": {
                "____label": "Page Metadata Integrations",
                "____description": "Format and functions for generic access to page metadata.",
                "____types": "jsObject",
                "get": {
                    "____label": "Get Page Metadata Integration Declaration",
                    "____description": "Developer-defined access function (filter body function), and object format (filter output spec).",
                    "____types": "jsObject",
                    "bodyFunction": {
                        "____label": "Get Page Metadata Function",
                        "____description": "Developer-defined callback function responsible for retrieving page metadata.",
                        "____accept": "jsFunction"
                    },
                    "outputFilterSpec": {
                        "____label": "Page Metadata Spec",
                        "____description": "A filter specification object defining the format of page metadata.",
                        "____accept": "jsObject"
                    }
                }
            },
            "session": {
                "____label": "User Session Integrations",
                "____description": "Format and functions for generic access to user identification and session metadata.",
                "____types": "jsObject",
                "get_identity": {
                    "____label": "Get User Identity",
                    "____description": "Allows the HTTP server to generically obtain the user identity descriptor from an HTTP request.",
                    "____types": "jsObject",
                    "bodyFunction": {
                        "____label": "Get User Identity Function",
                        "____description": "Developer-defined callback function with synchronous response semantics responsible for retrieving user identity data from HTTP request.",
                        "____accept": "jsFunction"
                    },
                    "outputFilterSpec": {
                        "____label": "User Identification Descriptor Spec",
                        "____description": "A filter specification object defining the format of a user identification descriptor.",
                        "____accept": "jsObject"
                    }
                },
                "get_session": {
                    "____label": "Get User Session",
                    "____description": "Allows the HTTP server to generically request a user session auth token from the app.",
                    "____types": "jsObject",
                    "bodyFunction": {
                        "____label": "Get User Session Function",
                        "____description": "Developer-defined callback function with asynchronous response semantics responsible for retrieving a session auth token given user id.",
                        "____accept": "jsFunction"
                    },
                    "response": {
                        "____label": "Async Response Filters",
                        "____description": "Information used to generate response filters passed to the main request filter's request function.",
                        "____types": "jsObject",
                        "result_spec": {
                            "____label": "User Session Result (Server)",
                            "____description": "User session format as returned by the application-specific get_session integration filter.",
                            "____accept": "jsObject"
                        },
                        "client_spec": {
                            "____label": "User Session Result (Client)",
                            "____description": "User session format used to prune sensitive information from the server user session prior to sharing w/clients of the app server.",
                            "____accept": "jsObject"
                        }
                    }
                }
            }
        },
        "render": {
            "____label": "Render Integrations",
            "____description": "Defines access functions for transforming, or rendering, application-specific data to various formats.",
            "____types": "jsObject",
            "html": {
                "____label": "HTML Rendering Engine",
                "____description": "Registration of external HTML rendering engine.",
                "____types": "jsObject",
                "bodyFunction": {
                    "____label": "HTML Render Function",
                    "____description": "Developer-defined callback function responsible for rendering HTML documents.",
                    "____accept": "jsFunction"
                },
                "renderOptions": {
                    "____label": "HTML5 Document Synth Options",
                    "____description": "Options and overrides to apply to the @encapsule/holistic-nodejs-service's HTML5 document rendering subsystem.",
                    "____types": "jsObject",
                    "____defaultValue": {},
                    "documentPrologueComments": {
                        "____label": "Document Prologue Comments",
                        "____description": "Optional app-specific HTML5 comment string to insert at the top of every HTML5 document produced by the Node.js service.",
                        "____accept": [
                            "jsNull",
                            "jsString"
                        ],
                        "____defaultValue": null
                    },
                    "documentHeadSectionLinksMeta": {
                        "____label": "Document Header Meta and Link Extensions",
                        "____description": "Optional app-specific HTML5 HEAD section content. This is not carefully merged so be careful not to override any of the tags HolisticNodeService specifies (and are required to be in specific format(s) by HolisticHTML5Service).",
                        "____types": [
                            "jsNull",
                            "jsString",
                            "jsArray"
                        ],
                        "____defaultValue": null,
                        "oneLine": {
                            "____accept": "jsString"
                        }
                    },
                    "documentEpilogueComments": {
                        "____label": "Document Epilogue Comments",
                        "____description": "Optional app-specific comment string to insert at the bottom of every HTML5 document produced by the Node.js service.",
                        "____accept": [
                            "jsNull",
                            "jsString"
                        ],
                        "____defaultValue": null
                    }
                }
            }
        }
    },
    "appStateContext": {
        "____label": "Application State Context",
        "____description": "In-memory data object shared by the @encapsule/holism app server instance and other app subsystems.",
        "____accept": "jsObject"
    }
}
```


### Response Output

This filter's `request` method returns a normalized `response` object when called.

```JavaScript
var response = filter.request(input);
var result = undefined; // assume nothing
// You must check for an error condition.
if (!response.error) {
    // Operation succeeded and response.result is a valid value.
    result = response.result;
} else {
    // Operation failed and response.error is a string error message.
    throw new Error(response.error); // e.g.
}
// Use value held by result variable for subsequent operations...
```
#### Result Format


If no error then the value assigned to `response.result` is normalized per the following filter spec contract:

```JavaScript
{
    "____label": "HTTP Server Integrations Descriptor",
    "____description": "A collection of integration filters wrapping developer-defined accessor and action functions that are leveraged by an HTTP server and service filter runtimes to affect HTTP request and response processing.",
    "____types": "jsObject",
    "filter_id_seed": {
        "____label": "Filter Identifier Seed",
        "____description": "A 22-character IRUT identifier as a seed when creating integration filter ID's.",
        "____accept": "jsString",
        "____defaultValue": "YsPXb5gIT1OLNnNdTn-Hvg"
    },
    "name": {
        "____label": "Integration Filters Name",
        "____description": "A short name or moniker used to refer to refer to this set of application data and function contracts.",
        "____accept": "jsString"
    },
    "description": {
        "____label": "Integration Filters Description",
        "____description": "A description of this set of application data and function contracts.",
        "____accept": "jsString"
    },
    "version": {
        "____label": "Integration Filters Version",
        "____description": "A semantic version string associated with this set of application data and function contracts.",
        "____accept": "jsString"
    },
    "appStateContext": {
        "____label": "Application State Context",
        "____description": "In-memory data object shared by the @encapsule/holism app server instance and other app subsystems.",
        "____accept": "jsObject"
    },
    "filters": {
        "____label": "HTTP Server Integration Filters",
        "____description": "A collection of filter objects that abstract access to specific classes of application-specific data and functionality.",
        "____types": "jsObject",
        "http_request_redirector": {
            "____label": "HTTP Request Redirector Filter",
            "____description": "Optional filter that affects HTTP redirection based on analysis of @encapsule/holism HTTP request preprocessor output.",
            "____types": [
                "jsNull",
                "jsObject"
            ],
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        },
        "html_render": {
            "____label": "HTML Render Filter",
            "____description": "HTML render filter responsible for converting in-memory JavaScript data into a UTF8-encoded HTML string.",
            "____types": "jsObject",
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        },
        "get_org_metadata": {
            "____label": "Organization Metadata Access Filter",
            "____description": "Metadata access filter that retrieves data pertinent to the organization running the webserver.",
            "____types": "jsObject",
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        },
        "get_site_metadata": {
            "____label": "Site Metadata Access Filter",
            "____description": "Metadata access filter that retrieves data pertinent to the site being served by this webserver.",
            "____types": "jsObject",
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        },
        "get_page_metadata": {
            "____label": "Page Metadata Access Filter",
            "____description": "Metadata access filter that retrieves data pertinent to a specific page in the website running on this webserver.",
            "____types": "jsObject",
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        },
        "get_user_identity": {
            "____label": "User Identity Access Filter",
            "____description": "Metadata access filter that retrieves user identity assertion from incoming HTTP requests if present.",
            "____types": "jsObject",
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        },
        "get_user_session": {
            "____label": "User Session Access Filter",
            "____description": "Metadata access filter that retrieves user session given user/session identity descriptor.",
            "____types": "jsObject",
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        },
        "normalize_user_session_result": {
            "____label": "Normalize User Session Result Filter",
            "____description": "Filter used to validate/normalize a user session descriptor result object.",
            "____types": "jsObject",
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        },
        "normalize_user_session_error": {
            "____label": "Normalize User Session Error Filter",
            "____description": "Filter used to validate/normalize a user session error report.",
            "____types": "jsObject",
            "filterDescriptor": {
                "____accept": "jsObject"
            },
            "request": {
                "____accept": "jsFunction"
            }
        }
    },
    "htmlRenderOptions": {
        "____label": "HTML5 Document Synth Options",
        "____description": "Options and overrides to apply to the @encapsule/holistic-nodejs-service's HTML5 document rendering subsystem.",
        "____types": "jsObject",
        "____defaultValue": {},
        "documentPrologueComments": {
            "____label": "Document Prologue Comments",
            "____description": "Optional app-specific HTML5 comment string to insert at the top of every HTML5 document produced by the Node.js service.",
            "____accept": [
                "jsNull",
                "jsString"
            ],
            "____defaultValue": null
        },
        "documentHeadSectionLinksMeta": {
            "____label": "Document Header Meta and Link Extensions",
            "____description": "Optional app-specific HTML5 HEAD section content. This is not carefully merged so be careful not to override any of the tags HolisticNodeService specifies (and are required to be in specific format(s) by HolisticHTML5Service).",
            "____types": [
                "jsNull",
                "jsString",
                "jsArray"
            ],
            "____defaultValue": null,
            "oneLine": {
                "____accept": "jsString"
            }
        },
        "documentEpilogueComments": {
            "____label": "Document Epilogue Comments",
            "____description": "Optional app-specific comment string to insert at the bottom of every HTML5 document produced by the Node.js service.",
            "____accept": [
                "jsNull",
                "jsString"
            ],
            "____defaultValue": null
        }
    }
}
```


## Implementation

### Identifiers

| filter identifier | version independent | version dependent |
|--------|---------------------|-------------------|
| operation | `-vrBoPbbRYqzTbV3YdYdug` | `U1F8un8p8-T_xeJzmNJwmA` |
| input contract | `KdLaGKcI8t3e3rIyKQrXoQ` | `tGWajvt6aZN5rMGZDCGk3g` |
| output contract | `-r8Zz6z4xkcwEMNQyOmxSg` | `cnjzfdAy4FA95jAZJzLb2Q` |

### Configuration
Filter classification:  **normalized operation**

| request stage | stage description | state |
|-------|---------|---------------|
| 1. Input Filter | Rejects invalid input requests and shapes to well-formed. | true |
| 2. Operation | Developer-defined custom data transformation function. | true |
| 3. Response Filter | Verifies the response of the developer-defined operation function. | true |
| 4. Output Filter | Rejects invalid output result data and shapes to well-formed. | true |

## About
Filters are created with the [Encapsule/arccore](https://github.com/Encapsule/arccore/) library.<br>
This document was generated with [Encapsule/arctools](https://github.com/Encapsule/arctools/) v0.3.6 toolset.<br>
Document updated Thu May 19 2022 13:28:16 GMT-0700 (Pacific Daylight Time)

