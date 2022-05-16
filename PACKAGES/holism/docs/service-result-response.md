# Filter Object README

## [MCNT7LgfTH-XulKeh0fUMQ::HTTP Response Serializer]

**Encapsulates transformation of in-memory data to desired response content encoding and type.**

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
    "____label": "HTTP Response Serialize Request",
    "____description": "Specifies the format of a request to the main response serializer filter.",
    "____types": "jsObject",
    "streams": {
        "____label": "HTTP Server Stream Context",
        "____description": "Context exposed by the hosting HTTP server to a plugin service filter.",
        "____types": "jsObject",
        "request": {
            "____label": "HTTP Request Stream",
            "____description": "A reference to an http.IncomingMessage stream passed from the HTTP server.",
            "____accept": "jsObject"
        },
        "response": {
            "____label": "HTTP Response Stream",
            "____description": "A reference to an http.ServerResponse stream passed from the HTTP server.",
            "____accept": "jsObject"
        }
    },
    "options": {
        "____label": "Service Filter Registration Options",
        "____description": "Service filter-specific options data declared by the developer, and passed to the service by holism server.",
        "____opaque": true
    },
    "request_descriptor": {
        "____label": "Server Request Descriptor",
        "____description": "Information derived by the HTTP server from the incoming request stream. Most service filters are able to perform their function accessing only the data in this namespace without need for access to streams.request",
        "____types": "jsObject",
        "url_parse": {
            "____label": "Parsed URL Descriptor",
            "____description": "Deserialized and parsed URL structure.",
            "____accept": "jsObject"
        },
        "route_method_name": {
            "____label": "Route Method Name",
            "____description": "The HTTP server's primary routing key for this request composed of METHOD:pathname.",
            "____accept": "jsString"
        },
        "headers": {
            "____label": "Request Headers",
            "____description": "Deserialized and parsed HTTP request headers map",
            "____types": "jsObject",
            "____asMap": true,
            "header_name": {
                "____label": "HTTP Request Header Value",
                "____description": "The value associated with header_name in the headers map.",
                "____accept": [
                    "jsString",
                    "jsNumber"
                ]
            }
        },
        "session": {
            "____label": "User Session Data",
            "____description": "Current authenticated user session data. Or, the anonymous user's default session data.",
            "____accept": [
                "jsNull",
                "jsObject"
            ]
        }
    },
    "integrations": {
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
            },
            "get_server_agent_info": {
                "____label": "Server Agent Information Access Filter",
                "____description": "Retrieves data pertinent to the application server and infrastructure software packages.",
                "____types": "jsObject",
                "filterDescriptor": {
                    "____accept": "jsObject"
                },
                "request": {
                    "____accept": "jsFunction"
                }
            },
            "get_server_context": {
                "____label": "Server Intropsection Context Access Filter",
                "____description": "Retrieves a reference to the HTTP server filter's private runtime context. Used for advanced server introspection.",
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
    },
    "response_descriptor": {
        "____label": "Serialize Response Request",
        "____description": "Response data to be serialized.",
        "____types": "jsObject",
        "http": {
            "____label": "HTTP Status",
            "____description": "HTTP status code and optional status message.",
            "____types": "jsObject",
            "code": {
                "____label": "HTTP Status Code",
                "____description": "The numerical HTTP 1.1 status code to return to the remote HTTP client.",
                "____accept": "jsNumber"
            },
            "message": {
                "____label": "HTTP Status Message",
                "____description": "Optional HTTP 1.1 status message to include with status code returned to client.",
                "____accept": [
                    "jsUndefined",
                    "jsString"
                ]
            }
        },
        "content": {
            "____label": "Content Constraints",
            "____description": "Flags indicating encoding and content type of the response.",
            "____types": "jsObject",
            "encoding": {
                "____label": "Content Encoding Type",
                "____description": "A flag indicating if the resource data should be passed as a UTF8 string or binary payload.",
                "____accept": "jsString",
                "____inValueSet": [
                    "utf8",
                    "binary"
                ]
            },
            "type": {
                "____label": "Content Type",
                "____description": "The value of the Content-Type header to return along with the indicated resource.",
                "____accept": "jsString",
                "____inValueSet": [
                    "application/font-woff",
                    "application/font-woff2",
                    "application/javascript",
                    "application/json",
                    "application/x-font-ttf",
                    "application/x-www-form-urlencoded",
                    "application/xml",
                    "image/gif",
                    "image/jpeg",
                    "image/png",
                    "image/svg+xml",
                    "image/x-icon",
                    "multipart/form-data",
                    "text/css",
                    "text/html",
                    "text/plain",
                    "text/xml"
                ]
            }
        },
        "headers": {
            "____label": "Response Headers",
            "____description": "Deserialized and parsed HTTP response headers map.",
            "____types": "jsObject",
            "____asMap": true,
            "____defaultValue": {},
            "header_name": {
                "____label": "HTTP Response Header Value",
                "____description": "The value associated with header_name in the headers map.",
                "____accept": [
                    "jsString",
                    "jsNumber"
                ]
            }
        },
        "data": {
            "____label": "Response Data",
            "____description": "Optional data to transmit to the requesting HTTP client.",
            "____opaque": true
        }
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

If no error then any value type including [object Undefined] may be assigned to `response.result`.


## Implementation

### Identifiers

| filter identifier | version independent | version dependent |
|--------|---------------------|-------------------|
| operation | `MCNT7LgfTH-XulKeh0fUMQ` | `xP1eE0Uw01dLM2TtggZJtA` |
| input contract | `9dmisoBFpdHXvPZx1V0DCw` | `E_N2RZE2_9I_n_U91B1oBw` |
| output contract | `ZFeK6sR2iQtd96NpcXgjJQ` | `dHR0dNnZ2dlUVFRUyMjIyA` |

### Configuration
Filter classification:  **input processor**

| request stage | stage description | state |
|-------|---------|---------------|
| 1. Input Filter | Rejects invalid input requests and shapes to well-formed. | true |
| 2. Operation | Developer-defined custom data transformation function. | true |
| 3. Response Filter | Verifies the response of the developer-defined operation function. | true |
| 4. Output Filter | Rejects invalid output result data and shapes to well-formed. | false |

## About
Filters are created with the [Encapsule/arccore](https://github.com/Encapsule/arccore/) library.<br>
This document was generated with [Encapsule/arctools](https://github.com/Encapsule/arctools/) v0.3.6 toolset.<br>
Document updated Mon May 16 2022 13:59:36 GMT-0700 (Pacific Daylight Time)

