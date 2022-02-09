# Filter Object README

## [8q8sOAYyT5K9oviGZumYgQ::Data Gateway Router Factory]

**Constructs a filter that routes its request to an appropriate holism service filter for further processing.**

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
    "____label": "Data Gateway Router Factory Request",
    "____types": "jsObject",
    "serviceFilters": {
        "____label": "Service Filter Array",
        "____types": "jsArray",
        "serviceFilter": {
            "____label": "Data Gateway Filter Object",
            "____accept": "jsObject"
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
    "____label": "Data Gateway Router Filter",
    "____description": "An arccore.discriminator filter instance used to route incoming data gateway request messages from the HTTP layer to a specific request handler for servicing.",
    "____accept": "jsObject"
}
```


## Implementation

### Identifiers

| filter identifier | version independent | version dependent |
|--------|---------------------|-------------------|
| operation | `8q8sOAYyT5K9oviGZumYgQ` | `kyPkR8MIMrpLR079uW1VVQ` |
| input contract | `IvJx6_V71hjgC60xMyJVZg` | `9nqboN5zb_HfZoPhiNqYbg` |
| output contract | `SM9BgAWFbREPQyu1OSYQtg` | `lbBaH84CMX9Wj1o5b5oE9Q` |

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

