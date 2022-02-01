# Filter Object README

## [4YtpbUT-Su-J4DgTdeOBpQ::HTTP Response Writer]

**Writes HTTP 1.1 response to output stream and ends the stream.**

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
    "____label": "HTTP Response Write Request",
    "____description": "Specifies the format of a low-level HTTP response write request.",
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
    "response_descriptor": {
        "____label": "Server Response Descriptor",
        "____description": "Data to be written to HTTP response stream.",
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
| operation | `4YtpbUT-Su-J4DgTdeOBpQ` | `lYEnEyBPfFfB-drtB1DhtA` |
| input contract | `-HbNag1tUBsOxZuNWijHVw` | `kJvCPpYl_CfgjHWNKWsebg` |
| output contract | `1NkIF72Mdf5n3BGw726oPw` | `dHR0dNnZ2dlUVFRUyMjIyA` |

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
This document was generated with [Encapsule/arctools](https://github.com/Encapsule/arctools/) v0.3.5 toolset.<br>
Document updated Mon Jan 31 2022 16:08:50 GMT-0800 (Pacific Standard Time)

