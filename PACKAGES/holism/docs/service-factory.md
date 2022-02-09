# Filter Object README

## [UPcDuywgSZe67-ZdFkXxog::HTTP Server Service Filter Factory]

**Creates a new HTTP server plugin filter object.**

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
    "____label": "Service Filter Factory Request",
    "____description": "Constructs an HTTP server service filter plug-in.",
    "____types": "jsObject",
    "id": {
        "____label": "Service Filter Identifier",
        "____description": "22-character IRUT identifier string to assign to the constructed service filter.",
        "____accept": "jsString"
    },
    "name": {
        "____label": "Name",
        "____accept": "jsString"
    },
    "description": {
        "____label": "Description",
        "____accept": "jsString"
    },
    "constraints": {
        "____label": "Service Plugin Constraints",
        "____types": "jsObject",
        "request": {
            "____label": "Request Constraints",
            "____description": "Information used validate/normalize runtime data passed into the generated plugin server filter by the HTTP server.",
            "____types": "jsObject",
            "content": {
                "____label": "Content Constraints",
                "____types": "jsObject",
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
                },
                "encoding": {
                    "____label": "Content Encoding Type",
                    "____description": "A flag indicating if the resource data should be passed as a UTF8 string or binary payload.",
                    "____accept": "jsString",
                    "____inValueSet": [
                        "utf8",
                        "binary"
                    ]
                }
            },
            "query_spec": {
                "____label": "Query Data Format Specification",
                "____description": "A filter specification object defining the acceptable format of deserialized URL-encoded query data.",
                "____accept": "jsObject"
            },
            "request_spec": {
                "____label": "Request Data Format Specification",
                "____description": "A filter specification object defining the acceptable format of deserialized HTTP request data.",
                "____accept": "jsObject"
            },
            "options_spec": {
                "____label": "Request Options Format Specification",
                "____description": "A filter specification object defining the acceptable format of service filter registration options.",
                "____accept": "jsObject",
                "____defaultValue": {
                    "____label": "Default Service Filter Options Policy",
                    "____description": "Allows any options to be registered for a service filter.",
                    "____opaque": true
                }
            }
        },
        "response": {
            "____label": "Response Contraints",
            "____description": "Information used to validate/normalize the server's response to a request prior to writing it to the HTTP response stream.",
            "____types": "jsObject",
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
            "result_spec": {
                "____label": "Service-Specific Result Data Format Specification",
                "____description": "Filter specification document constraining the format of a valid HTTP server result response.",
                "____accept": "jsObject"
            },
            "error_context_spec": {
                "____label": "Service-Specific Error Context Data Format Specification",
                "____description": "Filter specification document constraining the format of a valid HTTP server error response.",
                "____accept": "jsObject"
            }
        }
    },
    "handlers": {
        "____label": "Callback Handlers",
        "____description": "Function callbacks made by the generated service filter to perform the service's underlying function.",
        "____types": "jsObject",
        "request_handler": {
            "____label": "Service Request Handler",
            "____description": "A function that is called by the service filter to perform the specific function of the service.",
            "____accept": "jsFunction"
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


If no error then the value assigned to `response.result` is normalized per the following filter spec contract:

```JavaScript
{
    "____label": "Service Filter Object",
    "____description": "A service filter object manufactured by the service filter factory.",
    "____accept": "jsObject"
}
```


## Implementation

### Identifiers

| filter identifier | version independent | version dependent |
|--------|---------------------|-------------------|
| operation | `UPcDuywgSZe67-ZdFkXxog` | `_Ad87MISq7IyLJPYCMWPmQ` |
| input contract | `A5KKl4SgggWG-evyiJnX3w` | `3EyU7J-gjA4Esf9-DpRM2g` |
| output contract | `S02YfcVS_NX9zle8RlfAjQ` | `aYzrZHcxjUAH_W0bjJ_zag` |

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
This document was generated with [Encapsule/arctools](https://github.com/Encapsule/arctools/) v0.3.5 toolset.<br>
Document updated Wed Feb 09 2022 11:58:35 GMT-0800 (Pacific Standard Time)

