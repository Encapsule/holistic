# Filter Object README

## [tUksFcVLReWXPbci8NzAKQ::HTTP Request Filter Factory]

**Generates a filter object wrapped around an asynchronous HTTP request that strongly validates its input request, and output response data using Encapsule Project filter specification declarations provided to the factory at construction time.**

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
    "____types": "jsObject",
    "name": {
        "____label": "HTTP Request Operation Name",
        "____description": "A short descriptive name to assign to the generated HTTP request filter object.",
        "____accept": "jsString"
    },
    "description": {
        "____label": "HTTP Request Operation Description",
        "____description": "A longer description of the purpose and functionality to assign to the generated HTTP request filter object.",
        "____accept": "jsString"
    },
    "url": {
        "____label": "HTTP Request URL",
        "____description": "Full URL of the remote endpoint to query including the leading HTTP protocol designation.",
        "____accept": "jsString"
    },
    "method": {
        "____label": "HTTP Request Method",
        "____description": "The specific HTTP request method to make requests with.",
        "____accept": "jsString",
        "____inValueSet": [
            "GET",
            "POST"
        ]
    },
    "querySpec": {
        "____label": "HTTP Request Query Params Object Filter Spec",
        "____description": "An Encapsule/ARCcore.filter-format JavaScript object descriptor specifying the schema of the query specification object that may be optionally specified at request time.",
        "____accept": "jsObject",
        "____defaultValue": {
            "____opaque": true
        }
    },
    "requestSpec": {
        "____label": "HTTP Request Body Params Object Filter Spec",
        "____description": "An Encapsule/ARCcore.filter-format JavaScript object descriptor specifying the schema of the main request object to pass as the body of the HTTP request.",
        "____accept": "jsObject",
        "____defaultValue": {
            "____opaque": true
        }
    },
    "resultSpec": {
        "____label": "HTTP Result Object Filter Spec",
        "____description": "An Encapsule/ARCcore.filter-format JavaScript object descriptor specifiying the schema of the result data that the remote endpoint is expected/required to return in response to the HTTP request.",
        "____accept": [
            "jsUndefined",
            "jsObject"
        ]
    },
    "resultHandler": {
        "____label": "HTTP Result Handler",
        "____description": "A JavaScript function to be called by the generated HTTP request filter when the request completes successfully. This function is always passed a single in-parameter, request, that is filtered by the resultSpec.",
        "____accept": [
            "jsUndefined",
            "jsFunction"
        ]
    },
    "errorHandler": {
        "____label": "HTTP Response Error Handler",
        "____description": "A JavaScript function to be called by the generated HTTP request filter if the request fails. This function is always passed a single in-parameter of type string that explains what went wrong.",
        "____accept": [
            "jsUndefined",
            "jsFunction"
        ]
    },
    "requestTransportFilter": {
        "____label": "HTTP Transport Filter",
        "____description": "A reference to a a HTTP Request Transport Filter object allocated by either the client or server-specific factory.",
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
    "____accept": "jsObject",
    "____label": "HTTP Request Filter"
}
```


## Implementation

### Identifiers

| filter identifier | version independent | version dependent |
|--------|---------------------|-------------------|
| operation | `tUksFcVLReWXPbci8NzAKQ` | `k1pq_gpEmD-YmZQKUvBlZA` |
| input contract | `o1KhHTAe7jR7ryHTCP28Vg` | `X_4ACeSB7zvjVVvazYEt4A` |
| output contract | `iCJHm0Q2NAIkUnwAn0JKdA` | `rk5Nai3cNGV7pphF0hwfnw` |

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
Document updated Mon May 16 2022 13:59:38 GMT-0700 (Pacific Daylight Time)

