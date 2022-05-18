# Filter Object README

## [2zvzciQcQg-SifqIQrbnUg::HTTP Request Transport For Node.js]

**Filter wrapper around the request module for use in Node.js clients.**

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
    "____label": "HTTP Request Transport Request",
    "____types": "jsObject",
    "url": {
        "____accept": "jsString"
    },
    "method": {
        "____accept": "jsString",
        "____inValueSet": [
            "GET",
            "POST"
        ]
    },
    "query": {
        "____accept": [
            "jsUndefined",
            "jsObject"
        ]
    },
    "request": {
        "____opaque": true
    },
    "options": {
        "____opaque": true
    },
    "resultHandler": {
        "____accept": "jsFunction"
    },
    "errorHandler": {
        "____accept": "jsFunction"
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
    "____accept": "jsUndefined"
}
```


## Implementation

### Identifiers

| filter identifier | version independent | version dependent |
|--------|---------------------|-------------------|
| operation | `2zvzciQcQg-SifqIQrbnUg` | `7LnmkpQe1DFECWswZ2mNSA` |
| input contract | `JxT7zfuuNKBqV2789FMhMg` | `4Ew0FsVO1GhgGpq0l7Bf1Q` |
| output contract | `fXOejDpIDblZaCUnFyP2pg` | `xHanI1kT9ivLTVhizlh1ng` |

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
Document updated Wed May 18 2022 13:27:00 GMT-0700 (Pacific Daylight Time)

